import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
        <div>
            <h1>New User Page</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input onChange={e => setUserName(e.target.value)} type="text"></input>
                </label>
                <label>
                    <p>Password</p>
                    <input onChange={e => setPassword(e.target.value)} type="password"></input>
                </label>
                <div>
                    <button type="submit">Create Account</button>
                </div>
            </form>
        </div>)
}