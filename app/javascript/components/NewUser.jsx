import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default NewUser = ({ setToken }) => {
    const [email, setEmail] = useState('');
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
            email,
            password
        });
        setToken(token.id);
        navigate(`/app/home`)
    }

    return (
        <Container fixed={true} sx={{ border: "900px" }}>
            <form onSubmit={handleSubmit}>
                <label>
                    <Typography variant="subtitle">Username: </Typography>
                    <input onChange={e => setEmail(e.target.value)} type="text"></input>
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
        </Container>
    )
}