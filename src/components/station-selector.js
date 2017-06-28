import React, { Component } from 'react';
import Chart from './chart';

export default class StationSelector extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
    }

    renderStation(station) {
        return (
            <option key={station.stationReference} value={station.stationReference}>
                { station.gridReference }
            </option>
        );
    }

    handleChange(event) {
        this.props.handleChange(event.target.value);
    }

    render() {
        const stations = this.props.stations || [];
        return (
            <select className="form-control" onChange={this.handleChange} value={this.props.value}>
                {stations.map(this.renderStation)}
            </select>
        )
    }
}