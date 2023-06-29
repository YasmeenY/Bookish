import React, {useEffect, useState} from 'react';
import Rating from '@mui/material/Rating';
import AddToListButton from "./AddToListButton";
import axios from "axios";
import "./Details.css";
import useRunOnce from './useRunOnce';

function BookDetails({bookDetails, cover, book, userData, addBooktoLists}) {
    const [edition, setEdition] = useState("")

    const { description, links, subjects } = bookDetails
    const { ratings_average, ratings_count, author_name, lending_edition_s, language} = book

    useEffect(()=>{
            fetch(`https://openlibrary.org/books/${lending_edition_s}.json`)
            .then(r=>r.json())
            .then(data => {
                setEdition(data)
            }) 
    }, [lending_edition_s])


    const { publishers, publish_date, uris, title } = edition

    const isbn_formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
    let isbn = ""

    if(edition.isbn_13 === undefined){
        isbn = isbn_formatter.format(edition.isbn_10)
    }
    else{
        isbn = isbn_formatter.format(edition.isbn_13)
    }

    const subject_formatter = new Intl.ListFormat('en', { style: 'short', type: 'conjunction' });
    const subject = subject_formatter.format(subjects)

    const author_formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
    const authors = author_formatter.format(author_name)

    const language_formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
    const languages = language_formatter.format(language)

    const publisher_formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
    const publisher = publisher_formatter.format(publishers)

    let result = bookDetails.key?.slice(7)
    
    let average = Math.round(ratings_average * 100) / 100

    let descriptionType = typeof description

    let count = ratings_count

    if(count === undefined){
        average = 0
        count = 0
    }

    useEffect(()=>{
        if(descriptionType === "string"){
            addBooktoLists( result, title, description, publisher, languages, isbn, publish_date, average, count, authors, cover, subject)
        }
        else if(typeof description === "object"){
            addBooktoLists( result, title, description.value, publisher, languages, isbn, publish_date, average, count, authors, cover, subject)
        }
        else{
            addBooktoLists( result, title, "No Description :(", publisher, languages, isbn, publish_date, average, count, authors, cover, subject)
        }
    }, [descriptionType, result, title, description, publisher, languages, isbn, publish_date, average, count, authors, cover, subject, addBooktoLists])

    useRunOnce({
        fn: () => {
            links?.map((link)=>{
                axios.post(`http://localhost:5555/links`, {
                    "name": link.title,
                    "url": link.url,
                    "book_key": result
                })
            })
        },
        sessionKey: "changeMeAndFnWillRerun"
    });

    if (edition){
        return (
            <div className="container">
                <div className="left-div">
                    <div>
                        <div className="detail-container">
                            <img className='cover' src={cover} alt={title}/>
                            <h2>{title}</h2>
                            <h3>by: {authors}</h3>
                        </div>
                        <div className="detail-container">
                            <Rating defaultValue={ratings_average} precision={0.5} readOnly />
                            <div>Ratings average: {average}</div>
                            <div>Ratings Count: {ratings_count}</div>
                        </div>
                        {userData !== "" ? (                  
                            <div className="detail-container">
                                <AddToListButton
                                    userData = {userData}
                                    book = {result}
                                />
                            </div>
                        ):(
                        <div></div>
                        )}
                    </div>
                    <div className='right-div'>
                        <strong>Book Links:</strong>
                        <div>
                            {links ? (<div>
                                {
                                    links?.map((link) => {
                                        return(
                                            <div key={link.title}>
                                                <a className='link' href={link.url} target="_blank" rel="noopener noreferrer">{link.title}</a>
                                            </div>
                                        )
                                    })
                                }
                            </div>):(<div>
                                No Links
                            </div>)}
                            {uris !== undefined ? (
                                <a className='link' href={uris[0]} target="_blank" rel="noopener noreferrer">Text Sample</a>
                            ):(
                                <div></div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="detail-container">
                    <div className="detail-container">
                        <strong>Description: </strong>
                        {typeof description !== "object" ? (<p className='description'>{description}</p>):(<p>{description.value}</p>)}
                    </div>
                    <div className="detail-container">
                        <strong>Publish Date:</strong>
                        <p>{publish_date}</p>
                        <strong>Publisher: </strong>
                        <p> {publisher}</p>
                        <strong>ISBN: </strong>
                        <p> {isbn}</p>
                        <strong>Edition: </strong>
                        <p> {lending_edition_s}</p>
                        <strong>Languages:</strong>
                        <p>{languages}</p>
                        <strong>Subjects:</strong>
                        <p>{subject}</p>
                    </div>
                </div>
            </div>
        )
    }else{
        return(
            <div className="loader-container">
                <div className="loader"></div>
            </div>
        )
    }
}

export default BookDetails;