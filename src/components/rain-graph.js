import React, { Component } from 'react';
import Chart from '../components/chart';

export default class RainGraph extends Component {
    constructor(props) {
        super(props)
    }
    renderRain(rain) {
        if (rain.length == 0) return;
        let rainData = [];
        let timeData = [];
        for (let i = 0; i < rain.length; i++) {
            let d = new Date(rain[i].dateTime);
            timeData.push(rain[i].dateTime);
            rainData.push(rain[i].value)
        }

        let list = [];
        for (let j = 0; j < timeData.length; j++)
            list.push({ 'time': timeData[j], 'rain': rainData[j] });

        list.sort(function (a, b) {
            return ((a.time < b.time) ? -1 : ((a.time == b.time) ? 0 : 1));
        });

        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let currentDay = new Date(list[0].time);
        let binBound = currentDay;
        let binnedDays = [`${days[binBound.getDay()]} ${binBound.getDate().toString()}-${((binBound.getMonth() + 1).toString()[0] == "0" ? (binBound.getMonth() + 1).toString()[0] : "0" + (binBound.getMonth() + 1).toString()[0])}-${binBound.getFullYear().toString()}${this.props.binDenom != "days" ? " " + binBound.getHours() + ":" + binBound.getMinutes() : ""}`];
        let binnedRain = [0];
        let currentIndex = 0;
        
        switch (this.props.binDenom) {
            case "days":
                binBound.setDate(binBound.getDate() + parseInt(this.props.binTime));
                break;
            case "hours":
                binBound.setHours(binBound.getHours() + parseInt(this.props.binTime));
                break;
            case "minutes":
                binBound.setMinutes(binBound.getMinutes() + parseInt(this.props.binTime));
                break;
        }

        for (let i = 0; i < list.length; i++) {
            let datetime = new Date(list[i].time);
            if (datetime < binBound) {
                binnedRain[currentIndex] = binnedRain[currentIndex] + list[i].rain;
            } else {
                binnedDays.push(`${days[binBound.getDay()]} ${binBound.getDate().toString()}-${((binBound.getMonth() + 1).toString()[0] == "0" ? (binBound.getMonth() + 1).toString()[0] : "0" + (binBound.getMonth() + 1).toString()[0])}-${binBound.getFullYear().toString()}${this.props.binDenom != "days" ? " " + binBound.getHours() + ":" + binBound.getMinutes() : ""}`);
                binnedRain.push(list[i].rain);
                currentIndex += 1;
                switch (this.props.binDenom) {
                    case "days":
                        binBound.setDate(binBound.getDate() + parseInt(this.props.binTime));
                        break;
                    case "hours":
                        binBound.setHours(binBound.getHours() + parseInt(this.props.binTime));
                        break;
                    case "minutes":
                        binBound.setMinutes(binBound.getMinutes() + parseInt(this.props.binTime));
                        break;
                }
            }
        }

        let data = []
        binnedRain.forEach((value, index) => {
            data.push({ date: binnedDays[index], value: value })
        })

        return (
            <Chart data={data} />
        )
    }

    render() {
        const rain = this.props.rain || []
        return (
            <div className={this.props.className}>
                {this.renderRain(rain)}
            </div>
        )
    }
}