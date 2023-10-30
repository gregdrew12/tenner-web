import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Button } from "reactstrap";

import axios from "axios"

import { API_URL } from "../constants";
import Loading from "./Loading";
import './Profile.css'

const Profile = () => {
    const [userLoading, setUserLoading] = useState(true);
    const [user, setUser] = useState([]); 
    const { username } = useParams();

    const followUser = () => {
        axios.put(API_URL + 'api/users/following/' + user[0].user + '/', {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
    };

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
                    <>
                        <h1>{user[0].username}</h1>
                        <h2>{user[0].following.length}</h2>
                        <div className="button-container">
                            <Button
                                color="primary"
                                className="float-right"
                                onClick={followUser}
                                style={{ minWidth: "200px" }}
                            >
                                Follow
                            </Button>
                        </div>
                    </>
            ) : <h1>User does not exist.</h1>}
        </>
    )
}

export default Profile;