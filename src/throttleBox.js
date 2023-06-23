import React from 'react';
import {
  Box,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  Slider
} from '@chakra-ui/react';
import { useEffect } from 'react';
import helo from './sh60.png'



function ThrottleBox(props) {


  const { throttle, setThrottle } = props;
  return (
    <Box>
      <Slider minW={50} value={throttle} onChange={(val) => setThrottle(val)} colorScheme='orange' orientation='vertical'
        minH={300}>
        <SliderTrack>
          <SliderFilledTrack ></SliderFilledTrack>
        </SliderTrack>
        <SliderThumb></SliderThumb>
      </Slider>
      <Text>{throttle}%</Text>
    </Box>

  );
}

export default ThrottleBox;
