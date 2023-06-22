import { useState } from "react";
import { useHistory } from "react-router-dom";
import BooksBySearch from "./BooksBySearch";
import AuthorsBySearch from "./AuthorBySearch";

function Search({SearchSetter, handleSearch, bookS, search, linkSetter, handleBookDetails, handleAuthorSearch, authorS, handleAuthorDetails, authorDetails, handleWorks}) {
    const [change, setChange] = useState(false)
    function handleChange(change){
        setChange(change)
    }
    const history = useHistory();
        return (
            <div className="Sign">
                <div className="row2">
                    <div className="search">
                        <input 
                            type="text" 
                            placeholder="Enter Your Search Input here"
                            value={search}
                            onChange={(e)=>SearchSetter(e.target.value)} 
                        />
                        <br></br>
                        <button onClick={() => {
                            handleChange(false)
                            handleSearch()}}> Search By Book Title<i className="fas fa-search"></i></button>
                        <br></br>
                        <button onClick={() => {
                            handleChange(true)
                            handleAuthorSearch()}}> Search By Author<i className="fas fa-search"></i></button>
                    </div>
                </div>
                <div>{ change !== false ?(
                    <div>
                        <AuthorsBySearch
                            authorS={authorS}
                            history={history}
                            handleAuthorDetails={handleAuthorDetails}
                            authorDetails={authorDetails}
                            handleWorks={handleWorks}
                        />
                    </div>
                    ):(
                        <BooksBySearch
                            bookS={bookS}
                            handleBookDetails={handleBookDetails}
                            linkSetter={linkSetter}
                            history={history}
                        />
                    )}
                </div>
            </div>
        )}


export default Search;