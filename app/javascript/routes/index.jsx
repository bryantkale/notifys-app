import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";
import Dashboard from "../components/Dashboard";
import NewUser from "../components/NewUser";
import NewNotification from "../components/NewNotification";
import useToken from "../hooks/useToken";

const RequireAuth = ({ children }) => {
    const { token, setToken } = useToken();

    if (!token) {
        return (<Navigate to="/app" replace={true} />);
    }
    return children;
};

export default () => {
    const { token } = useToken();
    return (
        <Routes>
            <Route path="/app" exact element={<Home />} />
            <Route path="/app/home" element={<RequireAuth><Dashboard /></RequireAuth>} />
            <Route path="/app/notifications" element={<RequireAuth><NewNotification /></RequireAuth>} />
        </Routes>)
};