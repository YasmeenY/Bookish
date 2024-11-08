import React, { useEffect } from "react";
import Rating from '@mui/material/Rating';
import "./Details.css"
import AddToListButton from "./AddToListButton";

function ListDetails({book, userData, getBookLinks, bookLinks}){
    const {author, title, cover, description, subjects, rating, rating_count, language, isbn, publish_date, publisher} = book

    useEffect(()=>{
        try{
            getBookLinks(book.key)
            console.log(bookLinks)
        }
        catch(error){
            console.log("Invalid")
        }
    },[])

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
                {userData !== "" ? (                  
                    <div className="detail-container">
                        <AddToListButton
                            userData = {userData}
                            id = {book.id}
                            title = {book.title}
                            cover = {book.cover}
                        />
                    </div>
                    ):(
                    <div></div>
                    )}
                <div className="detail-container">
                    <strong>Book Links: </strong>
                    <br></br>
                    <a className='link' href={`https://en.wikipedia.org/wiki/${title}`} target="_blank" rel="noopener noreferrer">Wikipedia</a>
                    {bookLinks ? (bookLinks?.map((link)=>{
                        return(
                            <div>
                                <a className='link' href={link.url} target="_blank" rel="noopener noreferrer">{link.name}</a>
                            </div>
                        )
                    })):(<></>)}
                </div>
            </div>
            <div className="right-div">
                <div className="detail-container">
                    <strong>Description: </strong>
                    <p className='description'>{description}</p>
                </div>
                <div className="detail-container">
                    <strong>Publisher: </strong>
                    <p> {publisher}</p>
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