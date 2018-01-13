/*global google*/

import React from 'react';
import _ from "lodash";
import axios from 'axios';
import fetch from "isomorphic-fetch";
import { compose, withProps, withHandlers, lifecycle } from "recompose";
import { SearchBox } from "react-google-maps/lib/components/places/SearchBox";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";

const MapWithAMarkerClusterer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCuJekd82uLE4ucliTj_RjpRFv7NMbKKXg&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        bounds: null,
        center: {
          lat: 41.9, lng: -87.624
        },
        markers: [],
        onMapMounted: ref => {
          refs.map = ref;
          console.log(refs.map);
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          })
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();
          const gAddress = places[0].formatted_address;
          let glat = "";
          let glong = "";

          // Logging the Lat and Lng here from what is searched
          console.log(bounds);

          //convert gaddress to lat long
          axios
          .get("https://maps.google.com/maps/api/geocode/json?key=AIzaSyDu3uARDgsUWZTKOQ_CItX7_grlIU11Ieo&address=" + gAddress)
          .then(response => {
              const coords = response.data.results[0].geometry.location;
              glong = coords.lng;
              glat = coords.lat;

              let url = "/parkingspot/findnear/?latitude=" + glat + "&longitude=" + glong + "&distance=50";
              console.log("url");
              console.log(url);
              axios.get("/parkingspot/findnear/?latitude=" + glat + "&longitude=" + glong + "&distance=100")
              .then(data => {

                console.log("data");
                console.log(data);
                const markerArray = [];
                this.setState({ markers: markerArray });
                console.log("markers: markerarray");
                console.log(markerArray);
                console.log("State");
                console.log(this.state);
                for (let i = 0; i < data.data.length; i++) {
                  console.log(data.data[i]);
                  markerArray.push(data.data[i]);
                }
                console.log(this.state);
              });
          });
          

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

          this.setState({
            center: nextCenter,
            markers: nextMarkers,
          });
          refs.map.fitBounds(bounds);
        },
      })
    },
  }),
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      const clickedMarkers = markerClusterer.getMarkers()
      console.log(`Current clicked markers length: ${clickedMarkers.length}`)
      console.log(clickedMarkers)
    },
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={5}
    defaultCenter={{ lat: 33.4642302, lng: -112.0013202 }}
    ref={props.onMapMounted}
  >
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
      <SearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        controlPosition={google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={props.onPlacesChanged}
      >
        <input
          type="text"
          placeholder="Where are you looking to park?"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `800px`,
            height: `30px`,
            margin: '10px auto 0 auto',
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
          }}
        />
      </SearchBox>
      {props.markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker.position}
        />
      ))}
    </MarkerClusterer>
  </GoogleMap>
  );

export default class GMap extends React.Component {
  componentWillMount() {
    this.setState({ markers: [] })
  }

  componentDidMount() {

    let lat;
    let lng;
    let distance;

    let FindNear = (req, res) => {

      // /parkingspot/findnear/?latitude=33.3742668&longitude=-111.9717266&distance=50
      axios.get("parkingspot/findnear/?latitude=" + lat + "&longitude=" + lng + "&distance=" + distance)
        .then(res => res.json())
        .then(data => {
          const markerArray = [];
          this.setState({ markers: markerArray });
          console.log(markerArray)
          console.log("state");
          console.log(this.state.markers);
          for (let i = 0; i < markerArray.length; i++) {
            markerArray.push(data.results[i])
          }
        })
        .catch(err => res.json(err));
    }
  }

  render() {
    return (
      <div>
        <MapWithAMarkerClusterer markers={this.state.markers} />
        {this.state.markers.map(marker =>
              <div className="card parking-cards col-sm-12 col-md-3">
                  <div className="parking-card-info">
                      <p> whatsup </p>
                  </div>
              </div>
      )}
    </div>
    )
  }
}