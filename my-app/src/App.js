import React from 'react'
import MapWithADirectionsRenderer from './MapWithADirectionsRenderer'

const google = window.google;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myArray: [
        {lat: -34.397, lng: 150.644},
        {lat: -24.397, lng: 140.644},
        {lat: -14.397, lng: 130.644},
      ],
      origin: {},
      destination1: {},
      destination2: {}
    };
  };

  componentDidMount() {
    const directionsService = new google.maps.DirectionsService();
    directionsService.route({
      origin: new google.maps.LatLng(12.9314705,77.6925915),
      destination: new google.maps.LatLng(12.9310583,77.6937322),
      travelMode: google.maps.TravelMode.DRIVING,
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



  render() {

    return (
      <div className="App">
        <MapWithADirectionsRenderer
        loadingElement={<div style={{height: `100%`}}/>}
        containerElement={<div style={{height: `800px`}}/>}
        mapElement={<div style={{height: `50%`}}/>}
        directions={this.state.directions}
        />

      

        


      </div>
    );
  }
}