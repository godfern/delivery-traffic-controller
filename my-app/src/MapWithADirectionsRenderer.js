import React from 'react'
import {withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer, TrafficLayer} from "react-google-maps"

const google = window.google;

const MapWithADirectionsRenderer = withGoogleMap(props =>
    <GoogleMap
      defaultZoom={8}
      defaultCenter={new google.maps.LatLng(12.9268202, 77.6922076)}
    >
      {props.directions && 
            <div> 
            <DirectionsRenderer directions={props.directions} />
            </div>
    }
    <TrafficLayer autoUpdate />
    </GoogleMap>
  );
  
 export default MapWithADirectionsRenderer;