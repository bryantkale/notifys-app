import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";


export default function Login({ setToken }) {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    // console.log(setToken)

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
        console.log("----")
        console.log(setToken)
        console.log(token)
        console.log("----")
        // setToken(token);
        navigate(`/app/users/${token.id}`)
    }

    return (
        <div>
            <Link to={"/app"}>Home</Link>
            <h1>Carl's Notification Widget</h1>
            <h2>Log In</h2>
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
                    <button type="submit">Submit</button>
                </div>
            </form>
            {/* link to new user page */}
            <Link to={"/app/users"}>New User?</Link>
        </div>
    )
}
