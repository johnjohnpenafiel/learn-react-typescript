import { useEffect, useState } from "react";
import apiClient, { CanceledError } from "./services/api-client";

import "./App.css";
import UserService, { User } from "./services/user-service";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const { request, cancel } = UserService.getAllUsers();
    request
      .then((res) => {
        setUsers(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setErrors(err.message);
        setIsLoading(false);
      });

    return () => cancel();
  }, []);

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));

    apiClient.delete("/users/" + user.id).catch((err) => {
      setErrors(err.message);
      setUsers(originalUsers);
    });
  };

  const addUser = () => {
    const newUser = { id: 0, name: "John" };
    const originalUsers = [...users];

    apiClient
      .post("/users", newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        setErrors(err.message);
        setUsers(originalUsers);
      });
  };

  const updatedUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

    apiClient.patch("/users/" + user.id, updatedUser).catch((err) => {
      setErrors(err.message);
      setUsers(originalUsers);
    });
  };

  return (
    <>
      {errors && <p>{errors}</p>}
      {isLoading && "loading..."}
      <button onClick={addUser}>Add</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}
            <button onClick={() => updatedUser(user)}>Edit</button>
            <button onClick={() => deleteUser(user)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
