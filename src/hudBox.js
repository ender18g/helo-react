import React from 'react';
import { Text, Flex } from '@chakra-ui/react';
import { memo } from 'react';


function HudBox(props) {
  const { alt } = props;

  const altString = pad(alt, 4).split('');

  const altDisplay = altString.map((num, index) => {
    return (
      <Text
        color={'white'}
        border={'1px'}
        borderColor={'white'}
        bg={'black'}
        p={1}
        align={'center'}
        key={index}
        w={'25%'}
        fontWeight={800}
      >
        {num}
      </Text>
    );
  });

  return (
    <Flex w={'20vw'} alignItems={'center'} justifyContent={'center'} wrap={'wrap'}>
      <Flex w={'100%'} maxW={'200px'} justifyContent={'center'}>
        {altDisplay}
      </Flex>
      <Text align={'center'} fontWeight={800} ml={1}>
        Feet
      </Text>
    </Flex>
  );
}

function pad(num, size) {
  num = Math.floor(num);
  num = num.toString();
  while (num.length < size) num = '0' + num;
  return num;
}

export default memo(HudBox);
