import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Col, Container, Row } from "reactstrap";
import UserList from "./UserList";
import NewUserModal from "./NewUserModal";

import axios from "axios"

import { API_URL } from "../constants";

const Profile = () => {

    let { user } = useParams();

    return (
        <h1>{user}</h1>
    )
}

export default Profile;