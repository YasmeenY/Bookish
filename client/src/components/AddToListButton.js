import React, { useEffect, useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import httpClient from "./httpClient"
import axios from "axios";

function AddToListButton({userData, book}){
    const [ bookData, setBookData ] = useState("")

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

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const [listName, setListName] = useState("")
    const [listId, setListId] = useState(0)

    const handleChange = (e) => {
        setListId(e.target.value)
        addToList(e.target.value)
    }

    const handleListName = (e) => {
        setListName(e.target.value)
    }


    let userLists = userData.lists

    useEffect(() => {
        (async () => {
            try {
                const response = await httpClient.get(`//localhost:5555/books/${book}`)
                setBookData(response.data)
            }
            catch (error) {
                console.log("Can't get Book")
            }
        }) ()
    }, [book])

    function addToList(listId){
        axios.post("http://127.0.0.1:5555/booksInLists", {
            "user_id": userData.id,
            "book_id": bookData.id,
            "book_name": bookData.title,
            "list_id": listId,
            "book_cover": bookData.cover
        })
    }

    return(
        <div>
            <InputLabel id="small-label">Add Book To List ?</InputLabel>
            <FormControl sx={{ m: 1, minWidth: 180 }} size="small">
            <InputLabel id="small-label">Book Lists</InputLabel>
                <Select
                    value={listId}
                    label="listId"
                    onChange={handleChange}
                >
                    <MenuItem value={0} disabled>Book Lists</MenuItem>
                    {userLists?.map((list)=> {
                        return(
                            <MenuItem  key={list.id} value={list.id}>
                                <em>{list.name}</em>
                            </MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            <br></br>
            <Button sx={{color:'inherit'}} onClick={handleOpen}><em>Create New List ?</em></Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <TextField id="outlined-basic" label="Enter List Name" variant="outlined"/>
                        <br></br>
                        <Button sx={{mt:1, color:'inherit'}} onClick={(e) => {
                            handleClose()
                            handleListName(e)
                        }}
                        >Submit</Button>
                    </Box>
                </Modal>
        </div>
    )
}

export default AddToListButton;