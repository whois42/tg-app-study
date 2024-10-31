import { WebAppUser } from '@twa-dev/types';
import { Avatar, Input,} from '@telegram-apps/telegram-ui';

type User = WebAppUser & { added_to_attachment_menu?: boolean; allows_write_to_pm?: boolean } | null
export const ProfileForm = ({user}:{user: User}) => {
    console.log(user);
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
                    onChange={(e) => console.log(e.target.value)}
                />
                <Input
                    header="Last name"
                    value={user.last_name}
                    onChange={(e) => console.log(e.target.value)}
                />
                <Input
                    header="Company"
                    value={user.last_name}
                    onChange={(e) => console.log(e.target.value)}
                />
                <Input
                    header="Position"
                    value={user.last_name}
                    onChange={(e) => console.log(e.target.value)}
                />
            </div>
        </div>
    ): null;
};