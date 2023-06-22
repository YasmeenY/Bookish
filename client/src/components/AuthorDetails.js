import React from "react";
import "./Author.css"
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

        function handleClick(){
            alert("Clicked")
            console.log("clicked")
        }

        return(
            <div className="container">
                <div className="left-div">
                    <div className="image-container">
                        <img src={cover} alt="author"/>
                    </div>
                    <div className="detail-container">
                        <h2>{name}</h2>
                        <p>Birth Date:</p>
                        <p>{birth_date}</p>
                        <p>Death Date:</p>
                        <p>{death_date}</p>
                    </div>
                </div>
                <div className="right-div">
                    <div className="bio">
                        {bio}
                    </div>
                    <div className="detail-container">
                        <p>Top Subjects: </p>
                        <p>{subjects}</p>
                        <p>Top Works: </p>
                        <p>{top_work}</p>
                    </div>
                    <div className="works-container">
                        <h3>Works:</h3>
                        <div>
                            {works?.map((work, index)=>{
                                return(
                                    <button
                                        className="buttons"
                                        key = {index}
                                        onClick={() => {
                                            handleAuthorBooks(work.title);
                                            history.push(`/author${work.key}`);}}
                                    >
                                        <Button
                                            type="button"
                                            startIcon={<BookIcon />}
                                            size="medium"
                                            variant="filledTonal"
                                            sx={{ m: 1 }}
                                        > {work.title} </Button>
                                    </button>
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