import React from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const Home = (props) => {
    const { loggedIn, email } = props;
    const navigate = useNavigate();

    const onButtonClick = () => {
        if (loggedIn) {
            // Log out logic goes here if needed
            props.setLoggedIn(false);
            props.setEmail("");
        } else {
            // Navigate to the login page
            navigate("/login");
        }
    };

    return (
        <div className="mainContainer">
            <div className={"titleContainer"}>
                <div>Welcome!</div>
            </div>
            <div>This is the home page.</div>
            <div className={"buttonContainer"}>
                <input
                    className={"inputButton"}
                    type="button"
                    onClick={onButtonClick}
                    value={loggedIn ? "Log out" : "Log in"}
                />
                {loggedIn ? <div>Your email address is {email}</div> : <div />}
            </div>
        </div>
    );
};

export default Home;
