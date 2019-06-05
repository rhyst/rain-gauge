import React from "react";
import { Box, Content } from "bloomer";
import PropTypes from "prop-types";

const Tooltip = props => {
  return (
    <g style={{ pointerEvents: "none" }}>
      <foreignObject x={props.x} y={props.y} width="200" height="200">
        <Box>
          <Content>
            <div>{props.xData[props.datum.x]}</div>
            {props.yData.map((x, i) => (
              <div key={i}>
                {x.name}: {x.data[props.datum.x]}mm
              </div>
            ))}
          </Content>
        </Box>
      </foreignObject>
    </g>
  );
};

Tooltip.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  datum: PropTypes.shape({
    x: PropTypes.number
  }),
  yData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      data: PropTypes.arrayOf(PropTypes.number)
    })
  ),
  xData: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  )
};

export default Tooltip;
