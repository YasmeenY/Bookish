import React, { useState } from "react";
import httpClient from "./httpClient";
import "./App.css"

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
        <div className="user-container">
            <h1>This is the profile Page</h1>
            <div className="user-info">
                <img className="img" src={data.image} alt="user pic"></img>
                <br></br>
                {
                    change !== false ? (
                        <div>
                            <input
                                type="text"
                                placeholder="Insert Image Url"
                                value={userImage}
                                onChange={ (e) => setUserImage(e.target.value) }
                            />
                            <br></br>
                            <br></br>
                            <button
                                type="button"
                                onClick={ () => {
                                    setChange(!change)
                                    changeUserImage()
                                }}
                            >Change Image
                            </button>
                        </div>
                    ): (
                        <button
                            onClick={ ()=> setChange(!change) }
                        >Change Image</button>
                    )
                }
                <h2>{data.username}</h2>
                <h2>{data.email}</h2>
                <button onClick={ () => logOutUser() } > Log Out </button>
                <button onClick={ () => deleteUser() }> Delete User</button>
            </div>
            <div className="user-lists">
                This is the container for the lists
            </div>
        </div>
    )}

export default Profile;