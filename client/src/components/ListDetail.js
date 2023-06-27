import React from "react";
import Rating from '@mui/material/Rating';
import "./Details.css"
import AddToListButton from "./AddToListButton";

function ListDetails({book, userData}){
    const {author, title, cover, description, subjects, rating, rating_count, language, isbn, publish_date} = book

    return(
        <div className="container">
            <div className="left-div">
                <div className="detail-container">
                    <img className='cover' src={cover} alt={title}/>
                    <h2>{title}</h2>
                    <h3>by: {author}</h3>
                </div>
                <div className="detail-container">
                    <Rating defaultValue={rating} precision={0.5} readOnly />
                    <div>Ratings average: {rating}</div>
                    <div>Ratings Count: {rating_count}</div>
                </div>
                <div className="detail-container">
                    <AddToListButton
                        userData = {userData}
                        book = {book.key}
                    />
                </div>
                <div className="detail-container">
                    <strong>Book Links: </strong>
                    <br></br>
                    <a className='link' href={`https://en.wikipedia.org/wiki/${title}`} target="_blank" rel="noopener noreferrer">Wikipedia</a>
                </div>
            </div>
            <div className="right-div">
                <div className="detail-container">
                    <strong>Description: </strong>
                    <p className='description'>{description}</p>
                </div>
                <div className="detail-container">
                    <strong>Publish Date:</strong>
                    <p>{publish_date}</p>
                    <strong>ISBN: </strong>
                    <p> {isbn}</p>
                    <strong>Languages:</strong>
                    <p>{language}</p>
                    <strong>Subjects:</strong>
                    <p>{subjects}</p>
                </div>
            </div>
        </div>
    )
}

export default ListDetails;