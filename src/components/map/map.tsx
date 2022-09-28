
import { FC, useMemo } from 'react'
import { GoogleMap,Marker, LoadScript } from '@react-google-maps/api';
import { MAP_API_KEY } from 'src/constants/config';

const containerStyle = {
  width: '100%',
  height: '500px'
};


export const Map:FC<TObject> = ({location}) => {
  const center = useMemo(() => ({ lat: parseFloat(location?.lat), lng: parseFloat(location?.lon) }), [location]);

  return (
    <LoadScript
      googleMapsApiKey={MAP_API_KEY || ''}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  )
}
