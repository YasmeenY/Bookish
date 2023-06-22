import React, {useEffect, useState} from 'react';
import Rating from '@mui/material/Rating';
import "./Details.css"

function BookDetails({bookDetails, cover, book}) {
    const [edition, setEdition] = useState("")
    const { description, links } = bookDetails
    const { ratings_average, ratings_count, author_name, lending_edition_s, language } = book

    useEffect(()=>{
            fetch(`https://openlibrary.org/books/${lending_edition_s}.json`)
            .then(r=>r.json())
            .then(data => {
                setEdition(data)
            }) 
    }, [lending_edition_s])

    const {subjects, isbn_10, publishers, publish_date, title, uris} = edition

    const subject_formatter = new Intl.ListFormat('en', { style: 'short', type: 'conjunction' });
    const subject = subject_formatter.format(subjects)
    const author_formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
    const authors = author_formatter.format(author_name)
    const average = Math.round(ratings_average * 100) / 100

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
                    </div>
                    <div className='right-div'>
                        <strong>Book Links:</strong>
                        <div>
                            {links ? (<div>
                                {
                                    links?.map((link) => {
                                        return(
                                            <div>
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
                        <p className='description'>{description}</p>
                    </div>
                    <div className="detail-container">
                        <strong>Publish Date:</strong>
                        <p>{publish_date}</p>
                        <strong>Publisher: </strong>
                        <p> {publishers}</p>
                        <strong>ISBN: </strong>
                        <p> {isbn_10}</p>
                        <strong>Languages:</strong>
                        <p>{language[0]}</p>
                        <strong>Subjects:</strong>
                        <p>{subject}</p>
                    </div>
                </div>
            </div>
        )
    }}

export default BookDetails;