import React, { useEffect, useState } from 'react';
import axios from "axios";
import Rating from '@mui/material/Rating';
import AddToListButton from "./AddToListButton";
import "./Details.css";

function AuthorWorks({book, cover, bookS, userData, addBooktoLists}){
    const [edition, setEdition] = useState("")
    const [rating, setRating] = useState("")
    const [bookId, setBookId] = useState(0)

    useEffect(() => {
        (async () => {
                const response = axios.get(`https://openlibrary.org${book.key}/ratings.json`)
                    setRating((await response).data.summary)
            }) ()
    }, [book.key])

    useEffect(()=>{
        fetch(`http://127.0.0.1:5555/books/lastId`)
        .then(r=>r.json())
        .then(data => {
            setBookId(data)
        }) 
    }, [])

    const average = Math.round(rating.average * 100) / 100
    const count = rating.count
    const {title, key} = book
    const {author_name, lending_edition_s, publish_date, language, subject} = bookS

    let description = ""

    if(typeof description !== "object"){
        description = book.description
    }
    else{
        description = book.value.description
    }

    useEffect(()=>{
        fetch(`https://openlibrary.org/books/${lending_edition_s}.json`)
        .then(r=>r.json())
        .then(data => {
            setEdition(data)
        }) 
    }, [lending_edition_s])

    const {publishers, isbn_13} = edition

    const author_formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
    const authors = author_formatter.format(author_name)

    const subject_formatter = new Intl.ListFormat('en', { style: 'short', type: 'conjunction' });
    const subjects = subject_formatter.format(subject)

    const language_formatter = new Intl.ListFormat('en', { style: 'short', type: 'conjunction' });
    const languages = language_formatter.format(language)

    const publisher_formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
    const publisher = publisher_formatter.format(publishers)

    const isbn_formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
    const isbn = isbn_formatter.format(isbn_13)

    let result = book.key?.slice(7)

    useEffect(()=>{
        if(description !== "object"){
            addBooktoLists(bookId, result, title, description, publisher, languages, isbn, publish_date[0], average, count, authors, cover, subjects)
        }
        else{
            addBooktoLists(bookId, result, title, description.value, publisher, languages, isbn, publish_date[0], average, count, authors, cover, subjects)
        }
    }, [bookId, result, title, description, publisher, languages, isbn, publish_date, average, count, authors, cover, subjects, addBooktoLists])

    if(rating){
        return(
            <div className="container">
                <div className="left-div">
                    <div className="detail-container">
                        <img className='cover' src={cover} alt={title}/>
                        <h2>{title}</h2>
                        <h3>by: {authors}</h3>
                    </div>
                    <div className="detail-container">
                        <Rating defaultValue={average} precision={0.1} readOnly />
                        <div >
                            <div>Ratings average: {average}</div>
                            <div>Ratings Count: {count}</div>
                        </div>
                    </div>
                    <div className="detail-container">
                        <AddToListButton
                            userData = {userData}
                            book = {result}
                        />
                    </div>
                    <div className="detail-container">
                        <strong>Book Links: </strong>
                        <br></br>
                        <a className='link' href={`https://en.wikipedia.org/wiki/${title}`} target="_blank" rel="noopener noreferrer">Wikipedia</a>
                    </div>
                </div>
                <div className='right-div'>
                    <div className="detail-container">
                        <strong>Description: </strong>
                        {typeof description !== "object" ? (<p className='description'>{description}</p>):(<p>{description.value}</p>)}
                    </div>
                    <div className="detail-container">
                        <strong>Publish Date: </strong>
                        <p>{publish_date[0]}</p>
                        <strong>Publisher: </strong>
                        <p>{publishers}</p>
                        <strong>Isbn: </strong>
                        <p>{isbn_13}</p>
                        <strong>Languages: </strong>
                        <p>{languages}</p>
                        <strong>Subjects: </strong>
                        <p>{subjects}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default AuthorWorks