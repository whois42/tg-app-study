import { Input, Textarea} from '@telegram-apps/telegram-ui';
import { MainButton } from '@twa-dev/sdk/react';
import { useState } from 'react';


type Event = {
    title: string;
    description?: string;
    start_time: string;
    end_time : string;
    timezone: string;
    coverImageUrl?: string;
}
type EventFormProps = {
    event?: Event | null;
    onSubmit: (event: Event) => void;
}

// type User = WebAppUser & { added_to_attachment_menu?: boolean; allows_write_to_pm?: boolean } | null
export const EventForm = ({event, onSubmit}:EventFormProps) => {
    const [title, setTitle] = useState(event?.title || "");
    const [coverImageUrl, setCoverImageUrl] = useState(event?.coverImageUrl || "");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [description, setDescription] = useState(event?.description || "");

    const handleSubmit = () => {
        console.log("submitting",{
            title,
            coverImageUrl,
            description,
            start_time: new Date(startTime).toISOString(),
            end_time: new Date(endTime).toISOString(),
            timezone: "Europe/Amsterdam"
        } );
        onSubmit({
            title,
            coverImageUrl,
            description,
            start_time: new Date(startTime).toISOString(),
            end_time: new Date(endTime).toISOString(),
            timezone: "Europe/Amsterdam"
        })
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    const handleCoverImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCoverImageUrl(e.target.value);
    }

    const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartTime(e.target.value);
    }

    const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndTime(e.target.value);
    }

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    }


    return (
        <div>
            <Input
                header="Title"
                value={title}
                onChange={handleTitleChange}
            />
            <Textarea
                header="Description"
                value={description}
                onChange={handleDescriptionChange}
            />
            <Input
                header="Cover Image URL"
                value={coverImageUrl}
                onChange={handleCoverImageUrlChange}
            />
            <Input
                header="Start Time"
                value={startTime}
                type='datetime-local'
                onChange={handleStartTimeChange}
            />
            <Input
                header="End Time"
                value={endTime}
                type='datetime-local'
                onChange={handleEndTimeChange}
            />
            <MainButton
                text="Submit"
                onClick={handleSubmit}
            />
        </div>
    )
};