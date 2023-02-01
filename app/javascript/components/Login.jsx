import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


export default function Login({ setToken }) {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function loginUser(credentials) {
        const url = "http://localhost:3000/session/login";
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
        const token = await loginUser({
            username,
            password
        });
        setToken(token);
        navigate(`/app/home`)
    }

    return (
        <Container fixed={true} sx={{ height: "900px" }}>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input onChange={e => setUserName(e.target.value)} type="text"></input>
                </label>
                <label>
                    <p>Password</p>
                    <input onChange={e => setPassword(e.target.value)} type="password"></input>
                </label>
                <Container>
                    <Button type="submit">Submit</Button>
                </Container>
            </form>
        </Container>
    )
}
