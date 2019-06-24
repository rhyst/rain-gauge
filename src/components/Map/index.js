import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon } from "leaflet";
import { Map, Marker, TileLayer } from "react-leaflet";
import PropTypes from "prop-types";

import {
  fetchRain,
  setStation,
  setStationsCentre,
  fetchStations
} from "../../redux/actions";
import { rainIcon, rainSelectedIcon, locateIcon } from "../../constants/icons";

const rain = new Icon({
  iconUrl: `data:image/svg+xml;base64,${btoa(rainIcon)}`,
  iconAnchor: [25, 59],
  iconSize: [50, 60]
});

const rainSelected = new Icon({
  iconUrl: `data:image/svg+xml;base64,${btoa(rainSelectedIcon)}`,
  iconAnchor: [25, 59],
  iconSize: [50, 60]
});

const locate = new Icon({
  iconUrl: `data:image/svg+xml;base64,${btoa(locateIcon)}`,
  iconSize: [30, 30]
});

class LeafletMap extends Component {
  static propTypes = {
    stations: PropTypes.shape({
      stations: PropTypes.array,
      stationsCentre: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number
      })
    }),
    fetchRain: PropTypes.func,
    setStation: PropTypes.func,
    fetchStations: PropTypes.func,
    setStationsCentre: PropTypes.func,
    ui: PropTypes.shape({
      station: PropTypes.string,
      duration: PropTypes.number,
      denomination: PropTypes.string
    })
  };

  render() {
    const position = [54.18467, -2.8];
    return (
      <Map
        center={position}
        zoom={8}
        onClick={e => {
          this.props.setStationsCentre(e.latlng);
          this.props.fetchStations(e.latlng);
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {this.props.stations.stations.map(station => (
          <Marker
            key={station.stationReference}
            position={[station.lat, station.long]}
            icon={
              station.stationReference === this.props.ui.station
                ? rainSelected
                : rain
            }
            onClick={() => {
              this.props.setStation(station.stationReference);
              this.props.fetchRain(
                station.stationReference,
                this.props.ui.duration,
                this.props.ui.denomination
              );
            }}
          />
        ))}
        <Marker
          icon={locate}
          position={[
            this.props.stations.stationsCentre.lat,
            this.props.stations.stationsCentre.lng
          ]}
        />
      </Map>
    );
  }
}

export default connect(
  state => ({
    stations: state.stations,
    ui: state.ui
  }),
  { fetchRain, fetchStations, setStation, setStationsCentre }
)(LeafletMap);
