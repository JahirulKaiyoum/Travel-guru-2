import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { icon } from "leaflet";
// import * as parkData from "./data/skateboard-parks.json";
import './GoogleMap.css'

const GoogleMap = () => {
    return (
        <Map center={[45.4, -75.7]} zoom={12}>
        <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
        </Map>
    );
};

export default GoogleMap;