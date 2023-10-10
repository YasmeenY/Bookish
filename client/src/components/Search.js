import { useState } from "react";
import { useHistory } from "react-router-dom";
import BooksBySearch from "./BooksBySearch";
import AuthorsBySearch from "./AuthorBySearch";
import Button from '@mui/material-next/Button';
import BookIcon from '@mui/icons-material/Book';
import Person4Icon from '@mui/icons-material/Person4';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import "./App.css"


function Search({SearchSetter, setGoogBooks, handleSearch, bookS, search, linkSetter, handleAuthorSearch, authorS, handleAuthorDetails, handleWorks}) {
    const [change, setChange] = useState(false)
    const [loader, setLoader] = useState(false)
    function handleChange(change){
        setChange(change)
    }
    const history = useHistory();
        return (
            <div className="Sign">
                <div className="row2">
                    <div className="search-div">
                        <div className="search">
                            <div className="input-field">
                                <TextField
                                    placeholder="Search..."
                                    value={search}
                                    onChange={(e)=>SearchSetter(e.target.value)} 
                                    id="input-with-icon-textfield"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchOutlinedIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="standard"
                                />
                            </div>
                            <br></br>
                            <div
                                className="buttons"
                                onClick={() => {
                                    handleChange(false)
                                    handleSearch()
                                    setLoader(true)
                                }}
                            >
                                <Button
                                    startIcon={<BookIcon />}
                                    size="medium"
                                    variant="filledTonal"
                                    sx={{ m: 1 }}
                                > {"Search By Book Title"} </Button>
                            </div>
                            <br></br>
                            <div
                                className="buttons"
                                onClick={() => {
                                    handleChange(true)
                                    handleAuthorSearch()
                                    setLoader(true)
                                }}
                            >
                                <Button
                                    startIcon={<Person4Icon />}
                                    size="medium"
                                    variant="filledTonal"
                                    sx={{ m: 1 }}
                                > {"Search By Author Name"} </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="result-container">{ change !== false ?(
                    <div>
                        <AuthorsBySearch
                            authorS={authorS}
                            history={history}
                            handleAuthorDetails={handleAuthorDetails}
                            handleWorks={handleWorks}
                            loader={loader}
                        />
                    </div>
                    ):(
                        <BooksBySearch
                            bookS={bookS}
                            linkSetter={linkSetter}
                            history={history}
                            loader={loader}
                            setGoogBooks = {setGoogBooks}
                        />
                    )}
                </div>
            </div>
        )}


export default Search;