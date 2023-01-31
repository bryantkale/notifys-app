import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default NewUser = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function createUser(credentials) {
        const url = "http://localhost:3000/users";
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
        const token = await createUser({
            username,
            password
        });
        navigate(`/app/users/${token.id}`)
    }

    return (
        <Container sx={{ border: "5px dotted pink" }}>
            <Button href={"/app"} variant="outlined">Back</Button>
            <Typography variant="h3">New User Page</Typography>
            <form onSubmit={handleSubmit}>
                <label>
                    <Typography variant="subtitle">Username: </Typography>
                    <input onChange={e => setUserName(e.target.value)} type="text"></input>
                </label>
                <br />
                <br />
                <label>
                    <Typography variant="subtitle">Password: </Typography>
                    <input onChange={e => setPassword(e.target.value)} type="password"></input>
                </label>
                <br />
                <br />
                <Button variant="outlined" type="submit">Create Account</Button>
            </form>
        </Container>)
}