import React, { useEffect, useRef, useState } from 'react';
import { ChakraProvider, Box, Text, theme, Flex } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import FlightBox from './flightBox';
import ThrottleBox from './throttleBox';
import HudBox from './hudBox';
import PlotBox from './plotBox';

function App() {
	const ceiling = 5000; // ceiling in feet

	const [ data, setData ] = useState({
		alt: 0.1, // 0-1
		throttle: 0, // 0-100
		alt_d: 0,
		alt_dd: 0,
		refAlt: 3000 / ceiling
	});
	const requestRef = useRef();
	const prevTime = useRef();
	const throttleRef = useRef(0);

	const animate = (time) => {
		let delta_t;
		//get delta_t
		if (prevTime.current) {
			delta_t = (time - prevTime.current) / 1000;
		} else {
			delta_t = 0;
		}

		delta_t = 0.016;

		if (delta_t > 0.02) console.log(delta_t);

		// update previous time
		prevTime.current = time;

		// FLIGHT DYNAMICS
		setData((data) => {
			//alt_dd
			const m = 10;
			const k1 = 0.2;
			const c = -0.02;
			const b = -9.81;

			let alt_dd = 1 / m * (k1 * data.throttle + c * data.alt_d + b);

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

			//console.log(alt, alt_d, alt_dd);
			//console.log(delta_t);

			return { ...data, alt, alt_d, alt_dd, throttle: throttleRef.current };
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
			<Box
				color={'white'}
				fontWeight={100}
				letterSpacing={3}
				bg={'blue.500'}
				mx={10}
				my={4}
				borderRadius={'lg'}
				p={4}
				textAlign={'center'}
			>
				<Text fontSize="2xl">
					Helicopter Simulator <ColorModeSwitcher />
				</Text>
			</Box>
			{/* 3 panel with throttle, helo and alt info */}
			<Flex w="100%" h="100%" justifyContent={'center'} alignItems={'center'}>
				<ThrottleBox
					throttle={data.throttle}
					setThrottle={(throttle) => {
						//setData({ ...data, throttle })
						throttleRef.current = throttle;
					}}
				/>
				<FlightBox alt={data.alt} height={600} refAlt={data.refAlt} />
				<HudBox alt={data.alt * ceiling} />
			</Flex>
			{/* This is the second row of panels */}
			<Flex mt={20} justifyContent={'center'} alignItems={'center'}>
				<PlotBox />
			</Flex>
		</ChakraProvider>
	);
}

export default App;
