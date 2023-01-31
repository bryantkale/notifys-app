import React from "react";
import useToken from "../hooks/useToken";
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

export default Home = () => {
    const { token, setToken } = useToken();
    return (
        <Container sx={{ border: "5px dotted blue" }}>
            <Typography variant="h2">Notification App</Typography>
            <Typography variant="subtitle">
                Here you will be able to view and send notifications.
            </Typography>

            <Divider />
            <Container>
                <Button variant="outlined" href={`/app/users/${token}`}>Login In</Button>
                <Button variant="outlined" href="/app/users">Sign Up</Button>
            </Container>
        </Container>
    )
};