import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";
import Dashboard from "../components/Dashboard";
import NewUser from "../components/NewUser";
import NewNotification from "../components/NewNotification";
import { useToken } from "../hooks/useToken";

// const { token, setToken } = useToken();

export default () => (
    <Routes>
        <Route path="/app" exact element={<Home />} />
        <Route path="/app/login" element={<Login />} />
        <Route path="/app/users/:id" element={<Dashboard />} />
        <Route path="/app/notifications" element={<NewNotification />} />
        <Route path="/app/users" element={<NewUser />} />
    </Routes>
);