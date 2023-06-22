import React, {useEffect, useState} from 'react';
import Rating from '@mui/material/Rating';
import "./Book.css"

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

    if (edition){
        return (
            <div className="book-container">
                <div>
                    <img className='cover' src={cover} alt={title}/>
                    <h2>{title}</h2>
                    <h3>by: {author_name}</h3>
                    <Rating defaultValue={ratings_average} precision={0.5} readOnly />
                    <div>
                        <div>Ratings average: {ratings_average}</div>
                        <div>Ratings Count: {ratings_count}</div>
                    </div>
                    <div>
                        <div> Book Links:
                            {links ? (<div>
                                {
                                    links?.map((link) => {
                                        return(
                                            <div>
                                                <a href={link.url} target="_blank" rel="noopener noreferrer">{link.title}</a>
                                            </div>
                                        )
                                    })
                                }
                            </div>):(<div>
                                No Links
                            </div>)}
                            {uris !== undefined ? (
                                <a href={uris[0]} target="_blank" rel="noopener noreferrer">Text Sample</a>
                            ):(
                                <div></div>
                            )}
                        </div>
                    </div>
                </div>
                <p>{description}</p>
                <div>
                    <p>Publish Date: {publish_date}</p>
                    <p>Publisher: {publishers}</p>
                    <p>Isbn: {isbn_10}</p>
                    <p>Language: {language[0]}</p>
                </div>
                <div>
                    <div> Subjects:
                        {
                            subjects?.map((subject) => {
                                return(
                                    <div>
                                        {subject}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }}

export default BookDetails;