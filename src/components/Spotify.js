import React, { Fragment, useState } from "react";
import { Button } from "reactstrap";
import axios from "axios";
import { API_URL } from "../constants";

function Spotify() {

  const [playback, setPlayback] = useState({})

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

  return (
    <Fragment>
      <Button
        color="primary"
        className="float-right"
        onClick={authenticateSpotify}
        style={{ minWidth: "200px" }}
      >
        Link Spotify Account
      </Button>
    </Fragment>
  );
}

export default Spotify;