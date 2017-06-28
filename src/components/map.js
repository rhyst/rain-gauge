import React, { Component, render } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

export const GoogleMapWrapper = withGoogleMap(props => (
    <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={props.defaultZoom}
        defaultCenter={props.defaultCenter}
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