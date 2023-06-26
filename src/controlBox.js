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
	Box,
	Divider
} from '@chakra-ui/react';

function ControlBox(props) {
	return (
		<Box w={'20vw'} maxW={300} mt={8} boxShadow={'md'} borderRadius={'lg'} p="1">
			<Box justifyContent={'center'}>
				<Text align={'center'} fontSize={'sm'} fontWeight={700}>
					Controller
				</Text>
				<Divider size={'lg'} />
			</Box>
			<Flex my={3} alignItems={'center'} justifyContent={'center'} wrap={'wrap'} pb={1} borderRadius={'md'}>
				{/* DESIRED ALTITUDE */}
				<Flex maxW={'200'} alignItems={'center'} fontWeight={500} flexWrap={'wrap'}>
					<Text color={'blue.500'} mr={2} textAlign={'center'} fontSize={'sm'}>
						Desired Altitude:
					</Text>
					<NumberInput
						precision={1}
						value={Math.floor(props.refAlt)}
						min={1000}
						max={4500}
						onChange={props.setRefAlt}
						step={100.0}
					>
						<NumberInputField p={0} />
						<NumberInputStepper>
							<NumberIncrementStepper />
							<NumberDecrementStepper />
						</NumberInputStepper>
					</NumberInput>
				</Flex>

				<Flex maxW={'200'} alignItems={'center'} fontWeight={500} flexWrap={'wrap'}>
					<Text fontSize={'sm'} mr={3}>
						Kp:
					</Text>
					<NumberInput
						value={props.controlGains.current.kp}
						min={0}
						max={30}
						onChange={(val) => (props.controlGains.current = { ...props.controlGains.current, kp: val })}
						step={1}
					>
						<NumberInputField />
						<NumberInputStepper>
							<NumberIncrementStepper />
							<NumberDecrementStepper />
						</NumberInputStepper>
					</NumberInput>
				</Flex>

				{/* Ki */}
				<Flex maxW={'200'} alignItems={'center'} fontWeight={500} flexWrap={'wrap'}>
					<Text fontSize={'sm'} mr={3}>
						Ki:
					</Text>
					<NumberInput
						value={props.controlGains.current.ki}
						min={0}
						max={20}
						onChange={(val) => (props.controlGains.current = { ...props.controlGains.current, ki: val })}
						step={1}
					>
						<NumberInputField />
						<NumberInputStepper>
							<NumberIncrementStepper />
							<NumberDecrementStepper />
						</NumberInputStepper>
					</NumberInput>
				</Flex>

				{/* Kd */}

				<Flex maxW={'200'} alignItems={'center'} fontWeight={500} flexWrap={'wrap'}>
					<Text fontSize={'sm'} mr={3}>
						Kd:
					</Text>
					<NumberInput
						value={props.controlGains.current.kd}
						min={0}
						max={40}
						onChange={(val) => (props.controlGains.current = { ...props.controlGains.current, kd: val })}
						step={1}
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
