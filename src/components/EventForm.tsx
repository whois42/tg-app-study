// EventForm.tsx
import React, { useState } from 'react';
import { Input, Textarea } from '@telegram-apps/telegram-ui';
import { MainButton } from '@twa-dev/sdk/react';
import LocationPicker from './LocationPicker';

type Event = {
    title: string;
    description?: string;
    start_time: string;
    end_time: string;
    timezone: string;
    coverImageUrl?: string;
    latitude?: number;
    longitude?: number;
    country?: string;
    city?: string;
    address?: string;
};

type EventFormProps = {
    event?: Event | null;
    onSubmit: (event: Event) => void;
};

export const EventForm = ({ event, onSubmit }: EventFormProps) => {
    const [title, setTitle] = useState(event?.title || '');
    const [coverImageUrl, setCoverImageUrl] = useState(event?.coverImageUrl || '');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [description, setDescription] = useState(event?.description || '');
    const [location, setLocation] = useState<{
        lat: number;
        lng: number;
        country: string;
        city: string;
        address: string;
    } | null>(null);

    const handleLocationSelect = (location: {
        lat: number;
        lng: number;
        country: string;
        city: string;
        address: string;
    }) => {
        console.log('location', location);
        
        setLocation(location);
    };

    const handleSubmit = () => {
        onSubmit({
            title,
            coverImageUrl,
            description,
            start_time: new Date(startTime).toISOString(),
            end_time: new Date(endTime).toISOString(),
            timezone: 'Europe/Amsterdam',
            latitude: location?.lat,
            longitude: location?.lng,
            country: location?.country,
            city: location?.city,
            address: location?.address,
        });
    };

    return (
        <div>
            <Input header="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Textarea header="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <Input header="Cover Image URL" value={coverImageUrl} onChange={(e) => setCoverImageUrl(e.target.value)} />
            <Input header="Start Time" value={startTime} type="datetime-local" onChange={(e) => setStartTime(e.target.value)} />
            <Input header="End Time" value={endTime} type="datetime-local" onChange={(e) => setEndTime(e.target.value)} />

            <h4>Select Location</h4>
            <LocationPicker onLocationSelect={handleLocationSelect} />
            {location && (
                <div>
                    <p><strong>Country:</strong> {location.country}</p>
                    <p><strong>City:</strong> {location.city}</p>
                    <p><strong>Address:</strong> {location.address}</p>
                </div>
            )}

            <MainButton text="Submit" onClick={handleSubmit} />
        </div>
    );
};
