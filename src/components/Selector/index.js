import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Select, Label, Control, Field, Input } from "bloomer";
import PropTypes from "prop-types";

import { fetchRain, fetchStations } from "../../redux/actions";

const defaultStation = 571479;
const defaultTime = 1;
const defaultDenomination = "days";

class Selector extends Component {
  static propTypes = {
    stations: PropTypes.array,
    fetchRain: PropTypes.func,
    fetchStations: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      station: defaultStation,
      time: defaultTime,
      denomination: defaultDenomination
    };
    this.props.fetchRain(defaultStation);
    this.props.fetchStations();
  }

  render() {
    return (
      <Field isHorizontal style={{ alignItems: "flex-end" }}>
        <Control>
          <Label>Station</Label>
          <Select
            disabled={!this.props.stations.length}
            value={this.state.station}
            onChange={event => this.setState({ station: event.target.value })}
          >
            {this.props.stations.map(station => (
              <option
                key={station.stationReference}
                value={station.stationReference}
              >
                {station.gridReference}
              </option>
            ))}
          </Select>
        </Control>
        <Control>
          <Label>Time</Label>
          <Input
            type="number"
            style={{ width: "80px" }}
            value={this.state.time}
            onChange={event => this.setState({ time: event.target.value })}
          />
        </Control>
        <Control>
          <Select
            value={this.state.denomination}
            onChange={event =>
              this.setState({ denomination: event.target.value })
            }
          >
            <option value={"days"}>Days</option>
            <option value={"hours"}>Hours</option>
            <option value={"minutes"}>Minutes</option>
          </Select>
        </Control>
        <Button
          className="fetch-button"
          onClick={() =>
            this.props.fetchRain(
              this.state.station,
              this.state.time,
              this.state.denomination
            )
          }
          isColor="primary"
        >
          Fetch
        </Button>
      </Field>
    );
  }
}

export default connect(
  state => ({
    stations: state.stations
  }),
  { fetchRain, fetchStations }
)(Selector);
