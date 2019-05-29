import React from 'react'
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker, Polyline, DirectionsService } from "react-google-maps";
import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode";
import apiConfig from '../apiKeys'


Geocode.setApiKey(apiConfig.googleMap);
// import Search from './Search'

Geocode.enableDebug();
class Map extends React.Component{
constructor( props ){
  super( props );
  this.state = {
   address: '',
   city: '',
   area: '',
   state: '',
   destCity: '',
   destAddress: '',
   mapPosition: {
    lat: this.props.center.lat,
    lng: this.props.center.lng
   },
   markerPosition: {
    lat: this.props.center.lat,
    lng: this.props.center.lng
    },
    destinationMarker: {
        lat: 36.6448,
        lng: -93.2244
    }
  }
 }
/**
  * Get the current address from the default map position and set those values in the state
  */
 componentDidMount() {
  Geocode.fromLatLng( this.state.mapPosition.lat , this.state.mapPosition.lng )
  .then(response => {
    const address = response.results[0].formatted_address,
      addressArray =  response.results[0].address_components,
     city = this.getCity( addressArray ),
     area = this.getArea( addressArray ),
     state = this.getState( addressArray );
  
    console.log( 'city', city, area, state );
  
    this.setState( {
     address: ( address ) ? address : '',
     area: ( area ) ? area : '',
     city: ( city ) ? city : '',
     state: ( state ) ? state : '',
    } )
   },
   error => {
    console.error(error);
   }
  );
 };
/**
  * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
  *
  * @param nextProps
  * @param nextState
  * @return {boolean}
  */
 shouldComponentUpdate( nextProps, nextState ){
  if (
   this.state.markerPosition.lat !== this.props.center.lat ||
   this.state.address !== nextState.address ||
   this.state.city !== nextState.city ||
   this.state.area !== nextState.area ||
   this.state.state !== nextState.state
  ) {
   return true
  } else if ( this.props.center.lat === nextProps.center.lat ){
   return false
  }
 }
/**
  * Get the city and set the city input value to the one selected
  *
  * @param addressArray
  * @return {string}
  */
 getCity = ( addressArray ) => {
  let city = '';
  for( let i = 0; i < addressArray.length; i++ ) {
   if ( addressArray[ i ].types[0] && 'administrative_area_level_2' === addressArray[ i ].types[0] ) {
    city = addressArray[ i ].long_name;
    return city;
   }
  }
 };
/**
  * Get the area and set the area input value to the one selected
  *
  * @param addressArray
  * @return {string}
  */
 getArea = ( addressArray ) => {
  let area = '';
  for( let i = 0; i < addressArray.length; i++ ) {
   if ( addressArray[ i ].types[0]  ) {
    for ( let j = 0; j < addressArray[ i ].types.length; j++ ) {
     if ( 'sublocality_level_1' === addressArray[ i ].types[j] || 'locality' === addressArray[ i ].types[j] ) {
      area = addressArray[ i ].long_name;
      return area;
     }
    }
   }
  }
 };
/**
  * Get the address and set the address input value to the one selected
  *
  * @param addressArray
  * @return {string}
  */
 getState = ( addressArray ) => {
  let state = '';
  for( let i = 0; i < addressArray.length; i++ ) {
   for( let i = 0; i < addressArray.length; i++ ) {
    if ( addressArray[ i ].types[0] && 'administrative_area_level_1' === addressArray[ i ].types[0] ) {
     state = addressArray[ i ].long_name;
     return state;
    }
   }
  }
 };
/**
  * And function for city,state and address input
  * @param event
  */
 onChange = ( event ) => {
  this.setState({ [event.target.name]: event.target.value });
 };
/**
  * This Event triggers when the marker window is closed
  *
  * @param event
  */
 onInfoWindowClose = ( event ) => {
};
/**
  * When the user types an address in the search box
  * @param place
  */
 onStartSelected = ( place ) => {
const address = place.formatted_address,
   addressArray =  place.address_components,
   city = this.getCity( addressArray ),
   area = this.getArea( addressArray ),
   state = this.getState( addressArray ),
   latValue = place.geometry.location.lat(),
   lngValue = place.geometry.location.lng();
// Set these values in the state.
  this.setState({
   address: ( address ) ? address : '',
   area: ( area ) ? area : '',
   city: ( city ) ? city : '',
   state: ( state ) ? state : '',
   markerPosition: {
    lat: latValue,
    lng: lngValue
   },
   mapPosition: {
    lat: latValue,
    lng: lngValue
   },
  })
 };

 onDestinationSelected = ( place ) => {
  const address = place.formatted_address,
    addressArray =  place.address_components,
    city = this.getCity( addressArray ),
    latValue = place.geometry.location.lat(),
    lngValue = place.geometry.location.lng();
 // Set these values in the state.
   this.setState({
    destCity: ( city ) ? city : '',
    destAddress: ( address ) ? address : '',
    destinationMarker: {
     lat: latValue,
     lng: lngValue
    }
   })
   this.calculateAndDisplayRoute();
  };

  calculateAndDisplayRoute = () => {
  Geocode.fromLatLng( this.state.destinationMarker.lat , this.state.destinationMarker.lng )
  .then(response => {
    const addressArray =  response.results[0].address_components,
     city = this.getCity( addressArray );
    this.setState( {
     destCity: ( city ) ? city : '',
    } )
   },
   error => {console.error(error);}
  );
  const directionsService = new window.google.maps.DirectionsService()
    directionsService.route({   
      origin: {lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng},
      destination: {lat: this.state.destinationMarker.lat, lng: this.state.destinationMarker.lng},   
      travelMode: 'DRIVING',   
     },  
       (result, status) => {   
         if (status === 'OK') {   
           console.log(result)
           const overViewCoords = result.routes[0].overview_path;   
           const distanceMatrixDuration = result.routes[0].legs[0].duration.text
    
             this.setState({   
               totalTime: distanceMatrixDuration,
               lineCoordinates: overViewCoords,
             });
         } else {
            console.warn(`error fetching directions ${status}`);
         }
       });
  }

  sendTextMessage = () => {
    console.log('fired')
    const messageObj = {
      description: this.state.destAddress
    }
    fetch(`http://localhost:3001/messages`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(messageObj)
    })
    .catch(error => console.error(error))
  }
 
/**
  * When the marker is dragged you get the lat and long using the functions available from event object.
  * Use geocode to get the address, city, area and state from the lat and lng positions.
  * And then set those values in the state.
  *
  * @param event
  */
 onMarkerDragEnd = ( event ) => {
  console.log( 'event', event );
  let newLat = event.latLng.lat(),
   newLng = event.latLng.lng();
Geocode.fromLatLng( newLat , newLng ).then(
   response => {
    const address = response.results[0].formatted_address,
     addressArray =  response.results[0].address_components,
     city = this.getCity( addressArray ),
     area = this.getArea( addressArray ),
     state = this.getState( addressArray );
this.setState( {
     address: ( address ) ? address : '',
     area: ( area ) ? area : '',
     city: ( city ) ? city : '',
     state: ( state ) ? state : ''
    } )
   },
   error => {
    console.error(error);
   }
  );
 };

render(){
const AsyncMap = withScriptjs(
   withGoogleMap(
    props => (
     <GoogleMap google={this.props.google}
      defaultZoom={this.props.zoom}
      defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
     >
      {/* For Auto complete Search Box */}
      <Autocomplete
       style={{
        width: '100%',
        height: '40px',
        paddingLeft: '16px',
        marginTop: '50px',
        marginBottom: '25px'
       }}
       placeholder="Enter starting location"
       onPlaceSelected={ this.onStartSelected }
       types={[]}
      />

    <Autocomplete
       style={{
        width: '100%',
        height: '40px',
        paddingLeft: '16px',
        marginTop: '1px',
        marginBottom: '100px'
       }}
       placeholder="Enter destination location"
       onPlaceSelected={ this.onDestinationSelected }
       types={[]}
      />


{/*Marker*/}
      <Marker google={this.props.google}
       name={'Dolores park'}
          draggable={true}
          onDragEnd={ this.onMarkerDragEnd }
             position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
      />
      <Marker />
    <Marker google={this.props.google}
       name={'Dolores park'}
          draggable={true}
          onDragEnd={ this.onMarkerDragEnd }
             position={{ lat: this.state.destinationMarker.lat, lng: this.state.destinationMarker.lng }}
      />
      <Marker />
{/* InfoWindow on top of marker */}
      <InfoWindow
       onClose={this.onInfoWindowClose}
       position={{ lat: ( this.state.markerPosition.lat + 0.0018 ), lng: this.state.markerPosition.lng }}
      >
       <div>
        <span style={{ padding: 0, margin: 0 }}>{ this.state.address }</span>
       </div>
      </InfoWindow>
      {/* <InfoWindow
       onClose={this.onInfoWindowClose}
       position={{ lat: ( this.state.destinationMarker.lat + 0.0018 ), lng: this.state.destinationMarker.lng }}
      >
       <div>
        <span style={{ padding: 0, margin: 0 }}>{ this.state.address }</span>
       </div>
      </InfoWindow> */}
 <Polyline
  path={this.state.lineCoordinates}
  geodesic={false}
  options={{
    strokeColor: '#38B44F',
    strokeOpacity: 1,
    strokeWeight: 7,
  }}
/>
</GoogleMap>
)
   )
  );
let map;
  if( this.props.center.lat !== undefined ) {
   map = <div>
     <div>
     <div className="form-group">
       <label htmlFor="">Trip Time: </label>
       <input type="text" name="city" className="form-control" onChange={ this.onChange } readOnly="readOnly" value={ this.state.totalTime }/>
      </div>
      <div className="form-group">
       <label htmlFor="">Start Location</label>
       <input type="text" name="city" className="form-control" onChange={ this.onChange } readOnly="readOnly" value={ this.state.address }/>
      </div>
      <div className="form-group">
       <label htmlFor="">End Location</label>
       <input type="text" name="city" className="form-control" onChange={ this.onChange } readOnly="readOnly" value={ this.state.destAddress }/>
      </div>
      <button onClick={this.sendTextMessage}>Send Text Message</button>
     </div>
     <AsyncMap
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiConfig.googleMap}&libraries=places`}
      loadingElement={
       <div style={{ height: '100%' }} />
      }
      containerElement={
       <div style={{ height: this.props.height }} />
      }
      mapElement={
       <div style={{ height: '575px' }} />
      }
     />

    </div>
} else {
   map = <div style={{height: this.props.height}} />
  }
  return( map )
 }
}
export default Map