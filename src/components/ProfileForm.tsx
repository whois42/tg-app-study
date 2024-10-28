import * as Form from '@radix-ui/react-form';

import { WebAppUser } from '@twa-dev/types';

type User = WebAppUser & { added_to_attachment_menu?: boolean; allows_write_to_pm?: boolean } | null
export const ProfileForm = ({user}:{user: User}) => {
    return user? (
        <div>
            <div>
            <img src={user.photo_url} alt="profile picture"/>
            <span>{user.username}</span>
            </div>
            
        <Form.Root>
            <Form.Field name="fullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control asChild>
                    <input type="text" required placeholder={`${user.first_name} ${user.last_name}`}/>
                </Form.Control>
            </Form.Field>

            <Form.Field name="company">
                <Form.Label>Company</Form.Label>
                <Form.Control asChild>
                    <input type="text" />
                </Form.Control>
            </Form.Field>

            <Form.Field name="position">
                <Form.Label>Position</Form.Label>
                <Form.Control asChild>
                    <input type="text" />
                </Form.Control>
            </Form.Field>
        </Form.Root>
        </div>
    ): null;
};