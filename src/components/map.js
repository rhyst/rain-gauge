import React, { Component, render } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

export const GoogleMapWrapper = withGoogleMap(props => (
    <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={9}
        defaultCenter={{ lat: 54.17, lng: -2.4 }}
        onClick={props.onMapClick}
    >
        {props.markers.map((marker, index) => (
            <Marker
                {...marker}
                onRightClick={() => props.onMarkerRightClick(index)}
            />
        ))}
    </GoogleMap>
));