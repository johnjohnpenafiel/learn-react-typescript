import UserService, { User } from "./services/user-service";
import useUser from "./hooks/useUser";

import "./App.css";

function App() {
  const { users, errors, isLoading, setUsers, setErrors } = useUser();

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));

    UserService.delete(user.id).catch((err) => {
      setErrors(err.message);
      setUsers(originalUsers);
    });
  };

  const addUser = () => {
    const newUser = { id: 0, name: "John" };
    const originalUsers = [...users];

    UserService.create(newUser)
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

    UserService.edit(updatedUser).catch((err) => {
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
