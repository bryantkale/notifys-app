import React, { useState, useEffect } from "react";
import useToken from "../hooks/useToken";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default NewNotification = () => {
    const [task, setTask] = useState('');
    const [recipient, setRecipient] = useState('');
    const [users, setUsers] = useState();
    const [response, setResponse] = useState();
    const { token } = useToken();

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
        const data = await sendNotification({
            task,
            sender: token,
            recipient
        });
        setResponse(data);
    }
    return (
        <Container fixed={true} sx={{ height: "900px", border: "5px dotted red" }}>
            <Button variant="outlined" href={`/app/home`}>Back</Button>
            <Typography variant="h4">Create A Notification</Typography><br />
            <form onSubmit={handleSubmit}>
                <label>
                    <Typography variant="subtitle">Task: </Typography>
                    <input onChange={e => setTask(e.target.value)} type="text" />
                </label>
                <br />
                <br />
                <label htmlFor="recipient">Choose a Recipient: </label>
                <select onChange={e => setRecipient(e.target.value)} name="recipient" id="recipient">
                    {users && users
                        .filter(u => u.email !== null)
                        .filter(u => u.id !== token)
                        .map((u, index) =>
                            <option value={u.id} key={index}>
                                {u.email}
                            </option>
                        )}
                </select>
                <br />
                <br />

                <Button variant="outlined" type="submit">Send</Button>
                {(response && response.created_at) && <div style={{ color: 'green' }}>Notification Sent!</div>}

            </form >
        </Container >
    );
}