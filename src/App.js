import { useState } from "react";
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(true);
  const [friends, setFriends] = useState(initialFriends);

  function handleShowAddFriend() {
    setShowAddFriend((el) => !el);
  }

  function handleAddFriends(friend) {
    setFriends((el) => [...el, friend]);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FreindsList friends={friends} />
        {showAddFriend && <FormAAdFreind onAddFriends={handleAddFriends} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend === true ? "Colse" : "Add Friend"}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function FreindsList({ friends }) {
  return (
    <ul>
      {friends.map((el) => (
        <Freind el={el} key={el.id} />
      ))}
    </ul>
  );
}

function Freind({ el }) {
  return (
    <div>
      <li>
        <img src={el.image} alt={el.name} />
        <h3> {el.name}</h3>
        {el.balance < 0 && (
          <p className="red">
            You owe {el.name} {Math.abs(el.balance)}£
          </p>
        )}

        {el.balance > 0 && (
          <p className="green">
            {el.name} owes you {Math.abs(el.balance)}£
          </p>
        )}

        {el.balance === 0 && <p className="red">You and {el.name} are even</p>}
        <Button>Select</Button>
      </li>
    </div>
  );
}

function FormAAdFreind({ onAddFriends }) {
  const [name, setName] = useState();
  const [image, setImage] = useState("https://i.pravatar.cc/48?u=933372");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name && !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      name,
      image: `${image}?=${id}`,
      balance: 0,
      id,
    };

    onAddFriends(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48?u=933372");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🧑‍🤝‍🧑 Freind name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🖼️ Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with </h2>

      <label>🤑 Bill value</label>
      <input type="text" />

      <label> 💸Your expenses</label>
      <input type="text" />

      <label> 🧑‍🤝‍🧑 X expense </label>
      <input type="text" disabled />

      <label> 🧑‍🤝‍🧑Who is paying the bill </label>

      <Button>Split Bill</Button>
      <select>
        <option value="user">You</option>
        <option value="X">X</option>
      </select>
    </form>
  );
}
