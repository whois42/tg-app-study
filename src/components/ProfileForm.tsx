import React from 'react';
import * as Form from '@radix-ui/react-form';

export const ProfileForm: React.FC = () => {
    return (
        <Form.Root>
            <Form.Field name="fullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control asChild>
                    <input type="text" required />
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
    );
};