import React, { Component } from 'react';
import Chart from '../components/chart';

export default class RainGraph extends Component {
    constructor(props) {
        super(props)
    }
    renderRain(rain) {

        return (
        )
    }

    render() {
        const rain = this.props.rain[0] || []
        return (
            <div>
                {this.renderRain(rain)}
            </div>
        )
    }
}