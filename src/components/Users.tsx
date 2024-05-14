import React from 'react';
import apiPath from '../utils/apiPath';

interface User {
  id: number;
  name: string;
  email: string;
}

const Users: React.FC = () => {
  // const users: User[] = [
  //   { id: 1, name: 'John Doe', email: 'john@example.com' },
  //   { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  //   { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
  // ];

  const [users, setUsers] = React.useState<User[]>([]);

  React.useEffect(() => {
    fetch(apiPath('/users'))
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  return (
    <div>
      <h1>List of Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>Name:</strong> {user.name}, <strong>Email:</strong> {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;