import React, { useEffect, useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import httpClient from "./httpClient"
import axios from "axios";

function AddToListButton({userData, id, title, cover}){
    const [listId, setListId] = useState(0)

    const handleChange = (e) => {
        setListId(e.target.value)
        addToList(e.target.value)
    }

    let userLists = userData.lists

    function addToList(listId){
        axios.post("http://localhost:5555/booksInLists", {
            "user_id": userData.id,
            "book_id": id,
            "book_name": title,
            "list_id": listId,
            "book_cover": cover
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
        </div>
    )
}

export default AddToListButton;