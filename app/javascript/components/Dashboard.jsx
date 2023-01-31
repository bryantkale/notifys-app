import React, { useEffect, useState } from "react";
import Login from "./Login";
import useToken from "../hooks/useToken";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default Dashboard = () => {
    const [user, setUser] = useState('');
    const { setToken, token } = useToken();
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
            .then((data) => setUser(data))
    }, []);

    return (
        <Container sx={{ border: "5px dotted violet" }}>
            <Container>
                <Button variant="outlined" href="/app">Back</Button>
                <Typography variant="h3" sx={{ textDecoration: "underline" }}>{welcome}</Typography>
                <Typography variant="subtitle1" sx={{ textDecoration: "underline" }}>Recieved Notifications</Typography>
                {(user && user.recipients) && user.recipients.map((notes, index) =>
                    <ul key={index}>
                        <li>
                            {notes.task}
                        </li>
                    </ul>

                )}
                {/* {(!user.recipients.length === 0) && <div>No Current Notifications </div>} */}
                <Typography variant="subtitle1" sx={{ textDecoration: "underline" }}>Sent Notifications</Typography>
                {(user && user.senders) && user.senders.map((notes, index) =>
                    <ul key={index}>
                        <li>
                            {notes.task}
                        </li>
                    </ul>

                )}
                {/* {(!user.senders.length === 0) && <div>No Current Notifications </div>} */}
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