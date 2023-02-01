import React, { useState } from "react";
import useToken from "../hooks/useToken";
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Login from "./Login";
import NewUser from "./NewUser";
import { useNavigate } from "react-router-dom";

export default Home = () => {
    const { token, setToken } = useToken();
    const [signup, setSignUp] = useState(false);
    const navigate = useNavigate();

    const screenShow = (t, showSignup) => {
        if (t) {
            return (
                <div>
                    <Button onClick={() => navigate(`/app/home`)}>Navigate home</Button>
                </div>
            )
        } else if (showSignup) {
            return (
                <div>
                    <NewUser setToken={setToken} />
                    <Button onClick={() => setSignUp(false)}>login</Button>
                </div>
            )
        } else {
            return (
                <div>
                    <Login setToken={setToken} />
                    <Button onClick={() => setSignUp(true)}>signup here</Button>
                </div>
            )
        }
    }


    return (
        <Container sx={{ border: "5px dotted blue" }}>
            <Typography variant="h2">Notification App</Typography>
            <Typography variant="subtitle">
                Here you will be able to view and send notifications.
            </Typography>

            <Divider />
            <Container>
                {screenShow(token, signup)}
            </Container>
        </Container>
    )
};