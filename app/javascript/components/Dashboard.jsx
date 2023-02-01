import React, { useEffect, useState } from "react";
import useToken from "../hooks/useToken";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default Dashboard = () => {
    const [user, setUser] = useState('');
    const { setToken, token } = useToken();
    const [notifDeleted, setNotifDelete] = useState(false);

    const [sentNotes, setSentNotes] = useState();
    const [recievedNotes, setRecievedNotes] = useState();
    const welcome = user ? `Welcome, ${user.email}` : `Welcome`;

    const handleLogOut = () => {
        setToken(null);
        navigate("/app");
    }

    // get notifications for this user
    useEffect(() => {
        const url = `http://localhost:3000/users/${token}`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setUser(data);
                setSentNotes(data.senders);
                setRecievedNotes(data.recipients);
            })
    }, []);

    async function deleteNotification(index) {
        return fetch(`http://localhost:3000/notifications/${index}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': "application/json"
            }
        }).then(() => {
            setSentNotes(sentNotes.filter((n) => n.id !== index));
            setRecievedNotes(recievedNotes.filter((n) => n.id !== index));
            setNotifDelete(true);
        });
    }

    const handleDelete = async (e, index) => {
        e.preventDefault();
        await deleteNotification(index);
    }

    return (
        <Container sx={{ border: "5px dotted violet" }}>
            <Container>
                <Button variant="outlined" href="/app">Back</Button>
                <Typography variant="h3" sx={{ textDecoration: "underline" }}>{welcome}</Typography>
                <Typography variant="subtitle1" sx={{ textDecoration: "underline" }}>Recieved Notifications</Typography>
                {(recievedNotes && recievedNotes.length > 0) ? recievedNotes.map((notes, index) =>
                    <ul key={index}>
                        <li>
                            {notes.task}
                        </li>
                    </ul>

                ) : <div>Nothing to show...</div>}
                <Typography variant="subtitle1" sx={{ textDecoration: "underline" }}>Sent Notifications</Typography>
                {notifDeleted && <div style={{ color: 'green' }}>Notification Deleted!</div>}
                {(sentNotes && sentNotes.length > 0) ? sentNotes.map((notes, index) =>
                    <ul key={index}>
                        <li>
                            <button onClick={(e) => handleDelete(e, notes.id)}>x</button> {notes.task}
                        </li>
                    </ul>

                ) : <div>Nothing to show...</div>}
            </Container>
            <Container>
                <Button variant="outlined" href="/app/notifications">New Notification</Button>
            </Container>
            <br />
            <Container>
                <Button variant="outlined" href="/app" onClick={handleLogOut}>Log out</Button>
            </Container>
        </Container>
    )

}