import Rating from '@mui/material/Rating';
import "./Details.css";
import AddToListButton from "./AddToListButton"

function BookDetails({book, userData}) {

    console.log(book)

    const subject_formatter = new Intl.ListFormat('en', { style: 'short', type: 'conjunction' });
    const subject = subject_formatter.format(book.categories)

    const author_formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
    const authors = author_formatter.format(book.authors)

        return (
            <div className="container">
                <div className="left-div">
                    <div>
                        <div className="detail-container">
                            <img className='cover' src={book.imageLinks.thumbnail} alt={book.title}/>
                            <h2>{book.title}</h2>
                            <h3>by: {authors}</h3>
                        </div>
                        <div className="detail-container">
                            <Rating defaultValue={book.averageRating} precision={0.5} readOnly />
                            <div>Ratings average: {book.averageRating}</div>
                            <div>Ratings Count: {book.ratings_count}</div>
                        </div>
                        {/* {userData !== "" ? (                  
                            <div className="detail-container">
                                <AddToListButton
                                    userData = {userData}
                                    book = {book.id}
                                />
                            </div>
                        ):(
                        <div></div>
                        )} */}
                    </div>
                    <div className='right-div'>
                        <strong>Book Links:</strong>
                            <br></br>
                            <a className='link' href={book.infoLink} target="_blank" rel="noopener noreferrer">Info Link</a>
                            <br></br>
                            <a className='link' href={book.previewLink} target="_blank" rel="noopener noreferrer">Preview Link</a>
                            <br></br>
                            <a className='link' href={book.canonicalVolumeLink} target="_blank" rel="noopener noreferrer">Canonical Volume Link</a>
                    </div>
                </div>
                <div className="detail-container">
                    <div className="detail-container">
                        <strong>Description: </strong>
                        <br></br>
                        {book.description}
                    </div>
                    <div className="detail-container">
                        <strong>Publish Date:</strong>
                        <p>{book.publishedDate}</p>
                        <strong>Publisher: </strong>
                        <p> {book.publisher}</p>
                        <strong>ISBN 13: </strong>
                        <p> {book.industryIdentifiers[0].identifier}</p>
                        <strong>Languages:</strong>
                        <p>{book.language}</p>
                        <strong>Subjects:</strong>
                        <p>{subject}</p>
                    </div>
                </div>
            </div>
        )
    }

export default BookDetails;