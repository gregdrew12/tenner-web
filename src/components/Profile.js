import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import axios from "axios"

import { API_URL } from "../constants";
import Loading from "./Loading";

const Profile = () => {
    const [userLoading, setUserLoading] = useState(true);
    const [user, setUser] = useState([]); 
    const { username } = useParams();

    useEffect(() => {
        axios.get(API_URL + 'api/users/', {
            params: {
                username: username
            }
        }).then(res => {
            setUser(res.data);
            setUserLoading(false);
        });
    }, []);

    return (
        <>
            {userLoading ? <Loading/> :
                user.length === 1 ? (
                    <div>
                        <h1>{user[0].username}</h1>
                        <h2></h2>
                    </div>
            ) : <h1>User does not exist.</h1>}
        </>
    )
}

export default Profile;