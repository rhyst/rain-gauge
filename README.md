# Rainfall Data

A simple SPA to show rainfall data from the [Environment Agency](https://environment.data.gov.uk/flood-monitoring/doc/rainfall). In their words:

    The Environment Agency has approximately 1000 real time rain gauges which are connected by telemetry. Measurements of the amount of precipitation (mm) are captured in Tipping Bucket Raingauges (TBR). The data reported here gives accumulated totals for each 15 min period. The data is typically transfered once or twice per day.

## Install

To install dependencies:

    npm install

To run development version:

    npm dev

## Usage

The application allows you to select a rainfall station from a selection of stations in Yorkshire and a duration to gather data over. This is then displayed on a chart.

## Frameworks and libraries

Tech choices:

    - React - UI Framework
    - Bloomer - Bulma based React Component library
    - Rechart - React chart/graph library
    - Redux - State management and actions
    - Redux-thunk - Handle asynchronous redux actions
