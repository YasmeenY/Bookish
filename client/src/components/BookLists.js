import BookBox from "./BookBox";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import httpClient from "./httpClient";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import ListDetails from "./ListDetail";

function BookList({books}){
    const [lists, setList] = useState("")
    const [click, setClick] = useState(true)

    useEffect(() => {
        (async () => {
            try {
                const response = await httpClient.get("http://127.0.0.1:5555/books")
                setList(response.data)
            }
            catch (error) {
                console.log("Error")
            }
        }) ()
    }, [])
    
    const history = useHistory();
    console.log(lists)
    if(lists){
        return(
            <div className="container">
                {click === true ? (
                    <div className="search-results">
                        {lists?.map((book, index)=>{
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
                ):(
                    <Switch>
                        {lists?.map((book,index) => {
                            return (
                                <Route key={index} exact path={`/books/${book.id}`}>
                                <ListDetails
                                    book = {book}
                                />
                                </Route>
                            )
                        })}
                    </Switch>
                )}
            </div>
        )
    }
}

export default BookList;