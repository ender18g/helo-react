import React from 'react';
import { PureComponent } from 'react';
import { Flex, Heading, Text } from '@chakra-ui/react';
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

	//adjust time so that it starts at 0
	const timeOffset = data.length > 2 ? data[2].time : 0;

	// go through data and adjust time
	for (let i = 0; i < data.length; i++) {
		data[i].time -= timeOffset;
		// make sure time is positive
		if (data[i].time < 0) {
			data[i].time = 0;
		}
	}

	//trim off last 1 data points
	data.splice(data.length - 1, 1);

	return (
		<Flex w={'100vw'} mt={4}>
			<ResponsiveContainer width={'100%'} height={500}>
				<LineChart
					data={data}
					margin={{
						top: 5,
						right: 10,
						left: 10,
						bottom: 5
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />

					<XAxis allowDecimals={false} type="number" dataKey="time" interval={'preserveEnd'}>
						<Label margin="3" value="Time (s)" position="bottom" offset={0} />
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
