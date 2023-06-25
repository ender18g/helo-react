import React from 'react';
import {
	Flex,
	NumberInputField,
	NumberInput,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	Stack,
	InputGroup,
	InputLeftAddon,
	Text,
	Heading,
	Box
} from '@chakra-ui/react';

function ControlBox(props) {
	return (
		<Box mt={8}>
			<Flex justifyContent={'center'}>
				<Heading size={'sm'}>Controller Settings</Heading>
			</Flex>
			<Flex
				my={3}
				w={'25vw'}
				alignItems={'center'}
				justifyContent={'center'}
				wrap={'wrap'}
				border={'2px'}
				p={1}
				borderRadius={'md'}
			>
				{/* DESIRED ALTITUDE */}
				<Flex maxW={'200'} alignItems={'center'} fontWeight={700} flexWrap={'wrap'}>
					<Text color={'blue.500'} mr={3}>
						Desired Altitude
					</Text>
					<NumberInput
						precision={0}
						value={props.refAlt}
						min={1000}
						max={4500}
						onChange={props.setRefAlt}
						step={100}
					>
						<NumberInputField />
						<NumberInputStepper>
							<NumberIncrementStepper />
							<NumberDecrementStepper />
						</NumberInputStepper>
					</NumberInput>
				</Flex>

				<Flex maxW={'200'} alignItems={'center'} fontWeight={700} flexWrap={'wrap'}>
					<Text mr={3}>Kp:</Text>
					<NumberInput
						value={props.controlGains.current.kp}
						min={0}
						max={30}
						onChange={(val) => (props.controlGains.current = { ...props.controlGains.current, kp: val })}
						step={0.1}
					>
						<NumberInputField />
						<NumberInputStepper>
							<NumberIncrementStepper />
							<NumberDecrementStepper />
						</NumberInputStepper>
					</NumberInput>
				</Flex>

				{/* Ki */}
				<Flex maxW={'200'} alignItems={'center'} fontWeight={700} flexWrap={'wrap'}>
					<Text mr={3}>Ki:</Text>
					<NumberInput
						value={props.controlGains.current.ki}
						min={0}
						max={20}
						onChange={(val) => (props.controlGains.current = { ...props.controlGains.current, ki: val })}
						step={0.1}
					>
						<NumberInputField />
						<NumberInputStepper>
							<NumberIncrementStepper />
							<NumberDecrementStepper />
						</NumberInputStepper>
					</NumberInput>
				</Flex>

				{/* Kd */}

				<Flex maxW={'200'} alignItems={'center'} fontWeight={700} flexWrap={'wrap'}>
					<Text mr={3}>Kd:</Text>
					<NumberInput
						value={props.controlGains.current.kd}
						min={0}
						max={40}
						onChange={(val) => (props.controlGains.current = { ...props.controlGains.current, kd: val })}
						step={0.1}
					>
						<NumberInputField />
						<NumberInputStepper>
							<NumberIncrementStepper />
							<NumberDecrementStepper />
						</NumberInputStepper>
					</NumberInput>
				</Flex>

				{/* End loop */}
			</Flex>
		</Box>
	);
}

export default ControlBox;
