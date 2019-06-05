import React, { Component } from "react";
import {
  VictoryChart,
  VictoryArea,
  VictoryAxis,
  VictoryVoronoiContainer,
  VictoryLine,
  VictoryScatter,
  VictoryTooltip
} from "victory";
import PropTypes from "prop-types";
import Tooltip from "./Tooltip";
import Colours from "../../constants/colours";

const fontFamily = `BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif`;
const textStyle = {
  fontSize: 16,
  fontFamily
};
const animationOptions = {
  duration: 1000,
  onLoad: { duration: 1000 }
};

class Chart extends Component {
  chart = null;

  static propTypes = {
    environmentAgencyData: PropTypes.array.isRequired,
    metOfficeData: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      width: 600
    };
  }

  componentDidMount() {
    window.addEventListener(
      "resize",
      () => this.chart && this.setState({ width: this.chart.offsetWidth })
    );
  }

  render() {
    return (
      <VictoryChart
        containerComponent={
          <VictoryVoronoiContainer
            labels={() => ""}
            labelComponent={
              <VictoryTooltip
                flyoutComponent={
                  <Tooltip
                    xData={this.props.environmentAgencyData.map(d => d.x)}
                    yData={[
                      {
                        name: "EA",
                        data: this.props.environmentAgencyData.map(d => d.y)
                      },
                      {
                        name: "MO",
                        data: this.props.metOfficeData.map(d => d.y)
                      }
                    ]}
                  />
                }
              />
            }
            voronoiDimension="x"
            containerRef={ref => {
              if (ref) {
                this.chart = ref;
                if (ref.offsetWidth !== this.state.width) {
                  this.setState({ width: ref.offsetWidth });
                }
              }
            }}
          />
        }
        height={300}
        width={this.state.width}
        responsive={false}
        domain={{
          y: [0, 80],
          x: [0, this.props.environmentAgencyData.length - 1]
        }}
        padding={{ left: 55, bottom: 55, top: 30, right: 30 }}
      >
        <VictoryArea
          style={{ data: { fill: Colours.environmentAgencyArea } }}
          data={this.props.environmentAgencyData}
          animate={animationOptions}
          interpolation="natural"
        />
        <VictoryLine
          style={{ data: { stroke: Colours.metOfficeLine } }}
          data={this.props.metOfficeData}
          interpolation="natural"
          animate={animationOptions}
        />
        <VictoryScatter
          style={{ data: { fill: Colours.environmentAgencyDots } }}
          data={this.props.environmentAgencyData}
          animate={animationOptions}
        />
        <VictoryScatter
          style={{ data: { fill: Colours.metOfficeLine } }}
          data={this.props.metOfficeData}
          animate={animationOptions}
        />
        <VictoryAxis
          label="Date"
          tickFormat={tick => tick}
          style={{
            axisLabel: { ...textStyle, padding: 40 },
            tickLabels: textStyle
          }}
        />
        <VictoryAxis
          label="Rain / mm"
          dependentAxis
          tickFormat={tick => tick}
          style={{
            axisLabel: { ...textStyle, padding: 40 },
            tickLabels: textStyle,
            grid: { stroke: "#0a0a0a30" }
          }}
        />
      </VictoryChart>
    );
  }
}

export default Chart;
