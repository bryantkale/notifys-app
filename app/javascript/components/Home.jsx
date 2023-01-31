import React from "react";
import { Link } from "react-router-dom";


export default Home = () => (
    <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
        <div className="jumbotron jumbotron-fluid bg-transparent">
            <div className="container secondary-color">
                <h1 className="display-4">Notification App</h1>
                <p className="lead">
                    Here you will be able to view and send notifications.
                </p>
                <Link to={"/app/login"}><button>Login In</button></Link>
                <Link to={"/app/users"}><button>Sign Up</button></Link>
            </div>
        </div>
    </div>
);