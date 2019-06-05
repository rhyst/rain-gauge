import React, { Component } from "react";
import { render } from "react-dom";
/* eslint-disable-next-line no-unused-vars */
import bulma from "bulma";
import { Container, Section, Content, Title, Button } from "bloomer";
import { generateData } from "./util";

import { Graph } from "./components";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      environmentAgencyData: generateData(),
      metOfficeData: generateData()
    };
  }

  generateData = () => {
    this.setState({
      environmentAgencyData: generateData(),
      metOfficeData: generateData()
    });
  };

  render() {
    return (
      <Section>
        <Container>
          <Title>Rain Get</Title>
          <Content>
            <p>
              See below for live visualisation of the Met Office and Environment
              Agency observations.
            </p>
          </Content>
          <Button onClick={this.generateData}>Regenerate</Button>
          <Graph
            metOfficeData={this.state.metOfficeData}
            environmentAgencyData={this.state.environmentAgencyData}
          />
        </Container>
      </Section>
    );
  }
}

render(<App />, document.getElementById("app"));
