import React, { useEffect, useState } from 'react';
import axios from "axios";
import Rating from '@mui/material/Rating';

function AuthorWorks({book, cover, bookS}){
    const [edition, setEdition] = useState("")
    const [rating, setRating] = useState("")

    useEffect(() => {
        (async () => {
                const response = axios.get(`https://openlibrary.org${book.key}/ratings.json`)
                    setRating((await response).data.summary)
            }) ()
    }, [book.key])

    const average = Math.round(rating.average * 100) / 100
    const count = rating.count
    const {title, description} = book
    const {author_name, lending_edition_s, publish_date, language, subject} = bookS

    useEffect(()=>{
        fetch(`https://openlibrary.org/books/${lending_edition_s}.json`)
        .then(r=>r.json())
        .then(data => {
            setEdition(data)
        }) 
    }, [lending_edition_s])

    const {publishers, isbn_13} = edition

    console.log(book)

    const author_formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
    const authors = author_formatter.format(author_name)

    const subject_formatter = new Intl.ListFormat('en', { style: 'short', type: 'conjunction' });
    const subjects = subject_formatter.format(subject)

    const language_formatter = new Intl.ListFormat('en', { style: 'short', type: 'conjunction' });
    const languages = language_formatter.format(language)

    if(rating){
        return(
            <div>
                <div>
                    <img className='cover' src={cover} alt={title}/>
                    <h2>{title}</h2>
                    <h3>by: {authors}</h3>
                    <Rating defaultValue={average} precision={0.1} readOnly />
                    <div>
                        <div>Ratings average: {average}</div>
                        <div>Ratings Count: {count}</div>
                    </div>
                </div>
                <div>
                    <p>{description}</p>
                </div>
                <div>
                    <p>Publish Date: {publish_date[0]}</p>
                    <p>Publisher: {publishers}</p>
                    <p>Isbn: {isbn_13}</p>
                    <p>Languages: {languages}</p>
                </div>
                <div>
                    <p>Subjects: {subjects}</p>
                </div>
            </div>
        )
    }
}

export default AuthorWorks