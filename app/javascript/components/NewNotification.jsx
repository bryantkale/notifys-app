import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";


export default NewNotification = () => {
    const [task, setTask] = useState('');
    const [sender, setSender] = useState('');
    const [recipient, setRecipient] = useState('');
    const [users, setUsers] = useState();

    useEffect(() => {
        const url = "http://localhost:3000/users";
        fetch(url).then(res => res.json())
            .then((data) => setUsers(data))
    }, [])

    async function sendNotification(credentials) {
        const url = "http://localhost:3000/notifications";
        return fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(credentials)
        }).then(data => data.json())
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await sendNotification({
            task,
            sender,
            recipient
        });
        console.log(token);
        // navigate(`/app/users/${token.id}`)
    }

    return (
        <div>
            <Link to={`/app`}>
                <button>Back</button>
            </Link>
            <h1>Create A Notification</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Task</p>
                    <input onChange={e => setTask(e.target.value)} type="text" />
                </label>
                <br />
                <label for="sender">Choose a user:</label>
                <select onChange={e => setSender(e.target.value)} name="sender" id="sender">
                    {users && users
                        .filter(u => u.email !== null)
                        .map((u, index) =>
                            <option value={u.id} key={index}>
                                {u.email}
                            </option>
                        )}
                </select>
                <br />
                <label for="recipient">Choose a Recipient:</label>
                <select onChange={e => setRecipient(e.target.value)} name="recipient" id="recipient">
                    {users && users
                        .filter(u => u.email !== null)
                        .map((u, index) =>
                            <option value={u.id} key={index}>
                                {u.email}
                            </option>
                        )}
                </select>
                <div>
                    <button type="submit">Send</button>
                </div>
            </form >
        </div >
    );
}