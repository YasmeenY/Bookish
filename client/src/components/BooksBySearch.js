import React from "react";
import BookBox from "./BookBox";
import "./App.css";

function BooksBySearch({bookS, history, loader, setGoogBooks}){

    if(bookS){
        return (
            <div className="search-results">
                {bookS?.map((book, index) => {
                    return (
                        <div
                            className="book-box"
                            key = {index}
                            onClick={() => {
                                history.push(`/${book.id}`)
                                setGoogBooks(book)
                            }}
                        >
                            <BookBox
                                cover = {book.volumeInfo.imageLinks.thumbnail}
                                title = {book.volumeInfo.title}
                            />
                        </div>
                    )
                })}
            </div>
        )
    }else if(loader === true){
        return(
            <div className="loader-container">
                <div className="loader"></div>
            </div>
        )
    }
}

export default BooksBySearch