import React from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import PropTypes from "prop-types";

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en-GB");

const renderCustomAxisTick = ({ x, y, payload }) => {
  return (
    <svg>
      <text
        width="530"
        height="30"
        x={x}
        y={y}
        stroke="none"
        fill="#666"
        className="recharts-text recharts-cartesian-axis-tick-value"
        textAnchor="middle"
      >
        <tspan x={x} y={y + 20}>
          {timeAgo.format(new Date(payload.value))}
        </tspan>
      </text>
    </svg>
  );
};

renderCustomAxisTick.propTypes = {
  y: PropTypes.number,
  x: PropTypes.number,
  payload: PropTypes.array
};

export default renderCustomAxisTick;
