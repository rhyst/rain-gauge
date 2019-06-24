import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Section,
  Content,
  Title,
  Notification,
  Delete
} from "bloomer";
import PropTypes from "prop-types";

import { Graph, Selector, Progress, LeafletMap } from "./components";
import { fetchRain, fetchStations, clearRainError } from "./redux/actions";

class App extends Component {
  static propTypes = {
    rain: PropTypes.shape({
      data: PropTypes.array,
      loading: PropTypes.bool,
      error: PropTypes.bool
    }),
    fetchRain: PropTypes.func,
    fetchStations: PropTypes.func,
    clearRainError: PropTypes.func,
    ui: PropTypes.shape({
      station: PropTypes.string,
      duration: PropTypes.number,
      denomination: PropTypes.string
    }),
    stations: PropTypes.shape({
      stations: PropTypes.array,
      stationsCentre: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number
      })
    })
  };

  constructor(props) {
    super(props);
    this.props.fetchRain(
      this.props.ui.station,
      this.props.ui.duration,
      this.props.ui.denomination
    );
    this.props.fetchStations(this.props.stations.stationsCentre);
  }

  render() {
    return (
      <>
        <Section>
          <Container>
            <Title>Rainfall Data</Title>
            <Content>
              <p>
                The Environment Agency has approximately 1000 real time rain
                gauges which are connected by telemetry. Measurements of the
                amount of precipitation (mm) are captured in Tipping Bucket
                Raingauges (TBR).
              </p>
              <p>
                Gauges are listed below by their grid reference. Select a gauge
                for live visualisation of rainfall data.
              </p>
            </Content>
            <Selector />
            {this.props.rain.loading ? (
              <Progress />
            ) : (
              <div className="progress-placeholder" />
            )}
            <Graph data={this.props.rain.data} />
          </Container>
        </Section>
        {this.props.rain.error && (
          <Section>
            <Notification isColor="danger" onClick={this.props.clearRainError}>
              <Delete />
              An error occured when fetching rainfall data. Please try again.
            </Notification>
          </Section>
        )}
        <Section>
          <Container>
            <LeafletMap />
          </Container>
        </Section>
        <Section style={{ marginTop: "auto" }}>
          <Container>
            <Content isSize="small">
              <p>
                This uses Environment Agency flood and river level data from the
                real-time data API (Beta)
              </p>
            </Content>
          </Container>
        </Section>
      </>
    );
  }
}

export default connect(
  state => ({
    rain: state.rain,
    ui: state.ui,
    stations: state.stations
  }),
  { fetchRain, fetchStations, clearRainError }
)(App);
