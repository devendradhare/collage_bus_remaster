import React, { useRef, useEffect, useState } from "react";
import "./LiveMap.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css"; // Import Mapbox CSS
// import { useAuth0 } from "@auth0/auth0-react";
import routes from "./routes"; // Import bus route data
import JoinAsPopup from "../JoinAsPopup.jsx";

// mapbox token ID
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export default function LiveMap({ web_socket: socket }) {
  // const { loginWithRedirect, isAuthenticated } = useAuth0();
  // if (!isAuthenticated) {
  //   loginWithRedirect();
  //    return <div>Loading...</div>;
  // }

  // mapbox variabls
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(77.3988);
  const [lat] = useState(23.2559);
  const [zoom] = useState(10);

  // variabls and function for markers
  const [Marker_list, setMarker_list] = useState([]); // getting data from server
  const MarkersRef = useRef([]);

  const [JoinAs, setJoinAs] = useState("");

  // step-1 initialize map and routes only once
  useEffect(
    () => {
      // console.log("map initialization 1");
      if (map.current) return;
      // console.log("map initialization 2");
      // adding a map
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [lng, lat],
        zoom: zoom
      });
      // Loop through and add route sources and layers
      for (const routeName in routes) {
        if (routes.hasOwnProperty(routeName)) {
          const routeData = routes[routeName];
          const { coords, color } = routeData;

          map.current.on("load", () => {
            map.current.addSource(routeName, {
              type: "geojson",
              data: {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "LineString",
                  coordinates: coords
                }
              }
            });

            map.current.addLayer({
              id: routeName,
              type: "line",
              source: routeName,
              layout: {
                "line-join": "round",
                "line-cap": "round"
              },
              paint: {
                "line-color": color,
                "line-width": 3,
                "line-opacity": 0.35
              }
            });
          });
        }
      }
    },
    [lng, lat, zoom]
  );

  // when user will open map,
  // figure out the user is a driver or a student ?
  const setJoindAs = as => {
    console.log("getJoindAs runs", as);
    setJoinAs(as);
  };

  // update user location
  const updateLocation = () => {
    navigator.geolocation.watchPosition(position => {
      const { longitude, latitude } = position.coords;
      // console.log(longitude, latitude);
      socket.emit("user_coords", {
        longitude,
        latitude,
        userid: socket.id,
        joinAs: JoinAs
      });
    });
  };

  // step-2 emiting live coordinates, socket.id and join as info on every 2s
  // useEffect(
  //   () => {
  //     const interval = setInterval(() => {
  //       navigator.geolocation.watchPosition(position => {
  //         const { longitude, latitude } = position.coords;
  //         // console.log(longitude, latitude);
  //         socket.emit("user_coords", {
  //           longitude,
  //           latitude,
  //           userid: socket.id,
  //           joinAs: JoinAs
  //         });
  //       });
  //     }, 2000);
  //     return () => {
  //       clearInterval(interval);
  //     };
  //   },
  //   [socket, JoinAs]
  // );

  // step-3 getting new marker list from server
  useEffect(
    () => {
      socket.on("users_coords_list", list_data => {
        // console.log("list_data", list_data);
        if (JoinAs !== "") {
          setMarker_list(list_data);
        }
        // updateLocation();
        // document.getElementById('updateLocation').click();
      });
    },
    [socket, JoinAs]
  );

  // step-4 adding new markers and
  // removeing old markers from the map
  // every time when we get new marker list from the server
  useEffect(
    () => {
      // removeing currunt markers from the map
      MarkersRef.current.forEach(m => m.remove());
      MarkersRef.current = []; // setMarkers([]);

      Marker_list.forEach(m => {
        console.log(m.longitude, m.latitude);
        try {
          const markerElement = document.createElement("div");
          markerElement.className = m.joinAs;
          const newMarker = new mapboxgl.Marker({ element: markerElement })
            .setLngLat([m.longitude, m.latitude])
            .addTo(map.current);
          // setMarkers(prevMarkers => [...prevMarkers, newMarker]);
          MarkersRef.current = [...MarkersRef.current, newMarker];
        } catch (e) {}
      });
    },
    [Marker_list]
  );

  return (
    <div>
      <button id="updateLocation" onClick={updateLocation}>
        update location
      </button>
      {JoinAs === ""
        ? <JoinAsPopup socket={socket} setJoinAs={setJoindAs} />
        : ""}
      <div id="map">
        <div className="sidebar">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
        <div ref={mapContainer} className="map-container" />
      </div>
    </div>
  );
}
