import React, { useEffect, useRef, useState } from 'react';
import { ChakraProvider, Box, Text, theme, Flex, Button } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import FlightBox from './flightBox';
import ThrottleBox from './throttleBox';
import HudBox from './hudBox';
import PlotBox from './plotBox';
import ControlBox from './controlBox';

function App() {
	const ceiling = 5000; // ceiling in feet

	const [ data, setData ] = useState({
		alt: 0, // 0-1
		throttle: 0, // 0-100
		alt_d: 0,
		alt_dd: 0,
		refAlt: 3000 / ceiling,
		autoPilot: false,
		error: 0,
		error_sum: 0,
		message: ''
	});
	const [ showPlot, setShowPlot ] = useState(false);

	const requestRef = useRef();
	const prevTime = useRef();
	const throttleRef = useRef(0);
	const plotData = useRef([ {} ]);
	const controlGains = useRef({ kp: 1, ki: 1, kd: 1 });

	const animate = (time) => {
		let delta_t;
		//get delta_t
		if (prevTime.current) {
			delta_t = (time - prevTime.current) / 1000;
		} else {
			delta_t = 0;
		}
		// log delta_t if it's too big
		if (delta_t > 0.02) console.log(delta_t);

		// update previous time
		prevTime.current = time;

		setData((data) => {
			// get throttle control
			const error = data.refAlt - data.alt;
			const error_d = error - data.error; // if error_d is positive, we are moving away from the target
			const error_sum = data.error_sum + error;
			const kp = controlGains.current.kp;
			const ki = controlGains.current.ki;
			const kd = controlGains.current.kd;

			// calculate throttle
			if (data.autoPilot) {
				throttleRef.current = 50 + kp * error * 10 + kd * error_d * 300 + ki * error_sum * 0.1;
			}

			// apply throttle limits
			if (throttleRef.current > 100) throttleRef.current = 100;
			if (throttleRef.current < 0) throttleRef.current = 0;

			//CALCULATE FLIGHT DYNAMICS
			const m = 10;
			const k1 = 0.2;
			const c = -2;
			const b = -9.81;
			const w = 5; // nonlinear for altitude

			let alt_dd = 1 / m * (k1 * (data.throttle - w * (data.alt + 1) ** 2) + c * data.alt_d + b);
			//alt_d
			let alt_d = data.alt_d + data.alt_dd * delta_t;
			//alt
			let alt = data.alt + data.alt_d * delta_t;

			// check altitude limits
			if (alt > 1) {
				alt = 1;
				if (alt_d > 0) alt_d = 0;
			}
			if (alt <= 0) {
				alt = 0;
				if (alt_d < 0) alt_d = 0;
			}

			// if in the air, save data for plotting
			if (alt > 0)
				plotData.current.push({
					alt,
					altitude: alt * ceiling,
					refAlt: data.refAlt * ceiling,
					throttle: throttleRef.current,
					time: time / 1000
				});

			//if plot data is too long, remove the first element
			if (plotData.current.length > 2000) plotData.current.shift();

			return { ...data, alt, alt_d, alt_dd, error, error_sum, throttle: throttleRef.current };
		});

		requestRef.current = requestAnimationFrame(animate);
	};

	useEffect(() => {
		requestRef.current = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(requestRef.current);
	}, []);

	return (
		<ChakraProvider theme={theme}>
			{/* Title Box */}
			<Flex
				justify={'center'}
				align={'center'}
				color={'white'}
				fontWeight={300}
				letterSpacing={3}
				bg={'blue.500'}
				mx={10}
				my={2}
				borderRadius={'lg'}
				p={2}
				textAlign={'center'}
			>
				<Text w={'90%'} fontSize="2xl" textShadow={'lg'}>
					Helicopter Control Simulator
				</Text>
				<Box alignSelf={'end'} mx={2}>
					<ColorModeSwitcher />
				</Box>
			</Flex>
			<Flex w="100%" h="100%" justifyContent={'center'} alignItems={'center'}>
				{/* BUTTONS TO SHOW PLOT */}
				<Button
					mx={3}
					colorScheme={data.autoPilot ? 'green' : null}
					onClick={() => {
						if (data.autoPilot) {
							// TURNING OFF AUTOPILOT
							throttleRef.current = 0;
							setShowPlot(true);
							setData({ ...data, throttle: 0, autoPilot: false });
							console.log(plotData.current.length);
						} else {
							// TURNING ON AUTOPILOT
							plotData.current = [ {} ];
							// set alt to 0
							setData({
								...data,
								alt: 0,
								alt_d: 0,
								alt_dd: 0,
								error: 0,
								error_sum: 0,
								throttle: 0,
								autoPilot: true
							});
							throttleRef.current = 0;
							prevTime.current = null;
							//show flight box
							setShowPlot(false);
						}
					}}
				>
					Autopilot
				</Button>
				<Button
					mx={3}
					onClick={() => {
						setShowPlot(!showPlot);
					}}
				>
					Toggle Plot
				</Button>

				<Button
					mx={3}
					onClick={() => {
						plotData.current = [ {} ];
					}}
				>
					Clear Plot
				</Button>
			</Flex>
			{/* 3 panel with throttle, helo and alt info */}
			<Flex w="100%" h="100%" justifyContent={'center'} alignItems={'center'}>
				<ThrottleBox
					throttle={data.throttle}
					setThrottle={(throttle) => {
						//setData({ ...data, throttle })
						throttleRef.current = throttle;
					}}
				/>
				{showPlot ? (
					<PlotBox data={plotData.current} />
				) : (
					<FlightBox alt={data.alt} height={600} refAlt={data.refAlt} message={data.message} />
				)}
				<Box>
					<HudBox alt={data.alt * ceiling} />
					<ControlBox
						controlGains={controlGains}
						refAlt={data.refAlt * ceiling}
						setRefAlt={(refAlt) => setData({ ...data, refAlt: refAlt / ceiling })}
					/>
				</Box>
			</Flex>
			{/* This is the second row of panels */}
		</ChakraProvider>
	);
}

export default App;
