import React, { Component } from "react";
import { Progress } from "bloomer";

class CustomProgress extends Component {
  callback = null;

  constructor() {
    super();
    this.state = { value: 0 };
  }

  increment = () => {
    this.setState(state => ({
      value: state.value < 100 ? state.value + 0.5 : 0
    }));
    this.callback = window.requestAnimationFrame(this.increment);
  };

  componentDidMount() {
    this.increment();
  }

  componentWillUnmount() {
    if (this.callback) cancelAnimationFrame(this.callback);
  }

  render() {
    return (
      <Progress
        isSize="small"
        isColor="primary"
        value={this.state.value}
        max={100}
      />
    );
  }
}

export default CustomProgress;
