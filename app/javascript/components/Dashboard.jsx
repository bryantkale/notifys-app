import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useToken from "../hooks/useToken";
import Login from "./Login";

export default Dashboard = () => {
    const [user, setUser] = useState();
    const { id } = useParams();

    const { token, setToken } = useToken();
    console.log("----")
    console.log(setToken)
    console.log("----")

    // get notifications for this user
    useEffect(() => {
        const url = `http://localhost:3000/users/${id}`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => setUser(data))
            .catch(e => console.log(e))
    }, []);
    // console.log(typ)
    if (!token) {
        return <Login setToken={setToken} />
    } else {
        return (
            <>
                <div>
                    <Link to={"/app"}>
                        <button>Back</button>
                    </Link>
                    <h1>Welcome, User</h1>
                    <h2>Recieved Notifications</h2>
                    {(user && user.recipients) && user.recipients.map((notes, index) =>
                        <ul key={index}>
                            <li>
                                {notes.task}
                            </li>
                        </ul>

                    )}
                    <h2>Sent Notifications</h2>
                    {(user && user.senders) && user.senders.map((notes, index) =>
                        <ul key={index}>
                            <li >{notes.task}
                            </li>
                        </ul>

                    )}
                </div>
                <div>
                    <Link to={"/app/notifications"}>
                        <button>Send New Notification</button>
                    </Link>
                </div>
                <div>
                    {/* TODO: implement */}
                    <Link to={"/app"}><button>Log out</button></Link>
                </div>
            </>)
    }

}