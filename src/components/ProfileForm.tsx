import React from 'react';
import * as Form from '@radix-ui/react-form';

export const ProfileForm: React.FC = ({user}) => {
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

            <Form.Submit asChild>
                <button type="submit">Submit</button>
            </Form.Submit>
        </Form.Root>
        </div>
    ): null;
};