import React, { useState } from 'react';
import { Label, Input, TextArea, Select, SelectItem } from '@radix-ui/react-form';

const EventForm: React.FC = () => {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [eventDuration, setEventDuration] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
    };

    return (
        <div>
            <h2>Create a new Event</h2>
            <p>Fill out the form below to create a new event.</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <Label htmlFor="eventImage">Event Image</Label>
                    <Input type="file" id="eventImage" name="eventImage" />
                </div>
                <div>
                    <Label htmlFor="eventName">Event Name</Label>
                    <Input type="text" id="eventName" value={eventName} onChange={(e) => setEventName(e.target.value)} />
                </div>
                <div>
                    <Label htmlFor="eventDate">Event Date</Label>
                    <Input type="date" id="eventDate" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
                </div>
                <div>
                    <Label htmlFor="eventTime">Event Time</Label>
                    <Input type="time" id="eventTime" value={eventTime} onChange={(e) => setEventTime(e.target.value)} />
                </div>
                <div>
                    <Label htmlFor="eventDuration">Event Duration</Label>
                    <Input type="text" id="eventDuration" value={eventDuration} onChange={(e) => setEventDuration(e.target.value)} />
                </div>
                <div>
                    <Label htmlFor="description">Description</Label>
                    <TextArea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div>
                    <Label htmlFor="location">Location</Label>
                    <Input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>
                <button type="submit">Create Event</button>
            </form>
        </div>
    );
};

export default EventForm;
