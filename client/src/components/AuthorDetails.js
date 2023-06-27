import React from "react";
import "./Details.css"
import { useHistory } from "react-router-dom";
import Button from '@mui/material-next/Button';
import BookIcon from '@mui/icons-material/Book';

function AuthorDetails({authorDetails, author, cover, works, handleAuthorBooks}){

        works = works.entries
        const {birth_date, death_date, name, top_subjects, top_work} = author
        const {bio} = authorDetails
        const history = useHistory();

        const subject_formatter = new Intl.ListFormat('en', { style: 'short', type: 'conjunction' });
        const subjects = subject_formatter.format(top_subjects)

        console.log(authorDetails)

        return(
            <div className="container">
                <div className="left-div">
                    <div className="image-container">
                        <img src={cover} alt="author"/>
                    </div>
                    <div className="detail-container">
                        <h2>{name}</h2>
                        <strong>Birth Date:</strong>
                        <p>{birth_date}</p>
                        <strong>Death Date:</strong>
                        <p>{death_date}</p>
                    </div>
                </div>
                <div className="right-div">
                    <div className="detail-container">
                        <div className="description">
                            {typeof bio !== "object" ? (<p className='description'>{bio}</p>):(<p>{bio.value}</p>)}
                        </div>
                    </div>
                    <div className="detail-container">
                        <strong>Top Subjects: </strong>
                        <p>{subjects}</p>
                        <strong>Top Works: </strong>
                        <p>{top_work}</p>
                    </div>
                    <div className="works-container">
                        <strong>Works:</strong>
                        <div>
                            {works?.map((work, index)=>{
                                return(
                                    <div
                                        className="buttons"
                                        key = {index}
                                        onClick={() => {
                                            handleAuthorBooks(work.title);
                                            history.push(`/author${work.key}`);}}
                                    >
                                        <Button
                                            startIcon={<BookIcon />}
                                            size="medium"
                                            variant="filledTonal"
                                            sx={{ m: 1 }}
                                        > {work.title} </Button>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <div>

                </div>
            </div>
        )
    
}

export default AuthorDetails;