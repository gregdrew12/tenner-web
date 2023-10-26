import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import UserList from "./UserList";
import NewUserModal from "./NewUserModal";

import axios from "axios"

import { API_URL } from "../constants";
import Spotify from "./Spotify";

const Home = () => {

  const [users, setUsers] = useState([]); 
  const [playback, setPlayback] = useState({});

  useEffect(() => {
    if(localStorage.getItem('access_token') === null){                   
      window.location.href = '/login'
    }

    resetState();
    const poll = () => {
      resetState();
    };
    const pollInterval = setInterval(poll, 5000);

    return () => {
      clearInterval(pollInterval);
    };
  }, []);

  const getUsers = () => {
    axios.get(API_URL + 'api/users/').then(res => setUsers(res.data));
  };

  const getPlayback = () => {
    axios.get(API_URL + "spotify/playback", {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    }).then(res => {setPlayback(res.data)});
  }

  const resetState = () => {
    getUsers();
    getPlayback();
  };

  return (
    <Container style={{ marginTop: "20px" }}>
      <Row>
        <Col>
          <UserList
            users={users}
            playback={playback}
            resetState={resetState}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <NewUserModal create={true} resetState={resetState} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Spotify/>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;