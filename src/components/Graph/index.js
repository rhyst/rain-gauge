import React, { Component } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import PropTypes from "prop-types";
import { Content, Columns, Column } from "bloomer";

import CustomTooltip from "./Tooltip";
import renderCustomAxisTick from "./Tick";

class Chart extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return this.props.data.length ? (
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={this.props.data}>
          <Area type="monotone" dataKey="y" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis tick={renderCustomAxisTick} dataKey="x" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
        </AreaChart>
      </ResponsiveContainer>
    ) : (
      <Columns isCentered>
        <Column>
          <Content>
            <p>No data, try a different station or time</p>
          </Content>
        </Column>
      </Columns>
    );
  }
}

export default Chart;
