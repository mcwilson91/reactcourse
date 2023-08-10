import React, { useState } from "react";
import AddUser from "./components/Users/AddUser";
import UserList from "./components/Users/UserList";

function App() {
  const [users, setUsers] = useState([]);

  const addHandler = (username, age) => {
    setUsers((previous) => {
      return [
        ...previous,
        { name: username, age: age, id: Math.random.toString() },
      ];
    });
  };

  return (
    <div>
      <AddUser onAddUser={addHandler} />
      <UserList users={users} />
    </div>
  );
}

export default App;
