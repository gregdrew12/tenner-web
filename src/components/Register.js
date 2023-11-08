import axios from "axios";
import {useState} from "react";
import { API_URL } from "../constants";
import styles from './Login.module.css';
import { Title, Input, TextInput, PasswordInput, Button, Group, Box, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { IconAt, IconLock, IconUserCircle } from '@tabler/icons-react';
import CircularBars from './CircularBars.js';

function Register() {
    
    const [visible, { toggle }] = useDisclosure(false);
    const [error, setError] = useState('')
    const emailIcon = <IconAt style={{ width: rem(16), height: rem(16) }} />;
    const usernameIcon = <IconUserCircle style={{ width: rem(16), height: rem(16) }} />;
    const passwordIcon = <IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />;

    const form = useForm({
        initialValues: {
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
        },
        validate: {
            email: (value) => (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? null : 'Not a valid email.'),
            username: (value) => (/^[\w](?!.*?\.{2})[\w.]{1,28}[\w]$/i.test(value) ? null : 'Not a valid username.'),
            password: (value) => (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/i.test(value) ? null : 'Password doesn\'t meet given requirements.'),
            confirmPassword: (value, values) => (value !== values.password ? 'Passwords don\'t match.' : null),
        }
    });

    const createUser = async () => {
        const user = {
            email: form.values['email'],
            username: form.values['username'],
            password: form.values['password'],
            confirmPassword: form.values['confirmPassword']
        }; 
        
        try {
            const res = await axios.post(API_URL + 'users/', user)
            if(res.status === 201) {
                window.location.href = '/login';
            }      
        } catch(error) {
            console.log(error.response.data)
            if ('email' in error.response.data) {
                setError('There is already an account associated with this email.')
            }
            else if ('username' in error.response.data) {
                setError('This username is already taken.')
            }
            else {
                setError('There was an error creating your account. Please try again.')
            }
        }              
    };

    return(
        <Box maw={340} mx='auto' className={styles.container}>
            <CircularBars numberOfBars={100} radius={315}/>
            <form className={styles.form} onSubmit={form.onSubmit(createUser)}>
                <Title order={1} className={styles.title}>REGISTER</Title>
                <Title order={4} className={styles.error}>{error}</Title>
                <TextInput
                    size='lg'
                    variant='unstyled'
                    leftSection={emailIcon}
                    placeholder='Email'
                    inputWrapperOrder={['error', 'input']}
                    {...form.getInputProps('email')}
                />
                <TextInput
                    size='lg'
                    variant='unstyled'
                    leftSection={usernameIcon}
                    placeholder='Username'
                    inputWrapperOrder={['error', 'input']}
                    {...form.getInputProps('username')}
                />
                <PasswordInput
                    size='lg'
                    variant='unstyled'
                    leftSection={passwordIcon}
                    placeholder='Password'
                    visible={visible}
                    onVisibilityChange={toggle}
                    inputWrapperOrder={['error', 'input']}
                    {...form.getInputProps('password')}
                />
                <Input.Description>
                    Minimum length of 8 characters.
                    <br/>
                    Must contain at least one upper case letter, number, and special character.
                </Input.Description>
                <PasswordInput
                    size='lg'
                    variant='unstyled'
                    leftSection={passwordIcon}
                    placeholder='Confirm Password'
                    visible={visible}
                    onVisibilityChange={toggle}
                    //inputWrapperOrder={['error', 'input']}
                    {...form.getInputProps('confirmPassword')}
                />
                <Group justify="center" mt='lg'>
                    <Button type='submit' variant='outline' color='yellow.4'>Create Account</Button>
                </Group>
            </form>
        </Box>
    )
}

export default Register;