import React, { useState } from "react";
import httpClient from "./httpClient";
import ImageIcon from '@mui/icons-material/Image';
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from '@mui/material/Button';
import "./App.css";
import BookBox from "./BookBox";
import {Link} from "react-router-dom";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';


function Profile({data}) {
    const [userImage, setUserImage] = useState("")
    const [change, setChange] = useState(false)
    const [BooksInList, setBooksInList] = useState("")
    const [listName, setListName] = useState("")
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const logOutUser = async () => {
        await httpClient.delete("http://localhost:5555/logout")
        window.location.href = "/"
    }

    const changeUserImage = async () => {
        try{
            await httpClient.patch(`http://localhost:5555/users/${data.id}`, {
                image: userImage,
            })
            window.location.href = "/profile"
        }
        catch (error) {
            alert("Input must be a URL")
        }
    }

    const deleteUser = async () => {
        await httpClient.delete(`http://localhost:5555/users/${data.id}`)
        window.location.href = "/"
    }

    const getBooksInList = async (id) => {
        const response = await httpClient.get(`http://localhost:5555/users/lists/${id}`)
        setBooksInList(response.data)
    }

    function createNewList(){
        httpClient.post("http://localhost:5555/users/lists", {
            "name": listName,
            "user_id": data.id
        })
        setTimeout(function(){
            window.location.reload();
        }, 500);
    }

    const handleListName = (e) => {
        setListName(e.target.value)
    }

    const deleteList = (id) => {
        httpClient.delete(`http://localhost:5555/users/lists/${id}`)
        setTimeout(function(){
            window.location.reload();
        }, 500);
    }

    const deleteBook = (id) => {
        httpClient.delete(`http://localhost:5555/booksInLists/${id}`)
        setTimeout(function(){
            window.location.reload();
        }, 500);
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 200,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p:3
    };

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
                <Button sx={{color:'inherit'}} onClick={handleOpen}><em>Create New List ?</em></Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <TextField value={listName} onChange={(e)=>handleListName(e)} id="outlined-basic" label="Enter List Name" variant="outlined"/>
                        <br></br>
                        <Button sx={{mt:1, color:'inherit'}} onClick={() => {
                            handleClose()
                            createNewList()
                        }}
                        >Submit</Button>
                    </Box>
                </Modal>
                <br></br>
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
                    <div className="button-container">
                        {data.lists?.map((list)=>{
                            return(
                                <div className="button-div">
                                    <Button variant="filledTonal" onClick={()=>{getBooksInList(list.id)}}>
                                        {list.name}
                                    </Button>
                                    <IconButton onClick={()=>{deleteList(list.id)}} aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="container">
                    {BooksInList.books?.map((book)=>{
                        return(
                            <div>
                                <Link to={`/books/${book.book_id}`} className="link">
                                    <div className="list_book-box">
                                        <BookBox
                                            title = {book.name}
                                            cover = {book.cover}
                                            change = {"yes"}
                                        />
                                    </div>
                                </Link>
                                <IconButton onClick={()=>{deleteBook(book.id)}} aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )}

export default Profile;