// LocationPicker.tsx
import React, { useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Autocomplete } from '@react-google-maps/api';

type Location = {
    lat: number;
    lng: number;
    country: string;
    city: string;
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

const LocationPicker: React.FC<LocationPickerProps> = ({ onLocationSelect }) => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '', // Ensure your .env file has the correct key
        libraries: ['places'],
    });

    const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);

    const extractAddressComponents = (components: google.maps.GeocoderAddressComponent[]) => {
        let country = '';
        let city = '';
        let address = '';

        components.forEach((component) => {
            if (component.types.includes('country')) {
                country = component.long_name;
            } else if (component.types.includes('locality') || component.types.includes('administrative_area_level_1')) {
                city = component.long_name;
            } else if (component.types.includes('route') || component.types.includes('street_address')) {
                address += component.long_name + ' ';
            } else if (component.types.includes('street_number')) {
                address = component.long_name + ' ' + address;
            }
        });

        return { country, city, address: address.trim() };
    };

    const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
        setAutocomplete(autocompleteInstance);
    };

    const onPlaceChanged = () => {
        if (autocomplete) {
            const place = autocomplete.getPlace();
            if (place.geometry && place.address_components) {
                const { lat, lng } = place.geometry.location!;
                const { country, city, address } = extractAddressComponents(place.address_components);

                const location = {
                    lat: lat(),
                    lng: lng(),
                    country,
                    city,
                    address,
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

            const response = await geocoder.geocode({ location: { lat, lng } });
            const result = response.results[0];
            if (result) {
                const { country, city, address } = extractAddressComponents(result.address_components);

                const location = { lat, lng, country, city, address };
                setSelectedLocation(location);
                onLocationSelect(location);
            }
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

export default LocationPicker;
