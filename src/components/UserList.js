import React from "react";
import { Table } from "reactstrap";
import NewUserModal from "./NewUserModal";

import ConfirmRemovalModal from "./ConfirmRemovalModal";

function UserList(props) {
  const users = props.users;
  const playback = props.playback;
  return (
    <Table dark>
      <thead>
        <tr>
          <th>Email</th>
          <th>Song</th>
          <th></th>
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
              <td>{user.email}</td>
              <td>{user.id in playback ? playback[user.id]['title'] + ' by ' + playback[user.id]['artists'] : null}</td>
              <td align="center">
                <NewUserModal
                  create={false}
                  user={user}
                  resetState={props.resetState}
                />
                &nbsp;&nbsp;
                <ConfirmRemovalModal
                  id={user.id}
                  resetState={props.resetState}
                />
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
}

export default UserList;