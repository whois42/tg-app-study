// LocationPicker.tsx
import React, { useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

type Location = {
    lat: number;
    lng: number;
};

type LocationPickerProps = {
    onLocationSelect: (location: Location) => void;
};

const containerStyle = {
    width: '100%',
    height: '400px'
};

// const center = {
//     lat: 52.3676, // Amsterdam coordinates
//     lng: 4.9041
// };

export const LocationPicker: React.FC<LocationPickerProps> = ({ onLocationSelect }) => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'AIzaSyBgUJ3ReiZ3yaklCqAxUObuZk3MfwOThns', // Add your API key here
    });
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

    const onMapClick = useCallback((event: google.maps.MapMouseEvent) => {
        const location = {
            lat: event.latLng?.lat() || 0,
            lng: event.latLng?.lng() || 0,
        };
        setSelectedLocation(location);
        onLocationSelect(location);
    }, [onLocationSelect]);

    if (!isLoaded) return <div>Loading map...</div>;

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={10}
            onClick={onMapClick}
        >
            {selectedLocation && <Marker position={selectedLocation} />}
        </GoogleMap>
    );
};
