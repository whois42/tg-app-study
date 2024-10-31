import { WebAppUser } from '@twa-dev/types';
import { Avatar, Input,} from '@telegram-apps/telegram-ui';
import { MainButton } from '@twa-dev/sdk/react';
import { useState } from 'react';

type UserProfile = {
    username: string;
    first_name: string;
    last_name: string;
    company: string;
    position: string;
}
type ProfileFormProps = {
    user: WebAppUser | null;
    onSubmit: (user: UserProfile) => void;
}

// type User = WebAppUser & { added_to_attachment_menu?: boolean; allows_write_to_pm?: boolean } | null
export const ProfileForm = ({user, onSubmit}:ProfileFormProps) => {
    const [first_name, setFirstName] = useState(user?.first_name || "");
    const [last_name, setLastName] = useState(user?.last_name || "");
    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
    }
    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
    }
    const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCompany(e.target.value);
    }
    const handlePositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPosition(e.target.value);
    }

    const handleSubmit = () => {
        onSubmit({
            username: user?.username || "",
            first_name,
            last_name,
            company,
            position,
        });
    }
    return user? (
        <div>
            <Avatar
                size={96}
                src={user.photo_url}
            />

            <p>{`@${user.username}`}</p>
            <div>
                <Input
                    header="First name"
                    value={user.first_name}
                    onChange={handleFirstNameChange}
                />
                <Input
                    header="Last name"
                    value={user.last_name}
                    onChange={handleLastNameChange}
                />
                <Input
                    header="Company"
                    value={user.last_name}
                    onChange={handleCompanyChange}
                />
                <Input
                    header="Position"
                    value={user.last_name}
                    onChange={handlePositionChange}
                />
            </div>
                    <MainButton
          text="Submit"
          onClick={handleSubmit}
        />
            
        </div>
    ): null;
};