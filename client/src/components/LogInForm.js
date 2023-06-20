import React, { useState } from "react";
import httpClient from "./httpClient";

function LogInForm() {
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")

    const LogIn = async () => {
        try{
            await httpClient.post("//localhost:5555/login", {
                username,
                password,
            })
            window.location.href = "/profile"
        }
        catch (error) {
            if(error.response.status === 401){
                alert("Invalid Credentials")
            }
        }
    }

    return (
        <div className="form">
            <form action="#" className="sign-in-form">
                <h2 className="title">Sign in</h2>
                <div className="input-field">
                    <i className="fas fa-user"></i>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="input-field">
                    <i className="fas fa-lock"></i>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                type="button"
                onClick={ () => LogIn() }
                className="button solid"
                >
                    Log In
                </button>
            </form>
        </div>
    )}

export default LogInForm;