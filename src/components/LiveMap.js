import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css"; // Import Mapbox CSS

// mapbox token ID
mapboxgl.accessToken =
  "pk.eyJ1IjoiY29kZW5kcmFtIiwiYSI6ImNsa2doOTdsdDAwNzQzZ3J6NW1ya3FhOHgifQ.SHXHy-5AQEdp3i5P08iBuw";

export default function LiveMap() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(77.3988);
  const [lat, setLat] = useState(23.2559);
  const [zoom, setZoom] = useState(7);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      navigator.geolocation.watchPosition(position => {
        const { longitude, latitude } = position.coords;
        setLng(longitude);
        setLat(latitude);
        setUserLocation({ lng: longitude, lat: latitude });
        console.log("first useEffect", longitude, latitude);
        // Update the map's center
        // if (map.current) {
        //   map.current.setCenter([longitude, latitude]);
        // }
      });
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map(
      {
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [lng, lat],
        zoom: zoom
      },
      [lng, lat]
    );

    // go to your location button
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
      })
    );
  }, []);

  // useEffect(() => {
  //   if (!map.current) return; // wait for map to initialize
  //   map.current.on("move", () => {
  //   setLng(map.current.getCenter().lng.toFixed(4));
  //   setLat(map.current.getCenter().lat.toFixed(4));
  //   setZoom(map.current.getZoom().toFixed(2));
  // });

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

// const dotenv = require('dotenv').config();
// ✅MapBox api key
// ✅mapboxgl.accessToken =
// ✅ 'pk.eyJ1IjoiY29kZW5kcmFtIiwiYSI6ImNsa2doOTdsdDAwNzQzZ3J6NW1ya3FhOHgifQ.SHXHy-5AQEdp3i5P08iBuw';

// ✅console.log("hello world");
// // console.log(process.env);
// var socket = io();                                        // setup my socket client
// let user_count = 0;                                       // connected users
// let position = [78.8700483, 21.9521117];                  // default coordinates (chhindwara)

// let userid = Math.random().toString(36).substring(2, 7);  // program to generate random strings
// let cookie_data = document.cookie.split("dvn")[1].split("split");

// ✅var map = new mapboxgl.Map({                              // setting up MapBoxe
// ✅  container: 'map', style: 'mapbox://styles/mapbox/streets-v11',
// ✅  center: [77.39889912939028, 23.25604944351329],         // it will sets the camera of the map above bhopal
// ✅  zoom: 11, // minZoom: 10
// ✅});

// var geolocate = new mapboxgl.GeolocateControl({           // getting currunt coordinates of the user
//   positionOptions: { enableHighAccuracy: true },
//   trackUserLocation: false,
//   showUserHeading: true
// });

// map.addControl(geolocate);              // the button on the map to showing our current position
// map.on('load', function (e) {
//   setInterval(() => { geolocate.trigger(); }, 900);
// });

// geolocate.on('geolocate', (e) => {
//   map.flyTo({ zoom: map.getZoom() });
//   position = [e.coords.longitude, e.coords.latitude];
// });

// window.onload = function () {
//   setInterval(() => {                                 // sending users location coordinates
//     socket.emit('my_coords', {                        // to the server in evry 3 sec.
//       "coord": position, "userid": userid,
//       "user_name": cookie_data.at(0),
//       "i_am_a": cookie_data.at(1)
//     });
//   }, 2000);

//   var markers = [];                                   // adding marker of the users location
//   socket.on('mark_it_on_map', function (obj) {        // receiving marker data form the server
//     markers.forEach(element => { element.remove(); });// removeing old and offline users marker
//     let geojson = {                                   // telling to the map, where to add markers
//       'type': 'FeatureCollection',
//       'features': [],
//     };
//     obj.forEach(el => {                               // process of adding marker
//       geojson.features.push({
//         'userid': el.userid, 'i_am_a': el.i_am_a,
//         'type': 'Feature',
//         'geometry': {
//           'type': 'Point',
//           'coordinates': el.coord
//         },
//       });
//     });

//     for (const feature of geojson.features) {         // adding each users markers on the map
//       const el = document.createElement('div');
//       el.className = feature.i_am_a;                  // make a marker for each feature and
//       var temp = new mapboxgl.Marker(el)              // add it to the map
//         .setLngLat(feature.geometry.coordinates).addTo(map);
//       markers.push(temp);
//     }
//   });

//   socket.on('participants', function (count) {        // updating conncted users count
//     user_count = count;
//     document.getElementById("participants").innerHTML = " " + count;
//   });
// }
