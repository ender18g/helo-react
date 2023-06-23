import React from 'react';
import {
  Image,
  Flex
} from '@chakra-ui/react';
import { useEffect } from 'react';
import helo from './sh60.png'



function FlightBox(props) {

  const { alt, height } = props;

  // alt is some value between 0 and 1.0 to describe the altitude
  //const alt = .75;
  const top_val = (1 - alt) * height; // in px

  return (
    <Flex bg={'blue.100'} w='70%' height={height} minW='200' mx={10} my={2} justifyContent='center' px={10} textAlign={'center'}
      borderRadius={'lg'} shadow={'lg'}>

      <Image position={'relative'}
        width={'100px'}
        height={'50px'}
        aspectRatio={'auto'}
        src={helo}
        top={top_val}
        left={50} transform={'translate(-50%, -100%)'}
        alt="SH60" />

    </Flex>

  );
}

export default FlightBox;
