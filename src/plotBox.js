import React from 'react';
import { PureComponent } from 'react';
import { Flex, Heading, Text, Box } from '@chakra-ui/react';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	ReferenceLine,
	Label
} from 'recharts';

export default function PlotBox(props) {
	const { data } = props;

	if (data.length === 0) {
		return (
			<Box w={'50vw'} m={4} justifyContent={'center'} alignItems={'center'}>
				<Heading align={'center'}>No Data</Heading>
				<Text align={'center'} fontSize={24} fontWeight={300}>
					Fly the helicopter manually or turn the autopilot ON to collect data.
				</Text>
			</Box>
		);
	}

	//adjust time so that it starts at 0
	const timeOffset = data[0].time;

	return (
		<Flex w={'100vw'} mt={4}>
			<ResponsiveContainer width={'100%'} height={600}>
				<LineChart
					data={data.map((point) => {
						return {
							...point,
							time: point.time - timeOffset
						};
					})}
					margin={{
						top: 5,
						right: 10,
						left: 25,
						bottom: 25
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />

					<XAxis allowDecimals={false} type="number" dataKey="time">
						<Label value="Time (s)" position="bottom" offset={0} />
					</XAxis>
					<YAxis>
						<Label value="Altitude (m)" angle={-90} position="left" offset={0} />
					</YAxis>
					<Tooltip />
					<Legend align="right" verticalAlign="top" />
					<Line
						connectNulls
						name="Desired Altitude"
						type="montone"
						dataKey="refAlt"
						stroke="#ED8936"
						dot={false}
						strokeWidth={3}
					/>
					<Line
						connectNulls
						name="Actual Altitude"
						type="montone"
						dataKey="altitude"
						stroke="#8884d8"
						dot={false}
						strokeWidth={3}
					/>
				</LineChart>
			</ResponsiveContainer>
		</Flex>
	);
}
