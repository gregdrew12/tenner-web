import React from "react";
import { Table } from "reactstrap";
import Nav from 'react-bootstrap/Nav';

function UserList(props) {
  const users = props.users;
  const playback = props.playback;
  return (
    <Table dark>
      <thead>
        <tr>
          <th>User</th>
          <th>Song</th>
        </tr>
      </thead>
      <tbody>
        {!users || users.length <= 0 ? (
          <tr>
            <td colSpan="6" align="center">
              <b>Oops, no one here yet</b>
            </td>
          </tr>
        ) : (
          users.map(user => (
            <tr key={user.id}>
              <td>
                <Nav.Link href={`/${user.username}/`}>{user.username}{user.email === localStorage.getItem('email') ? ' (Me)' : null}</Nav.Link>
              </td>
              <td>{user.id in playback ? playback[user.id]['title'] + ' by ' + playback[user.id]['artists'] : null}</td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
}

export default UserList;