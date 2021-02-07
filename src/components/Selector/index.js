import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Select,
  Label,
  Control,
  Field,
  Input,
  Checkbox,
} from "bloomer";
import PropTypes from "prop-types";

import {
  fetchRain,
  fetchStations,
  setStation,
  setDenomination,
  setDuration,
  setBinDenomination,
  setBinDuration,
} from "../../redux/actions";

class Selector extends Component {
  static propTypes = {
    stations: PropTypes.shape({
      stations: PropTypes.array,
      stationsCentre: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number,
      }),
    }),
    fetchRain: PropTypes.func,
    fetchStations: PropTypes.func,
    setStation: PropTypes.func,
    setDuration: PropTypes.func,
    setDenomination: PropTypes.func,
    setBinDuration: PropTypes.func,
    setBinDenomination: PropTypes.func,
    rain: PropTypes.shape({
      data: PropTypes.array,
      loading: PropTypes.bool,
      error: PropTypes.bool,
      binDuration: PropTypes.number,
      binDenomination: PropTypes.string,
    }),
    ui: PropTypes.shape({
      station: PropTypes.string,
      duration: PropTypes.number,
      denomination: PropTypes.string,
    }),
  };

  constructor(props) {
    super(props);
    this.state = {
      polling: false,
    };
  }

  handleCheck = (event) => {
    const polling = event.target.checked;
    this.setState({ polling });
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    if (polling) {
      this.props.fetchRain();
      this.interval = setInterval(() => {
        this.props.fetchRain(
          this.props.ui.station,
          this.props.ui.duration,
          this.props.ui.denomination
        );
      }, 15 * 60 * 1000);
    }
  };

  render() {
    return (
      <>
        <Field isHorizontal style={{ alignItems: "flex-end" }}>
          <Control>
            <Label>Station</Label>
            <Select
              disabled={!this.props.stations.stations.length}
              value={this.props.ui.station}
              onChange={(event) => this.props.setStation(event.target.value)}
            >
              {this.props.stations.stations.map((station) => (
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
              value={this.props.ui.duration}
              onChange={(event) => this.props.setDuration(event.target.value)}
            />
          </Control>

          <Control>
            <Select
              value={this.props.ui.denomination}
              onChange={(event) =>
                this.props.setDenomination(event.target.value)
              }
            >
              <option value={"days"}>Days</option>
              <option value={"hours"}>Hours</option>
              <option value={"minutes"}>Minutes</option>
            </Select>
          </Control>
          <Button
            disabled={this.props.rain.loading}
            className="fetch-button"
            onClick={() =>
              this.props.fetchRain(
                this.props.ui.station,
                this.props.ui.duration,
                this.props.ui.denomination
              )
            }
            isColor="primary"
          >
            Fetch
          </Button>
        </Field>
        <Field isHorizontal style={{ alignItems: "flex-end" }}>
          <Control>
            <Label>Binning</Label>
            {this.props.rain.binDenomination === "minutes" ? (
              <Select
                value={this.props.rain.binDuration}
                onChange={(event) =>
                  this.props.setBinDuration(event.target.value)
                }
              >
                <option value={15}>15</option>
                <option value={30}>30</option>
                <option value={45}>45</option>
              </Select>
            ) : (
              <Input
                type="number"
                style={{ width: "80px" }}
                value={this.props.rain.binDuration}
                onChange={(event) =>
                  this.props.setBinDuration(event.target.value)
                }
              />
            )}
          </Control>
          <Control>
            <Select
              value={this.props.rain.binDenomination}
              onChange={(event) =>
                this.props.setBinDenomination(event.target.value)
              }
            >
              <option value={"days"}>Days</option>
              <option value={"hours"}>Hours</option>
              <option value={"minutes"}>Minutes</option>
            </Select>
          </Control>
        </Field>

        <Field isHorizontal>
          <Control>
            <Checkbox value={this.state.polling} onChange={this.handleCheck}>
              Refresh every 15 minutes
            </Checkbox>
          </Control>
        </Field>
      </>
    );
  }
}

export default connect(
  (state) => ({
    rain: state.rain,
    stations: state.stations,
    ui: state.ui,
  }),
  {
    fetchRain,
    fetchStations,
    setDenomination,
    setDuration,
    setStation,
    setBinDenomination,
    setBinDuration,
  }
)(Selector);
