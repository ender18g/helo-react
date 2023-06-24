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
	ReferenceLine
} from 'recharts';

export default function PlotBox(props) {
	const { data } = props;
	//log keys

	return (
		<Flex>
			<LineChart
				width={600}
				height={400}
				data={data}
				margin={{
					top: 5,
					right: 30,
					left: 20,
					bottom: 5
				}}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="time" interval={'preserveStartEnd'} />
				<YAxis />

				<Legend />
				<Line connectNulls type="montone" dataKey="refAlt" stroke="#8884d8" dot={false} />
				<Line connectNulls type="montone" dataKey="altitude" stroke="#8884d8" dot={false} />
			</LineChart>
		</Flex>
	);
}
