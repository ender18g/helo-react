import React from 'react';
import { Image, Flex, Box } from '@chakra-ui/react';
import helo from './sh60.png';
import { memo } from 'react';

function FlightBox(props) {
	const { alt, height, refAlt, isDesktop, message, frameRate } = props;

	// alt is some value between 0 and 1.0 to describe the altitude
	//const alt = .75;
	const top_val = (1 - alt) * height; // in px
	const ref_val = (1 - refAlt) * height; // in px

	return (
		<Flex
			className="flightBox"
			w="45vw"
			height={height}
			minW="100px"
			mx={3}
			my={2}
			justifyContent="center"
			textAlign={'center'}
			borderRadius={'lg'}
			shadow={'lg'}
			zIndex={-1}
		>
			{/* Helicopter image */}
			<Image
				position={'absolute'}
				width={'100px'}
				height={'50px'}
				aspectRatio={'auto'}
				src={helo}
				top={top_val + 10}
				alt="SH60"
				zIndex={1}
				transform={'translate(0%,100%) ' + (isDesktop ? 'scale(1.3)' : 'scale(1.1)')}
			/>

			{/* THIS IS THE Reference Altitude line */}
			<Flex h={'2px'} w={'150px'} position={'absolute'} top={ref_val + 90} bg={'orange.300'} zIndex={1} />
			{frameRate > 57 && (
				<Box
					position={'absolute'}
					className="cloud"
					transform={'translate(-20%,80% ) ' + (isDesktop ? 'scale(0.5)' : 'scale(0)')}
				/>
			)}

			{frameRate > 55 && (
				<Box
					position={'absolute'}
					className="cloud"
					transform={'translate(20%,50% ) ' + (isDesktop ? 'scale(0.5)' : 'scale(0)')}
				/>
			)}
		</Flex>
	);
}

export default memo(FlightBox);
