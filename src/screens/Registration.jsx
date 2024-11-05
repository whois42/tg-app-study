// import { WebAppUser } from '@twa-dev/types';
import {createUser} from "../services/user.js";
import { ProfileForm } from '../components/ProfileForm';

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
    console.log('RegistrationScreen');
    

    const handleSubmit = (userData) => {
      createUser({telegram_id:user.id, ...userData});
    }
    return <ProfileForm user={user} onSubmit={handleSubmit}/>
};