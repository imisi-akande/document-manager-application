import React, { propTypes } from 'react';
import UserListRow from './UserListRow';
import {Pagination} from 'react-materialize';

function renderList({ usersList }) {
  if (usersList.length === 0) {
    return (
     <div className="">
      <h1> No Users </h1>
     </div>
    );
  }
  return (
    <div>
   <table className="table striped">
    <thead>
     <tr>
      <th>First Name</th>
      <th>Last Name</th>
      <th>User Name</th>
      <th>Email</th>
      <th>Role</th>
     </tr>
   </thead>
   <tbody>

    {usersList.map((user) =>
      <UserListRow user={user} key={user.id} />
    )}
  </tbody>
  </table>
 }
  </div>
  );
}


// const UserList = ({ usersList }) => {
//   const users = usersList;
//   return renderList(users);
// };

export default renderList;
