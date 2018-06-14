import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, BicyclingLayer, DirectionsRenderer, TrafficLayer } from "react-google-maps";
import { compose, withProps, lifecycle } from "recompose";
import logo from './logo.svg';
import './App.css';

const google = window.google;

const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({

    componentDidMount() {
      const DirectionsService = new google.maps.DirectionsService();

      let test = this.props;

      DirectionsService.route({
        origin: new google.maps.LatLng(12.9280384,77.6917463),
        destination: new google.maps.LatLng(12.9287933,77.6942702),
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints: [
          {
             location: new google.maps.LatLng(12.9295876,77.6923302)
          },
          {
             location: new google.maps.LatLng(12.9299929,77.6919232)
          }
        ],
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    }
  })
)(props =>
  <GoogleMap
    defaultZoom={16}
    defaultCenter={new google.maps.LatLng(12.9268202,77.6922076)}
  >
    {props.directions && <DirectionsRenderer directions={props.directions} />}
    <TrafficLayer autoUpdate />
  </GoogleMap>
);



class App extends Component {

  state = {
    isMarkerShown: false,
  }


  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }


  render() {

    const d1 = {places:{
        origin: new google.maps.LatLng(12.9280384,77.6917463),
        destination: new google.maps.LatLng(12.9287933,77.6942702),
        travelMode: google.maps.TravelMode.DRIVING,
      }};
      const d2 = {places:{
        origin: new google.maps.LatLng(12.9289951,77.6938562),
        destination: new google.maps.LatLng(12.9324178,77.692894),
        travelMode: google.maps.TravelMode.DRIVING,
      }};
    return (
      <div className="App">
      <MapWithADirectionsRenderer
        travel={d1}
      />
      
         
      </div>
    );
  }
}

export default App;
