import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Button } from "reactstrap";

import axios from "axios"

import { API_URL } from "../constants";
import Loading from "./Loading";
import './Profile.css'

const Profile = () => {
    const [userLoading, setUserLoading] = useState(true);
    const [followersLoading, setFollowersLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [followers, setFollowers] = useState([]);
    const { username } = useParams();

    const followUser = () => {
        axios.put(`${API_URL}users/${username}/follow/`, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
    };

    useEffect(() => {
        axios.get(`${API_URL}users/${username}/`, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        }).then(res => {
            setUser(res.data);
            setUserLoading(false);
        });

        axios.get(`${API_URL}users/${username}/followers/`, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        }).then(res => {
            setFollowers(res.data)
            setFollowersLoading(false);
        })
    }, []);

    return (
        <>
            {userLoading || followersLoading ? <Loading/> :
                user.length !== null ? (
                    <>
                        <h1>{user.username}</h1>
                        <h2>Followers: {followers.length} Following: {user.following.length}</h2>
                        {user.id.toString() !== localStorage.getItem('id') ? (
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
                        ) : null}
                    </>
            ) : <h1>User does not exist.</h1>}
        </>
    )
}

export default Profile;