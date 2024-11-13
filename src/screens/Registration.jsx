// import { WebAppUser } from '@twa-dev/types';
import {createUser} from "../services/user.js";
import { ProfileForm } from '../components/ProfileForm';
import { useNavigate } from "react-router-dom";

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
export const RegistrationScreen = ({user}) => {
    const navigate = useNavigate();
    const handleSubmit = (userData) => {
      createUser({telegram_id:user.id, ...userData});
      navigate("/events/discover");
    }
    return <ProfileForm user={user} onSubmit={handleSubmit}/>
};