import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon } from "leaflet";
import { Map, Marker, TileLayer } from "react-leaflet";
import PropTypes from "prop-types";

import { fetchRain, setStation } from "../../redux/actions";
import { rainIcon, rainSelectedIcon } from "../../constants/icons";

class LeafletMap extends Component {
  static propTypes = {
    stations: PropTypes.array,
    fetchRain: PropTypes.func,
    setStation: PropTypes.func,
    ui: PropTypes.shape({
      station: PropTypes.string,
      duration: PropTypes.number,
      denomination: PropTypes.string
    })
  };

  icon = icon =>
    new Icon({
      iconUrl: `data:image/svg+xml;base64,${btoa(icon)}`,
      iconAnchor: [25, 59],
      iconSize: [50, 60]
    });

  render() {
    const position = [54.18467, -2.8];
    return (
      <Map center={position} zoom={8}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {this.props.stations.map(station => (
          <Marker
            key={station.stationReference}
            position={[station.lat, station.long]}
            icon={
              station.stationReference === this.props.ui.station
                ? this.icon(rainSelectedIcon)
                : this.icon(rainIcon)
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
      </Map>
    );
  }
}

export default connect(
  state => ({
    stations: state.stations,
    ui: state.ui
  }),
  { fetchRain, setStation }
)(LeafletMap);
