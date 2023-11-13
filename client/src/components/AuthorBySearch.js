import React from "react";
import BookBox from "./BookBox";

function AuthorsBySearch({authorS, history, handleAuthorDetails, handleWorks, loader, setGoogBooks}){
    let authors = authorS.docs

    console.log(authorS)

    if(authorS){
        return(
        //     <div className="search-results">
        //         {
        //             authors?.map((author, index) => {
        //                 return(
        //                     <div className="book-box" onClick={()=>{
        //                         history.push(`/author/${author.key}`)
        //                         handleAuthorDetails(author.key)
        //                         handleWorks(author.key)
        //                     }
        //                     } key={index}>
        //                         <h2>{author.name}</h2>
        //                     </div>
        //                 )
        //             })
        //         }
        //     </div>
        // )
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
                            cover = {book.volumeInfo.imageLinks.thumbnail}
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