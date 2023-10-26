import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import UserList from "./UserList";
import NewUserModal from "./NewUserModal";

import axios from "axios"

import { API_URL } from "../constants";
import Loading from "./Loading";
import Spotify from "./Spotify";

const Home = () => {

  const [usersLoading, setUsersLoading] = useState(true)
  const [playbackLoading, setPlaybackLoading] = useState(true)
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
    axios.get(API_URL + 'api/users/').then(res => {
      setUsers(res.data)
      setUsersLoading(false);
    });
  };

  const getPlayback = () => {
    axios.get(API_URL + "spotify/playback", {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    }).then(res => {
      setPlayback(res.data)
      setPlaybackLoading(false);
    });
  }

  const resetState = () => {
    getUsers();
    getPlayback();
  };

  return (
    <div>
      {usersLoading || playbackLoading ? <Loading/> : (
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
      )}
    </div>
  );
}

export default Home;