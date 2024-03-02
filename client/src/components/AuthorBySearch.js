import React from "react";
import BookBox from "./BookBox";

function AuthorsBySearch({authorS, history, loader, setGoogBooks}){

    if(authorS){
        return(
        <div className="search-results">
            {authorS?.map((book, index) => {
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
                            cover = {
                                book.volumeInfo.imageLinks === undefined
                                    ? ""
                                    : `${book.volumeInfo.imageLinks.thumbnail}`
                            }
                            title = {book.volumeInfo.title}
                        />
                    </div>
                )
            })}
        </div>)
    }else if(loader === true){
        return(
            <div className="loader-container">
                <div className="loader"></div>
            </div>
        )
    }
}

export default AuthorsBySearch;