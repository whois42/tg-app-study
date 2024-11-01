// import { WebAppUser } from '@twa-dev/types';
import { createEvent } from "../services/events";
import { EventForm} from "../components/EventForm";

// type UserProfile = {
//     username: string;
//     first_name: string;
//     last_name: string;
//     company: string;
//     position: string;
// }
// type ProfileFormProps = {
//     user: WebAppUser | null;
// }

// type User = WebAppUser & { added_to_attachment_menu?: boolean; allows_write_to_pm?: boolean } | null
export const CreateEventScreen = ({user}) => {

    const handleSubmit = (eventData) => {
    console.log(user, "user data");
      createEvent(eventData);
    }
    return <EventForm onSubmit={handleSubmit}/>
};