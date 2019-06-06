import React from "react";
import { Box, Content } from "bloomer";

import PropTypes from "prop-types";
import Dayjs from "dayjs";

const CustomTooltip = props => {
  const { active, payload, label } = props;

  if (active && payload) {
    const dayjs = new Dayjs(label);
    return (
      <Box>
        <Content>
          <p>
            <strong>{dayjs.format("YYYY-MM-DD HH:mm")}</strong>
          </p>
          <p>Rain: {payload[0].value} mm</p>
        </Content>
      </Box>
    );
  }

  return null;
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  type: PropTypes.string,
  payload: PropTypes.array,
  label: PropTypes.string
};

export default CustomTooltip;
