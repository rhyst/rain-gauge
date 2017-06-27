import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RainGraph from '../components/rain-graph';
import StationSelector from '../components/station-selector';

import { fetchRain } from '../actions/index';
import { fetchStations } from '../actions/index';


class App extends Component {
  constructor(props) {
    super(props)

    this.handleStationChange = this.handleStationChange.bind(this);
    this.handleBinDenomChange = this.handleBinDenomChange.bind(this);
    this.handleBinTimeChange = this.handleBinTimeChange.bind(this);
    this.handleLengthDenomChange = this.handleLengthDenomChange.bind(this);
    this.handleLengthTimeChange = this.handleLengthTimeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = { binTime: '1', binDenom: 'days', localBinTime: '1', localBinDenom: 'days', lengthTime: '10', lengthDenom: 'days', stationID: '571479' };

    this.props.fetchRain(this.state.stationID, this.state.lengthTime, this.state.lengthDenom)
    this.props.fetchStations();
  }

  handleStationChange(stationID) {
    this.setState({stationID})
  }

  handleBinDenomChange(event) {
    this.setState({ localBinDenom: event.target.value });
  }

  handleBinTimeChange(event) {
    this.setState({ localBinTime: event.target.value });
  }

  handleLengthDenomChange(event) {
    this.setState({ lengthDenom: event.target.value });
  }

  handleLengthTimeChange(event) {
    this.setState({ lengthTime: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({binDenom: this.state.localBinDenom, binTime: this.state.localBinTime})
    this.props.fetchRain(this.state.stationID, this.state.lengthTime, this.state.lengthDenom)
  }

  render() {
    return (
      <div>
        <RainGraph rain={this.props.rain} binDenom={this.state.binDenom} binTime={this.state.binTime}/>
        <form className="form-horizontal col-lg-6 col-xs-12 well col-lg-offset-3">
          <span className="form-group col-xs-12">
            <label className="col-xs-2 control-label">Station</label>
            <span className="col-xs-3">
              <StationSelector stations={this.props.stations} handleChange={this.handleStationChange} value={this.state.stationID}/>
            </span>
          </span>
          <span className="form-group col-xs-12">
            <label className="col-xs-2 control-label">Binning</label>
            <span className="col-xs-5">
              <input type="text" value={this.state.localBinTime} className="form-control" onChange={this.handleBinTimeChange}></input>
            </span>
            <span className="col-xs-5">
              <select className="form-control" value={this.state.localBinDenom} onChange={this.handleBinDenomChange}>
                <option value="days">Days</option>
                <option value="hours">Hours</option>
                <option value="minutes">Minutes</option>
              </select>
            </span>
          </span>
          <span className="form-group col-xs-12">
            <label className="col-xs-2 control-label">Length</label>
            <span className="col-xs-5">
              <input type="text" value={this.state.lengthTime} className="form-control" onChange={this.handleLengthTimeChange}></input>
            </span>
            <span className="col-xs-5">
              <select className="form-control" value={this.state.lengthDenom} onChange={this.handleLengthDenomChange}>
                <option value="days">Days</option>
                <option value="hours">Hours</option>
                <option value="minutes">Minutes</option>
              </select>
            </span>
          </span>
          <span className="form-group col-xs-12">
            <a href="#" className="btn btn-primary col-xs-3" onClick={this.handleSubmit}>Submit</a>
          </span>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchRain, fetchStations }, dispatch);
}

function mapStateToProps({ rain, stations }) {
  return { rain, stations };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);