import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChakraProvider, Box, Text, theme, Flex, Button, useMediaQuery } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import FlightBox from './flightBox';
import ThrottleBox from './throttleBox';
import HudBox from './hudBox';
import PlotBox from './plotBox';
import ControlBox from './controlBox';

function App() {
	const ceiling = 5000; // ceiling in feet
	//use media query to determine if mobile
	const [ isDesktop ] = useMediaQuery('(min-width: 800px)');

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
	const plotData = useRef([]);
	const controlGains = useRef({ kp: 3, ki: 0, kd: 0 });

	const animate = useCallback(
		(time) => {
			let delta_t;
			//get delta_t
			if (prevTime.current) {
				delta_t = (time - prevTime.current) / 1000;
			} else {
				delta_t = 0;
			}
			// log delta_t if it's too big
			if (delta_t > 0.02) {
				console.log('Excessive DELAY', delta_t);
			}

			// update previous time
			prevTime.current = time;

			setData((data) => {
				// get throttle control
				const error = data.refAlt - data.alt;
				const error_d = error - data.error; // if error_d is positive, we are moving away from the target
				let error_sum = data.error_sum + error;
				// don't let error_sum get too big
				if (error_sum > 10e3) error_sum = 10e3;
				const kp = controlGains.current.kp;
				const ki = controlGains.current.ki;
				const kd = controlGains.current.kd;

				// calculate throttle
				if (data.autoPilot) {
					throttleRef.current = 50 + kp * error * 10 + kd * error_d * 400 + ki * error_sum * 0.02;
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
				if (alt > 0 && !showPlot && plotData.current.length < 1000)
					plotData.current.push({
						alt,
						altitude: alt * ceiling,
						refAlt: data.refAlt * ceiling,
						throttle: throttleRef.current,
						time: time / 1000
					});

				//if plot data is too long, reset it!
				if (plotData.current.length >= 1000) {
					console.log('RESET', error_sum);
					return { ...data, alt: 0, throttle: 0, autoPilot: false, message: 'Log Full - View plot to reset' };
				}

				return { ...data, alt, alt_d, alt_dd, error, error_sum, throttle: throttleRef.current, message: '' };
			});

			requestRef.current = requestAnimationFrame(animate);
		},
		[ showPlot ]
	);

	useEffect(
		() => {
			requestRef.current = requestAnimationFrame(animate);
			console.log('request animation frame');
			return () => {
				cancelAnimationFrame(requestRef.current);
				console.log('cancel animation frame');
			};
		},
		[ animate ]
	);

	return (
		<ChakraProvider theme={theme}>
			{/* Title Box */}
			<Flex
				justify={'center'}
				align={'center'}
				color={'white'}
				bg={'blue.700'}
				mx={10}
				my={2}
				borderRadius={'lg'}
				p={2}
				textAlign={'center'}
			>
				<Box w={'10%'} />
				<Text w={'80%'} color={'gray.100'} fontSize="2xl" textShadow={'lg'} letterSpacing={6} fontWeight={100}>
					HeloSim
				</Text>
				<Box w={'10%'}>
					<ColorModeSwitcher pr={3} color={'gray.400'} />
				</Box>
			</Flex>
			<Flex w="100%" h="100%" justifyContent={'center'} alignItems={'center'}>
				{/* BUTTONS TO SHOW PLOT */}
				<Button
					mx={3}
					variant={'outline'}
					onClick={() => {
						if (data.autoPilot) {
							// TURNING OFF AUTOPILOT
							throttleRef.current = 0;
							setData({ ...data, alt: 0, throttle: 0, autoPilot: false });
							setShowPlot(true);
							console.log(plotData.current.length);
						} else {
							// TURNING ON AUTOPILOT
							plotData.current = [];
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
					Autopilot {data.autoPilot ? '🟢' : '🔴'}
				</Button>
				<Button
					mx={3}
					//hidden={!showPlot && plotData.current.length < 1 ? 1 : 0}
					onClick={() => {
						// TURNING PLOT OFF, clear data
						if (showPlot) plotData.current = [];
						else
							//TURNING PLOT ON, set throttle to 0
							throttleRef.current = 0;
						// set alt to 0 and turn off autopilot
						setData({ ...data, alt: 0, throttle: 0, autoPilot: false });
						setShowPlot(!showPlot);
					}}
				>
					{showPlot ? 'Hide Plot ❌' : 'View Plot 📈'}
				</Button>
			</Flex>
			{/* 3 panel with throttle, helo and alt info */}
			<Flex w="100%" h="100%" justifyContent={'center'} alignItems={'center'}>
				<Flex hidden={showPlot ? 1 : 0}>
					<ThrottleBox
						throttle={data.throttle}
						setThrottle={(throttle) => {
							throttleRef.current = throttle;
						}}
					/>
				</Flex>
				{showPlot ? (
					<PlotBox data={plotData.current} />
				) : (
					<FlightBox
						alt={data.alt}
						height={isDesktop ? 800 : 500}
						refAlt={data.refAlt}
						message={data.message}
					/>
				)}
				<Box hidden={showPlot && !isDesktop ? 1 : 0}>
					<HudBox alt={data.alt * ceiling} />
					<ControlBox
						controlGains={controlGains}
						refAlt={data.refAlt * ceiling}
						setRefAlt={(refAlt) => setData({ ...data, refAlt: refAlt / ceiling })}
					/>
				</Box>
			</Flex>
			{/* This is the second row of panels */}
			<Flex w={'70vw'} justifyContent={'center'} alignItems={'center'} mx={'auto'} mt={'50px'}>
				<Text color={'red.600'} fontWeight={700}>
					{data.message}
				</Text>
			</Flex>
		</ChakraProvider>
	);
}

export default App;
