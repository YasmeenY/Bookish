import React from "react";
import BookBox from "./BookBox";
import "./App.css";

function BooksBySearch({bookS, handleBookDetails, linkSetter, history, loader}){
    if(bookS){
        return (
            <div className="search-results">
                {bookS.docs?.map((book, index) => {
                    return (
                        <div
                            className="book-box"
                            key = {index}
                            onClick={() => {
                                handleBookDetails(book)
                                linkSetter(`/book${book.key}`)
                                history.push(`/book${book.key}`)}}
                        >
                            <BookBox
                                cover = {
                                    typeof book["cover_i"] === "undefined" 
                                    ? 
                                    `https://bookcart.azurewebsites.net/Upload/Default_image.jpg` 
                                    :
                                    `https://covers.openlibrary.org/b/id/${book["cover_i"]}-M.jpg`
                                }
                                title = {book.title}
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