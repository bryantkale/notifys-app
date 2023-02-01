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

    // decides what screen to show
    const screenShow = (t, showSignup) => {
        if (t) {
            return (
                <Container>
                    <Button onClick={() => navigate(`/app/home`)}>Navigate home</Button>
                </Container>
            )
        } else if (showSignup) {
            return (
                <Container>
                    <NewUser setToken={setToken} />
                    <Button onClick={() => setSignUp(false)}>login</Button>
                </Container>
            )
        } else {
            return (
                <Container>
                    <Login setToken={setToken} />
                    <Button onClick={() => setSignUp(true)}>signup here</Button>
                </Container>
            )
        }
    }


    return (
        <Container fixed={true} sx={{ height: "900px", border: "5px dotted blue" }}>
            <Typography variant="h2">Notification App</Typography>
            <Typography sx={{ paddingTop: "1em" }} variant="subtitle">
                Here you will be able to view and send notifications.
            </Typography>
            <Divider />
            {screenShow(token, signup)}
        </Container>
    )
};