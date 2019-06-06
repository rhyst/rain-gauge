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

import { Graph, Selector, Progress } from "./components";
import { fetchRain, fetchStations, clearRainError } from "./redux/actions";

const defaultStation = 571479;

class App extends Component {
  static propTypes = {
    rain: PropTypes.shape({
      data: PropTypes.array,
      loading: PropTypes.bool,
      error: PropTypes.bool
    }),
    fetchRain: PropTypes.func,
    fetchStations: PropTypes.func,
    clearRainError: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.props.fetchRain(defaultStation);
  }

  render() {
    return (
      <>
        <Section>
          <Container>
            <Title>Rainfall Data</Title>
            <Content>
              <p>
                Select a measurement station below for live visualisation of the
                Environment Agency rainfall data.
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
        <Section>
          {this.props.rain.error && (
            <Notification isColor="danger" onClick={this.props.clearRainError}>
              <Delete />
              An error occured when fetching rainfall data. Please try again.
            </Notification>
          )}
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
    rain: state.rain
  }),
  { fetchRain, fetchStations, clearRainError }
)(App);
