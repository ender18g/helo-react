import React from 'react';
import {
  Box,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  Slider,
  Flex
} from '@chakra-ui/react';
import { useEffect } from 'react';
import helo from './sh60.png'



function HudBox(props) {


  const { alt } = props;

  return (
    <Box minW={100} alignItems={'center'} justifyContent={'center'}>
      <Text align={'center'} py={2} minW={'100px'} color={'white'} fontWeight={800} letterSpacing={3} borderRadius={'md'} bg={'black'}>{pad(alt, 4)} </Text>
      <Text align={'center'} fontWeight={800} ml={2}> Feet</Text>
    </Box >

  );
}


function pad(num, size) {
  num = Math.floor(num);
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}




export default HudBox;
