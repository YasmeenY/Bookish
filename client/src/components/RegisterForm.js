import React, { useState } from "react";
import httpClient from "./httpClient";
import Button from '@mui/material-next/Button';
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Person4Icon from '@mui/icons-material/Person4';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import "./forms.css";

function RegisterForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")

    const Register = async () => {
        try{
            await httpClient.post("http://localhost:5555/signup", {
                username,
                email,
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
                <h2 className="title">Sign up</h2>
                <div className="input-field">
                    <TextField
                        placeholder="Username"
                        className="input-field"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} 
                        id="add-username"
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
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="add-email"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon />
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
                        id="add-password"
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
                <div 
                    className="buttons" 
                    onClick={() => Register()}
                >
                    <Button
                        size="medium"
                        variant="filledTonal"
                        sx={{ m: 1 }}
                    >
                        Sign Up
                    </Button>
                </div>
            </form>
        </div>
    )}

export default RegisterForm;