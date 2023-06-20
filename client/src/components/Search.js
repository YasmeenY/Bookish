import BookBox from "./BookBox";
import { useHistory } from "react-router-dom";

function Search({SearchSetter, handleSearch, bookS, search}) {
    const history = useHistory();
    if (bookS) {
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
                        <button onClick={handleSearch}> Search By Book Title<i className="fas fa-search"></i></button>
                        <br></br>
                        <button> Search By Book Author<i className="fas fa-search"></i></button>
                    </div>
                </div>
                <div>
                    {bookS.docs.map((book, index) => {
                        return (
                            <div
                                key = {index}
                                onClick={() => history.push(`/book/${book.title}`)}
                            >
                                <BookBox
                                    cover = {
                                        typeof book["cover_i"] === "undefined" 
                                        ? 
                                        `https://bookcart.azurewebsites.net/Upload/Default_image.jpg` 
                                        :
                                        `https://covers.openlibrary.org/b/id/${book["cover_i"]}-M.jpg`
                                    }
                                    title = {book.title}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        )}
        else {
            return (
                <div className="row2">
                    <div className="search">
                        <input 
                            type="text" 
                            placeholder="Enter Your Search Input here"
                            value={search}
                            onChange={(e)=>SearchSetter(e.target.value)} 
                        />
                        <button onClick={handleSearch}> Search By Book Title<i className="fas fa-search"></i></button>
                        <br></br>
                        <button> Search By Book Author<i className="fas fa-search"></i></button>
                    </div>
                </div>
            )
        }}

export default Search;