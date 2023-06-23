import BookBox from "./BookBox";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";

function BookList({books}){
    const [click, setClick] = useState(true)

    const history = useHistory();

    if(books){
        return(
            <div className="container">
                <div className="search-results">
                    {books?.map((book, index)=>{
                        return (
                            <div 
                                key={index} 
                                className="book-box"
                                onClick={() => {
                                    setClick(!click)
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
        )
    }
}

export default BookList;