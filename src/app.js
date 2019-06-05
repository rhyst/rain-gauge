import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Section, Content, Title } from "bloomer";
import PropTypes from "prop-types";

import { Graph, Selector } from "./components";
import { fetchRain, fetchStations } from "./redux/actions";

const defaultStation = 571479;

class App extends Component {
  static propTypes = {
    rain: PropTypes.array,
    fetchRain: PropTypes.func,
    fetchStations: PropTypes.func
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
            <Graph data={this.props.rain} />
          </Container>
        </Section>
        <Section style={{ marginTop: "auto" }}>
          <Container>
            <Content isSize="small">
              <p>
                This uses Environment Agency flood and river level data from the
                real-time data API (Beta)
              </p>
            </Content>{" "}
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
  { fetchRain, fetchStations }
)(App);
