import React from 'react';
import { Image, Flex } from '@chakra-ui/react';
import helo from './sh60.png';

function FlightBox(props) {
	const { alt, height, refAlt } = props;

	// alt is some value between 0 and 1.0 to describe the altitude
	//const alt = .75;
	const top_val = (1 - alt) * height; // in px
	const ref_val = (1 - refAlt) * height; // in px

	return (
		<Flex
			bg={'blue.100'}
			w="40vw"
			height={height}
			minW="100px"
			mx={3}
			my={2}
			justifyContent="center"
			textAlign={'center'}
			borderRadius={'lg'}
			shadow={'lg'}
		>
			{/* Helicopter image */}
			<Image
				position={'relative'}
				width={'100px'}
				height={'50px'}
				aspectRatio={'auto'}
				src={helo}
				top={top_val}
				left={'50%'}
				transform={'translate(-50%, 00%)'}
				alt="SH60"
				zIndex={1}
			/>

			{/* THIS IS THE Reference Altitude line */}
			<Flex
				h={'2px'}
				w={'80%'}
				position={'relative'}
				left={'-50'}
				top={ref_val + 25}
				border={'2px'}
				borderColor={'orange.300'}
			/>
		</Flex>
	);
}

export default FlightBox;
