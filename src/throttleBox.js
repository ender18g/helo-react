import React from 'react';
import { SliderTrack, SliderFilledTrack, SliderThumb, Text, Slider, Flex } from '@chakra-ui/react';
import { memo } from 'react';

function ThrottleBox(props) {
	const { throttle, setThrottle } = props;
	return (
		<Flex justifyContent={'center'} w={'15vw'} wrap={'wrap'}>
			<Text align={'center'} mt={1} fontSize={'sm'} fontWeight={800} w={'100%'}>
				Throttle
			</Text>
			<Slider
				value={throttle}
				onChange={(val) => setThrottle(val)}
				colorScheme="orange"
				orientation="vertical"
				minH={300}
				w={'100%'}
				step={0.1}
			>
				<SliderTrack>
					<SliderFilledTrack />
				</SliderTrack>
				<SliderThumb />
			</Slider>
			<Text align={'center'} my={2} fontWeight={800}>
				{Math.round(throttle * 10) / 10}%
			</Text>
		</Flex>
	);
}

export default memo(ThrottleBox);
