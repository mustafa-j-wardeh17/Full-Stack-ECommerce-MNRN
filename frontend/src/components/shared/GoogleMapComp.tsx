'use client';
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LatLngTuple } from 'leaflet';

// Fix for missing marker icons
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const GoogleMapComp = () => {
  const position: LatLngTuple = [31.771959, 35.217018];
  return (
    <div className='h-full w-full   overflow-hidden'>
      <style jsx global>{`
                .leaflet-control-zoom {
                    display: none !important; /* Option 1: Hide Zoom Controls */
                    /* z-index: 10 !important;  Option 2: Change Z-Index of Zoom Controls */
                }
            `}</style>
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "100%", width: "100%",zIndex:30 }}
        zoomControl={true}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution=''
        />
        <Marker position={position}>
          <Popup>
            ByteVault
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default GoogleMapComp;