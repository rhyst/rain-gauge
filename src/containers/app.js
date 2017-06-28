import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import RainGraph from '../components/rain-graph';
import StationSelector from '../components/station-selector';
import { GoogleMapWrapper } from '../components/map';

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
    this.handleMarkerClick = this.handleMarkerClick.bind(this);

    this.state = { binTime: '1', binDenom: 'days', localBinTime: '1', localBinDenom: 'days', lengthTime: '10', lengthDenom: 'days', stationID: '571479', stations: [], markers: [] };

    this.props.fetchRain(this.state.stationID, this.state.lengthTime, this.state.lengthDenom)
    this.props.fetchStations();   
  }

  componentWillReceiveProps(nextProps) {
    this.setState({stations: nextProps.stations});
    let markers = [];
    if (nextProps.stations) {
      markers = nextProps.stations.map((station) => {
        if (this.state.stationID == station.stationReference) {
          return { position: { lat: station.lat, lng: station.long }, key: station.gridReference, onClick: this.handleMarkerClick, icon: 'selectedpin.png' }
        } else {
          return { position: { lat: station.lat, lng: station.long }, key: station.gridReference, onClick: this.handleMarkerClick }
        }
      })
    }
    this.setState({markers})
  }

  handleStationChange(stationID) {
    this.setState({ stationID })
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
    this.setState({ binDenom: this.state.localBinDenom, binTime: this.state.localBinTime })
    this.props.fetchRain(this.state.stationID, this.state.lengthTime, this.state.lengthDenom)
  }

  handleMarkerClick(clicked) {
    let newStations = this.state.stations.map((station) => {
      let clickedLng = Number(Math.round(clicked.latLng.lng()+'e'+station.long.toString().length)+'e-'+station.long.toString().length)
      let clickedLat = Number(Math.round(clicked.latLng.lat()+'e'+station.lat.toString().length)+'e-'+station.lat.toString().length)
      if (station.lat.toString() == clickedLat && station.long.toString() == clickedLng) {
        this.setState({ stationID: station.stationReference })
        this.props.fetchRain(this.state.stationID, this.state.lengthTime, this.state.lengthDenom)
      }
    })
  }

  render() {
    return (
      <div>
        <div className="row">
          <h1 className="col-xs-12">Rain Gauge</h1>
        </div>
        <div className="row">
          <RainGraph className="col-xs-12" rain={this.props.rain} binDenom={this.state.binDenom} binTime={this.state.binTime} />
        </div>
        <div className="row">
          <form className="form-horizontal col-lg-6 col-xs-12">
            <span className="form-group col-xs-12">
              <label className="col-xs-3 col-sm-2 control-label">Station</label>
              <span className="col-xs-9 col-sm-10">
                <StationSelector stations={this.state.stations} handleChange={this.handleStationChange} value={this.state.stationID} />
              </span>
            </span>
            <span className="form-group col-xs-12">
              <label className="col-xs-3 col-sm-2 control-label">Binning</label>
              <span className="col-xs-4 col-sm-5">
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
              <label className="col-xs-3 col-sm-2 control-label">Length</label>
              <span className="col-xs-4 col-sm-5">
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
              <a href="#" className="btn btn-primary col-xs-4 col-xs-offset-4" onClick={this.handleSubmit}>Submit</a>
            </span>
          </form>
          <GoogleMapWrapper
            containerElement={
              <div className="col-xs-12 col-lg-6" style={{ height: `500px` }} />
            }
            mapElement={
              <div style={{ height: `100%` }} />
            }
            markers={this.state.markers}
            defaultCenter={{ lat: 54.17, lng: -2.4 }}
            defaultZoom={9}
          />
        </div>
        <div className="row">
          <div className="col-xs-12">
            <p></p>
            <p>This uses Environment Agency flood and river level data from the <a href="http://environment.data.gov.uk/flood-monitoring/doc/reference">real-time data API (Beta)</a></p>
            <p>Source code can be found on <a href="https://github.com/rhyst/rain-gauge">GitHub</a></p>
          </div>
        </div>
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