import BookBox from "./BookBox";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import httpClient from "./httpClient";
import Button from '@mui/material-next/Button';
import MoreIcon from '@mui/icons-material/More';

function Home() {
    const [books, setBooks] = useState("")

    useEffect(() => {
        (async () => {
            try {
                const response = await httpClient.get("http://localhost:5555/books/random")
                setBooks(response.data)
            }
            catch (error) {
                console.log("Error")
            }
        }) ()
    }, [])
    
    const history = useHistory();

    if(books){
        return (
            <div>
                <div className="details-container">
                    <h3>Discover Books: </h3>
                    <div 
                        className="more-button" 
                        onClick={() => history.push(`/Books`)}
                    >
                        <Button
                            startIcon={<MoreIcon />}
                            size="medium"
                            variant="filledTonal"
                            sx={{ m: 1 }}
                        >
                            {"See More >>"}
                        </Button>
                    </div>
                    <div className="search-results">
                        {books?.map((book, index)=>{
                            return (
                                <div 
                                    key={index} 
                                    className="book-box"
                                    onClick={() => {
                                        history.push(`/books/${book.id}`)}}
                                >
                                    <BookBox
                                        title = {book.title}
                                        cover = {book.cover}
                                    />
                                </div>
                        )})}
                    </div>
                </div>
            </div>
        )
    }}

export default Home;