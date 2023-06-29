import React from "react";

function AuthorsBySearch({authorS, history, handleAuthorDetails, handleWorks, loader}){
    let authors = authorS.docs

    if(authorS){
        return(
            <div className="search-results">
                {
                    authors?.map((author, index) => {
                        return(
                            <div className="book-box" onClick={()=>{
                                history.push(`/author/${author.key}`)
                                handleAuthorDetails(author.key)
                                handleWorks(author.key)
                            }
                            } key={index}>
                                <h2>{author.name}</h2>
                            </div>
                        )
                    })
                }
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

export default AuthorsBySearch;