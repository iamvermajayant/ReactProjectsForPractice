// import { useState } from "react";

// export default function App() {
//   const [friends, setFriends] = useState([]);
//   const [name, setName] = useState("");
//   const [birthday, setBirthday] = useState("");
//   const [reminder, setReminder] = useState(false);
//   const [friendsEmail, setFriendsEmail] = useState("");

//   const addFriend = async () => {
//     if (!name || !birthday) return;

//     const newFriend = {
//       id: Date.now(),
//       name,
//       birthday,
//       reminder,
//       friendsEmail
//     };

//     setFriends([...friends, newFriend]);
//     setName("");
//     setBirthday("");
//     setReminder(false);
//     setFriendsEmail("");

//     // Send to backend (MongoDB API)
//     try {
//       await fetch("http://localhost:5000/api/friends", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newFriend),
//       });
//     } catch (err) {
//       console.error("Error saving friend:", err);
//     }
//   };

//   const handleDelete = async (id) => {
//     setFriends(friends.filter((friend) => friend.id !== id));

//     try {
//       await fetch(`http://localhost:5000/api/friends/${id}`, {
//         method: "DELETE",
//       });
//     } catch (err) {
//       console.error("Error deleting friend:", err);
//     }
//   };

//   const toggleReminder = async (id) => {
//     const updatedFriends = friends.map((f) =>
//       f.id === id ? { ...f, reminder: !f.reminder } : f
//     );
//     setFriends(updatedFriends);

//     const updatedFriend = updatedFriends.find((f) => f.id === id);

//     try {
//       await fetch(`http://localhost:5000/api/friends/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(updatedFriend),
//       });
//     } catch (err) {
//       console.error("Error updating reminder:", err);
//     }
//   };

//   return (
//     <div className="h-screen w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(187deg,rgba(2,0,36,1)_0%,rgba(48,48,171,1)_59%,rgba(0,212,255,1)_100%)] bg-[size:20px_20px,20px_20px,auto]">
//       <div className="flex justify-center items-center flex-col h-screen">
//         <h1 className="text-3xl font-bold mb-4 text-white">🎂 Birthday Buddy</h1>

//         {/* Form */}
//         <form onSubmit={(e) => {e.preventDefault(); addFriend()}} className="bg-white shadow-lg rounded-lg p-4 w-96 mb-6">
//           <input
//             type="text"
//             placeholder="Friend's Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="border p-2 rounded w-full mb-2"
//           />
//           <input
//             type="date"
//             value={birthday}
//             onChange={(e) => setBirthday(e.target.value)}
//             className="border p-2 rounded w-full mb-2"
//           />
//           <input
//             type="email"
//             value={friendsEmail}
//             onChange={(e) => setFriendsEmail(e.target.value)}
//             className="border p-2 rounded w-full mb-2"
//           />
//           <label className="flex items-center space-x-2 mb-2">
//             <input
//               type="checkbox"
//               checked={reminder}
//               onChange={(e) => setReminder(e.target.checked)}
//             />
//             <span>Set Reminder</span>
//           </label>
//           <button
//             className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
//           >
//             Add Friend
//           </button>
//         </form>

//         {/* Friends List */}
//         <div className="w-96">
//           <h2 className="text-xl font-semibold mb-2 text-white">Your Friends</h2>
//           <ul className="space-y-2">
//             {friends.map((f) => (
//               <li
//                 key={f.id}
//                 className="p-3 bg-white rounded shadow flex justify-between items-center"
//               >
//                 <div>
//                   <span className="font-semibold">{f.name}</span>
//                   <span className="text-gray-500 mx-4">{f.birthday}</span>
//                   <label className="ml-2">
//                     <input
//                       type="checkbox"
//                       checked={f.reminder}
//                       onChange={() => toggleReminder(f.id)}
//                     />{" "}
//                     Reminder
//                   </label>
//                 </div>
//                 <button
//                   className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//                   onClick={() => handleDelete(f.id)}
//                 >
//                   ❌
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";

export default function App() {
  const [friends, setFriends] = useState([]);
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [reminder, setReminder] = useState(false);
  const [friendsEmail, setFriendsEmail] = useState("");
  const [editingId, setEditingId] = useState(null); // ✅ Track editing friend

  // Fetch existing friends when page loads
  useEffect(() => {
    fetch("http://localhost:5000/api/friends")
      .then((res) => res.json())
      .then((data) => setFriends(data));
  }, []);

  // Add friend
  const addFriend = async () => {
    if (!name || !birthday) return;

    const newFriend = { name, birthday, reminder, friendsEmail };

    try {
      const res = await fetch("http://localhost:5000/api/friends", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFriend),
      });
      const saved = await res.json();
      setFriends([...friends, saved]); // ✅ Use DB’s _id
      setName("");
      setBirthday("");
      setReminder(false);
      setFriendsEmail("");
    } catch (err) {
      console.error("Error saving friend:", err);
    }
  };

  // Delete friend
  const handleDelete = async (id) => {
    setFriends(friends.filter((friend) => friend._id !== id));
    try {
      await fetch(`http://localhost:5000/api/friends/${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error("Error deleting friend:", err);
    }
  };

  // Toggle reminder
  const toggleReminder = async (id) => {
    const friend = friends.find((f) => f._id === id);
    const updated = { ...friend, reminder: !friend.reminder };

    setFriends(friends.map((f) => (f._id === id ? updated : f)));

    try {
      await fetch(`http://localhost:5000/api/friends/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reminder: updated.reminder }),
      });
    } catch (err) {
      console.error("Error updating reminder:", err);
    }
  };

  // ✅ Start editing
  const startEdit = (friend) => {
    setEditingId(friend._id);
    setName(friend.name);
    setBirthday(friend.birthday);
    setFriendsEmail(friend.friendsEmail);
    setReminder(friend.reminder);
  };

  // ✅ Save update
  const saveUpdate = async () => {
    if (!editingId) return;

    const updatedFriend = { name, birthday, friendsEmail, reminder };

    try {
      const res = await fetch(`http://localhost:5000/api/friends/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFriend),
      });
      const saved = await res.json();

      setFriends(friends.map((f) => (f._id === editingId ? saved : f)));
      setEditingId(null);
      setName("");
      setBirthday("");
      setFriendsEmail("");
      setReminder(false);
    } catch (err) {
      console.error("Error updating friend:", err);
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-r from-blue-900 to-blue-400">
      <div className="flex justify-center items-center flex-col h-screen">
        <h1 className="text-3xl font-bold mb-4 text-white">🎂 Birthday Buddy</h1>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            editingId ? saveUpdate() : addFriend();
          }}
          className="bg-white shadow-lg rounded-lg p-4 w-96 mb-6"
        >
          <input
            type="text"
            placeholder="Friend's Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          <input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          <input
            type="email"
            value={friendsEmail}
            onChange={(e) => setFriendsEmail(e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          <label className="flex items-center space-x-2 mb-2">
            <input
              type="checkbox"
              checked={reminder}
              onChange={(e) => setReminder(e.target.checked)}
            />
            <span>Set Reminder</span>
          </label>
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full">
            {editingId ? "Update Friend" : "Add Friend"}
          </button>
        </form>

        {/* Friends List */}
        <div className="w-96">
          <h2 className="text-xl font-semibold mb-2 text-white">Your Friends</h2>
          <ul className="space-y-2">
            {friends.map((f) => (
              <li
                key={f._id}
                className="p-3 bg-white rounded shadow flex justify-between items-center"
              >
                <div>
                  <span className="font-semibold">{f.name}</span>
                  <span className="text-gray-500 mx-4">{f.birthday}</span>
                  <label className="ml-2">
                    <input
                      type="checkbox"
                      checked={f.reminder}
                      onChange={() => toggleReminder(f._id)}
                    />{" "}
                    Reminder
                  </label>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                    onClick={() => startEdit(f)}
                  >
                    ✏️
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(f._id)}
                  >
                    ❌
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
