import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Define ícone padrão dos marcadores
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Componente para exibir mapa interativo
const MapDisplay = ({ lat, lon, city }) => {
  const mapRef = useRef();

  useEffect(() => {
    if (mapRef.current) {
      // Atualiza o centro do mapa para as novas coordenadas
      mapRef.current.setView([lat, lon], 13);
    }
  }, [lat, lon]);

  return (
    <MapContainer 
      center={[lat, lon]} 
      zoom={13} 
      style={{ height: '400px', width: '100%' }} 
      whenCreated={mapInstance => { mapRef.current = mapInstance; }} // Armazena a instância do mapa
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[lat, lon]}>
        <Popup>
          {city}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapDisplay;
