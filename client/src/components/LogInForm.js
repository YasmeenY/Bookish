import React, { useState } from "react";
import httpClient from "./httpClient";
import Button from '@mui/material-next/Button';
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Person4Icon from '@mui/icons-material/Person4';
import PasswordIcon from '@mui/icons-material/Password';

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
            if(error.response.status === 404){
                alert("User doesn't exist")
            }
            else if (error.response.status === 400){
                alert("Missing 'username' or 'password'.")
            }
            else {
                alert("Incorrect password")
            }
        }
    }

    return (
        <div className="container">
            <form action="#">
                <h2 className="title">Sign in</h2>
                <div className="input-field">
                    <TextField
                        placeholder="Username"
                        className="input-field"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} 
                        id="username"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Person4Icon />
                                </InputAdornment>
                            ),
                        }}
                        variant="standard"
                    />
                </div>
                <div className="input-field">
                    <TextField
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="Password"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PasswordIcon />
                                </InputAdornment>
                            ),
                        }}
                        variant="standard"
                    />
                </div>
                <button 
                    className="buttons" 
                    onClick={ () => LogIn() }
                >
                    <Button
                        size="medium"
                        variant="filledTonal"
                        sx={{ m: 1 }}
                    >
                        Log In
                    </Button>
                </button>
                {/* <button
                type="button"
                onClick={ () => LogIn() }
                className="button solid"
                >
                    Log In
                </button> */}
            </form>
        </div>
    )}

export default LogInForm;