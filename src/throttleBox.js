import React from 'react';
import { Box, SliderTrack, SliderFilledTrack, SliderThumb, Text, Slider, Flex } from '@chakra-ui/react';

function ThrottleBox(props) {
	const { throttle, setThrottle } = props;
	return (
		<Flex justifyContent={'center'} w={'15vw'} wrap={'wrap'}>
			<Slider
				value={throttle}
				onChange={(val) => setThrottle(val)}
				colorScheme="orange"
				orientation="vertical"
				minH={300}
				w={'100%'}
			>
				<SliderTrack>
					<SliderFilledTrack />
				</SliderTrack>
				<SliderThumb />
			</Slider>
			<Text align={'center'} my={2} fontWeight={800}>
				{throttle}%
			</Text>
		</Flex>
	);
}

export default ThrottleBox;
