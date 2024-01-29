import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const onButtonClick = async () => {
        try {
            setLoading(true);

            // Make a POST request to the login API endpoint
            const response = await fetch("https://localhost:7196/api/account/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Login successful, you can handle the response data accordingly
                console.log(data.message);
                navigate("/dashboard"); // Redirect to the dashboard or any other page
            } else {
                // Login failed, update error messages
                setEmailError("Invalid Email or Password");
                setPasswordError("Invalid Email or Password");
            }
        } catch (error) {
            console.error("Error during login:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={"mainContainer"}>
            <div className={"titleContainer"}>
                <div>Login</div>
            </div>
            <br />
            <div className={"inputContainer"}>
                <input
                    value={email}
                    placeholder="Enter your email here"
                    onChange={(ev) => setEmail(ev.target.value)}
                    className={"inputBox"}
                />
                <label className="errorLabel">{emailError}</label>
            </div>
            <br />
            <div className={"inputContainer"}>
                <input
                    value={password}
                    placeholder="Enter your password here"
                    onChange={(ev) => setPassword(ev.target.value)}
                    className={"inputBox"}
                />
                <label className="errorLabel">{passwordError}</label>
            </div>
            <br />
            <div className={"inputContainer"}>
                <input
                    className={"inputButton"}
                    type="button"
                    onClick={onButtonClick}
                    value={loading ? "Logging in..." : "Log in"}
                    disabled={loading}
                />
            </div>
        </div>
    );
};

export default Login;
