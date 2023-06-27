import React, { useState, useEffect } from "react";
import httpClient from "./httpClient";
import ImageIcon from '@mui/icons-material/Image';
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from '@mui/material/Button';
import "./App.css";
import BookBox from "./BookBox";
import {Link} from "react-router-dom";


function Profile({data}) {
    const [userImage, setUserImage] = useState("")
    const [change, setChange] = useState(false)
    const [listId, setListId] = useState(1)
    const [BooksInList, setBooksInList] = useState("")

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

    const getBooksInList = async (id) => {
        const response = await httpClient.get(`//localhost:5555/users/lists/${id}`)
        setBooksInList(response.data)
        console.log(data)
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
                            <Button
                                onClick={ () => {
                                    setChange(!change)
                                    changeUserImage()
                                }}
                                size="medium"
                                variant="filledTonal"
                                sx={{ m: 1 }}
                            >
                                Change Image
                            </Button>
                        </div>
                    ): (
                        <Button
                            onClick={ () => {
                                setChange(!change)
                            }}
                            size="medium"
                            variant="filledTonal"
                            sx={{ m: 1 }}
                        >
                            Change Image
                        </Button>
                    )
                }
                <h2>{data.username}</h2>
                <h2>{data.email}</h2>
                <Button
                    onClick={ () => logOutUser() }
                    size="medium"
                    variant="filledTonal"
                    sx={{ m: 1 }}
                >
                    Log Out
                </Button>
                <br></br>
                <Button
                    onClick={ () => deleteUser() }
                    size="medium"
                    variant="filledTonal"
                    sx={{ m: 1 }}
                >
                    Delete User
                </Button>
            </div>
            <div className="right-div">
                <div>
                    <h3>User Lists: </h3>
                    {data.lists?.map((list)=>{
                        return(
                            <Button variant="filledTonal" onClick={()=>{getBooksInList(list.id)}}>
                                {list.name}
                            </Button>
                        )
                    })}
                </div>
                <div className="container">
                    {BooksInList.books?.map((book)=>{
                        return(
                            <Link to={`/books/${book.book_id}`} className="link">
                                <div className="list_book-box">
                                    <BookBox
                                        title = {book.name}
                                        cover = {book.cover}
                                    />
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )}

export default Profile;