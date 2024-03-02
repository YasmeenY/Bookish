import React, { useState } from "react";
import httpClient from "./httpClient";
import Button from '@mui/material-next/Button';
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Person4Icon from '@mui/icons-material/Person4';
import PasswordIcon from '@mui/icons-material/Password';

function LogInForm({change}) {
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")

    const LogIn = async () => {
        try{
            await httpClient.post("http://localhost:5555/login", {
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

    const Register = async () => {
        try{
            await httpClient.post("http://localhost:5555/signup", {
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
        <div className="container">
            <form action="#">
                {change === true ? (<h2>Sign Up</h2>):(<h2>Sign in</h2>)}
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
                {change === true ? (<div 
                    className="buttons" 
                    onClick={ () => Register() }
                >
                    <Button
                        size="medium"
                        variant="filledTonal"
                        sx={{ m: 1 }}
                    >
                        Register
                    </Button>
                </div>):
                
                (<div 
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
                </div>)}
            </form>
        </div>
    )}

export default LogInForm;