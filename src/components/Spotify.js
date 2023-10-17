import React, { Fragment, useState } from "react";
import { Button } from "reactstrap";
import axios from "axios";
import { API_URL } from "../constants";

function Spotify() {

  const [song, setSong] = useState({})

  const authenticateSpotify = () => {
    axios.get(API_URL + "spotify/is-authenticated", {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(res => {
      if (!res.data['status']) {
        axios.get(API_URL + "spotify/get-auth-url", {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
        .then(res => {
          window.location.replace(res.data['url']);
        });
      }
    });
  };

  const getCurrentSong = () => {
    axios.post(API_URL + "spotify/playback", {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
  }

  return (
    <Fragment>
      <br/>
      <Button
        color="primary"
        className="float-right"
        onClick={authenticateSpotify}
        style={{ minWidth: "200px" }}
      >
        Link Spotify Account
      </Button>
      {localStorage.getItem('spotify_token')}
      <br/>
      <Button
        color="green"
        className="float-right"
        onClick={getCurrentSong}
        style={{ minWidth: "200px" }}
      >
        Current Song
      </Button>
      <h1>
        {Object.keys(song).length > 0 ? song['title'] : null}
      </h1>
    </Fragment>
  );
}

export default Spotify;