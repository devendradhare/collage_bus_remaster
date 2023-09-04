import React, { useRef, useEffect, useState } from "react";
import "../css/LiveMap.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css"; // Import Mapbox CSS
import { useAuth0 } from "@auth0/auth0-react";
import routes from "./routes"; // Import bus route data
import Join_as_popup from "./Join_as_popup.jsx";

// mapbox token ID
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export default function LiveMap({ web_socket: socket }) {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  if (!isAuthenticated) {
    loginWithRedirect();
  }

  // mapbox variabls
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(77.3988);
  const [lat, setLat] = useState(23.2559);
  const [zoom, setZoom] = useState(10);

  // variabls and function for markers
  const [Marker_list, setMarker_list] = useState([]);
  const [markers, setMarkers] = useState([]);

  // joind as a student or driver
  const [JoindAs, setJoindAs] = useState("student");
  const [showJoindAsPopup, setShowJoindAsPopup] = useState(true);

  const getJoindAs = as => {
    console.log("getJoindAs runs", as);
    setJoindAs(as);
    setShowJoindAsPopup(false);
  };

  // Function to add a single marker to the map
  const addMarkers = (lng, lat, joinAs) => {
    const markerElement = document.createElement("div");
    markerElement.className = joinAs;

    const newMarker = new mapboxgl.Marker({ element: markerElement })
      .setLngLat([lng, lat])
      .addTo(map.current);

    const a = markers; // here markers is a usestate
    a.push(newMarker);
    setMarkers(a);
  };

  // Function to remove markers from the map
  const removeMarkers = () => {
    markers.forEach(m => m.remove());
    setMarkers([]);
  };

  // remove old markers and add new markers
  useEffect(
    () => {
      removeMarkers();
      Marker_list.forEach(m => {
        console.log(m.longitude, m.latitude);
        try {
          addMarkers(m.longitude, m.latitude, m.joinAs);
        } catch (e) {}
      });
    },
    [Marker_list]
  );

  // initialize map only once
  useEffect(() => {
    if (map.current) return;
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
  }, []);

  // gettin new marker list from server
  useEffect(() => {
    socket.on("users_coords_list", list_data => {
      // console.log("list_data", list_data);
      setMarker_list(list_data);
    });
  }, []);

  // emiting live coordinates, socket.id and join as info on every 2s
  useEffect(() => {
    const interval = setInterval(() => {
      navigator.geolocation.watchPosition(position => {
        const { longitude, latitude } = position.coords;
        // if (map.current) map.current.setCenter([longitude, latitude]); // Update the map's center
        socket.emit("user_coords", {
          longitude,
          latitude,
          userid: socket.id,
          joinAs: JoindAs
        });
      });
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, [JoindAs]);

  return (
    <div>
      {showJoindAsPopup &&
        <Join_as_popup socket={socket} setJoinAs={getJoindAs} />}
      <div id="map">
        <div className="sidebar">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
        <div ref={mapContainer} className="map-container" />
      </div>
    </div>
  );
}


// Function to update marker positions
// const updateMarkers = markerData => {
//   markerData.forEach(data => {
//     const marker = Marker_list.find(
//       marker => marker.getElement().innerText === data.socketID
//     );
//     if (marker) {
//       const [lng, lat] = data.coords;
//       marker.setLngLat([lng, lat]);
//     }
//   });
// };
