import React from 'react';
import { ResponsiveContainer, BarChart, Bar, YAxis, XAxis, CustomBarLabel, Tooltip } from 'recharts';

const CustomizedLabel = React.createClass({
    render() {
        const { x, y, stroke, value } = this.props;
        return <text x={x} y={y} fill="#666" className="recharts-text recharts-label" textAnchor="middle" transform="rotate(-90)"><tspan x={-170}>{value}</tspan></text>
    }
});
const CustomizedAxisTick = React.createClass({
    render() {
        const { x, y, stroke, payload } = this.props;

        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-60)">{payload.value}</text>
            </g>
        );
    }
});

export default (props) => {
    return (
        <ResponsiveContainer width="100%" height={500}>
            <BarChart data={props.data} barGap={0}  barCategoryGap={0}>
                <XAxis dataKey="date" tick={<CustomizedAxisTick />} height={150} interval={0} />
                <YAxis unit="mm" label={<CustomizedLabel x={35} y={10} value="Rainfall/mm" />} width={30} />
                <Tooltip />
                <Bar type="monotone" dataKey="value" fill="#4286f4" />
            </BarChart>
        </ResponsiveContainer>

    )
}