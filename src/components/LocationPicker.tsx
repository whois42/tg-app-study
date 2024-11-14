 // LocationPicker.tsx
import React, { useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Autocomplete } from '@react-google-maps/api';

type Location = {
    lat: number;
    lng: number;
    address: string;
};

type LocationPickerProps = {
    onLocationSelect: (location: Location) => void;
};

const containerStyle = {
    width: '100%',
    height: '400px',
};

const center = {
    lat: 52.3676, // Default center: Amsterdam
    lng: 4.9041,
};

export const LocationPicker: React.FC<LocationPickerProps> = ({ onLocationSelect }) => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY ||  'AIzaSyBgUJ3ReiZ3yaklCqAxUObuZk3MfwOThns', // Ensure your .env file has the correct key
        libraries: ['places'],
    });

    const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);

    const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
        setAutocomplete(autocompleteInstance);
    };

    const onPlaceChanged = () => {
        if (autocomplete) {
            const place = autocomplete.getPlace();
            console.log('place', place);
            
            if (place.geometry) {
                const location = {
                    lat: place.geometry.location?.lat() || 0,
                    lng: place.geometry.location?.lng() || 0,
                    address: place.formatted_address || '',
                };
                setSelectedLocation(location);
                onLocationSelect(location);
            }
        }
    };

    const onMapClick = useCallback(
        async (event: google.maps.MapMouseEvent) => {
            if (!event.latLng) return;
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();
            const geocoder = new google.maps.Geocoder();

            // Reverse geocode to get address
            const response = await geocoder.geocode({ location: { lat, lng } });
            const address = response.results[0]?.formatted_address || 'Unknown address';

            const location = { lat, lng, address };
            setSelectedLocation(location);
            onLocationSelect(location);
        },
        [onLocationSelect]
    );

    if (!isLoaded) return <div>Loading map...</div>;

    return (
        <div>
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                <input
                    type="text"
                    placeholder="Search for a location"
                    style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                />
            </Autocomplete>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onClick={onMapClick}
            >
                {selectedLocation && <Marker position={selectedLocation} />}
            </GoogleMap>
        </div>
    );
};
