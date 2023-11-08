// Import the react JS packages 
import styles from './Login.module.css';
import axios from "axios";
import {useState} from "react";
import { API_URL } from "../constants";
import { Title, TextInput, PasswordInput, Button, Group, Box, rem } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAt, IconLock } from '@tabler/icons-react';

// Define the Login function.
function Login() {
    
    const [error, setError] = useState('')
    const emailIcon = <IconAt style={{ width: rem(16), height: rem(16) }} />;
    const passwordIcon = <IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />;

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: (value) => (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? null : 'Not a valid email.'),
        },
    });

    // Create the submit method.
    const submit = async () => {
        const user = {
            email: form.values['email'],
            password: form.values['password']
        };
        
        try {
            // Create the POST requuest
            const {data} = await axios.post(`${API_URL}token/`, user ,{headers: {
                'Content-Type': 'application/json'
            }}, {withCredentials: true});
            setError('')

            // Initialize the access & refresh token in localstorage.
            localStorage.clear();
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
            const response = await axios.get(`${API_URL}users/${form.values['email']}/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + data.access
                }
            });
            localStorage.setItem('id', response.data.id);     
            
            window.location.href = '/'
        } catch (error) {
            console.log(error.response.status);
            setError('Invalid email or password.')
        }
    }
    return(
        <Box maw={340} mx='auto' className={styles.container}>
            <form className={styles.form} onSubmit={form.onSubmit(submit)}>
                <Title order={1} className={styles.title}>TENNER</Title>
                <Title order={4} className={styles.error}>{error}</Title>
                <TextInput
                    size='lg'
                    variant='unstyled'
                    leftSection={emailIcon}
                    placeholder='Email'
                    inputWrapperOrder={['error', 'input']}
                    {...form.getInputProps('email')}
                />
                <PasswordInput
                    size='lg'
                    variant='unstyled'
                    leftSection={passwordIcon}
                    placeholder='Password'
                    inputWrapperOrder={['error', 'input']}
                    {...form.getInputProps('password')}
                />
                <Group justify="center" mt='lg'>
                    <Button type='submit' variant='outline' color='yellow.4'>Log In</Button>
                </Group>
            </form>
        </Box>
    )
}

export default Login;