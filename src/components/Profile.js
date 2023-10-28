import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Col, Container, Row } from "reactstrap";
import UserList from "./UserList";
import NewUserModal from "./NewUserModal";

import axios from "axios"

import { API_URL } from "../constants";

const Profile = () => {
    const [user, setUser] = useState([]); 
    const { username } = useParams();

    useEffect(() => {
        console.log(username)
        axios.get(API_URL + 'api/users/', {
            params: {
                username: username
            }
        }).then(res => setUser(res.data));
    }, []);

    return (
        <>
            {user.length === 1 ? (
                <div>
                    <h1>{user[0].username}</h1>
                    <h2></h2>
                </div>
            ) : null}
        </>
    )
}

export default Profile;