// Import the react JS packages 
import axios from "axios";
import {useState} from "react";
import { API_URL } from "../constants";
import './Login.css';

// Define the Login function.
export const Login = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')

    // Create the submit method.
    const submit = async e => {
        e.preventDefault();
        const user = {
            email: email,
            password: password
        };
        
        try {
            // Create the POST requuest
            const {data} = await axios.post(API_URL + 'token/', user ,{headers: {
                'Content-Type': 'application/json'
            }}, {withCredentials: true});

            // Initialize the access & refresh token in localstorage.
            setError('')     
            localStorage.clear();
            localStorage.setItem('email', email);
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
            axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;
            window.location.href = '/'
        } catch (error) {
            console.log(error.response.status);
            setError('Invalid email or password.')
        }
    }
    return(
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={submit}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <h4 className="Auth-form-error">{error}</h4>
                    <div className="form-group mt-3">
                        <label>Email</label>
                        <input className="form-control mt-1" 
                            placeholder="Enter Email" 
                            name='email'  
                            type='text' value={email}
                            required 
                            onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input name='password' 
                            type="password"     
                            className="form-control mt-1"
                            placeholder="Enter password"
                            value={password}
                            required
                            onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}