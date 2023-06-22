import React from "react";

function AuthorsBySearch({authorS, history, handleAuthorDetails, handleWorks}){
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
    }else{
        <h3>Loading..</h3>
    }
}

export default AuthorsBySearch;