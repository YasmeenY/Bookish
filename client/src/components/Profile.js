import React, { useState } from "react";
import httpClient from "./httpClient";
import ImageIcon from '@mui/icons-material/Image';
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from '@mui/material-next/Button';
import "./App.css";

function Profile({data}) {
    const [userImage, setUserImage] = useState("")
    const [change, setChange] = useState(false)

    const logOutUser = async () => {
        await httpClient.delete("//localhost:5555/logout")
        window.location.href = "/"
    }

    const changeUserImage = async () => {
        try{
            await httpClient.patch(`//localhost:5555/users/${data.id}`, {
                image: userImage,
            })
            window.location.href = "/profile"
        }
        catch (error) {
            if(error.response.status === 401){
                alert("Invalid")
            }
        }
    }

    const deleteUser = async () => {
        await httpClient.delete(`//localhost:5555/users/${data.id}`)
        window.location.href = "/"
    }

    return (
        <div className="container">
            <div className="left-div">
                <img className="img" src={data.image} alt="user pic"></img>
                <br></br>
                {
                    change !== false ? (
                        <div>
                            <div className="input-field">
                                <TextField
                                    placeholder="Insert Image Url"
                                    className="input-field"
                                    value={userImage}
                                    onChange={ (e) => setUserImage(e.target.value) }
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <ImageIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="standard"
                                />
                            </div>
                            <br></br>
                            <br></br>
                            <button 
                                className="buttons" 
                                onClick={ () => {
                                    setChange(!change)
                                    changeUserImage()
                                }}
                            >
                                <Button
                                    size="medium"
                                    variant="filledTonal"
                                    sx={{ m: 1 }}
                                >
                                    Change Image
                                </Button>
                            </button>
                        </div>
                    ): (
                        <button 
                            className="buttons" 
                            onClick={ () => {
                                setChange(!change)
                            }}
                        >
                            <Button
                                size="medium"
                                variant="filledTonal"
                                sx={{ m: 1 }}
                            >
                                Change Image
                            </Button>
                        </button>
                    )
                }
                <h2>{data.username}</h2>
                <h2>{data.email}</h2>
                <button 
                    className="buttons" 
                    onClick={ () => logOutUser() }
                >
                    <Button
                        size="medium"
                        variant="filledTonal"
                        sx={{ m: 1 }}
                    >
                        Log Out
                    </Button>
                </button>
                <button 
                    className="buttons" 
                    onClick={ () => deleteUser() }
                >
                    <Button
                        size="medium"
                        variant="filledTonal"
                        sx={{ m: 1 }}
                    >
                        Delete User
                    </Button>
                </button>
            </div>
            <div className="left-div">
                This is the container for the lists
            </div>
        </div>
    )}

export default Profile;