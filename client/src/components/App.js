import './App.css';
import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import httpClient from "./httpClient";
import Home from "./Home";
import Sign from './Sign';
import Profile from "./Profile"
import ThemeContextProvider from '../context/ThemeContext';
import Search from "./Search";
import BookDetails from './BookDetails';
import AuthorDetails from './AuthorDetails';
import AuthorWorks from './AuthorWorks';
import BookList from './BookLists';
import ListDetails from "./ListDetail";

function App() {
  const [user, setUser] = useState("")
  const [userData, setUserData] = useState("")
  const [search, setSearch] = useState("")
  const [bookS, setBookS] = useState("")
  const [link, setLink] = useState("")
  const [bookDetails, setBookDetails] = useState("")
  const [authorS, setAuthorS] = useState("")
  const [authorDetails, setAuthorDetails] = useState("")
  const [works, setWorks] = useState("")
  const [authorBook, setAuthorBook] = useState("")
  const [BookLists, setBookList] = useState("")
  const [bookInList, setBookInList] = useState("")

  function handleBookDetails(book){
    fetch(`https://openlibrary.org${book.key}.json`)
    .then(r=>r.json())
    .then(data => {
      setBookDetails(data)
    })
  }

  function handleAuthorBooks(book){
    const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(book.toLowerCase())}`
    fetch(url)
    .then(r=>r.json())
    .then(data => setAuthorBook(data))
  }

  function SearchSetter(search){
    setSearch(search)
  }

  function linkSetter(search){
    setLink(search)
  }

  function handleSearch(){
      const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(search.toLowerCase())}`
      fetch(url)
      .then(r=>r.json())
      .then(data => setBookS(data))
  }

  function handleWorks(author){
    const url = `https://openlibrary.org/authors/${author}/works.json`
    fetch(url)
    .then(r=>r.json())
    .then(data => setWorks(data))
  }

  function handleAuthorDetails(author){
    const url = `https://openlibrary.org/authors/${author}.json`
    fetch(url)
    .then(r=>r.json())
    .then(data => setAuthorDetails(data))
  }

  function handleAuthorSearch(){
    const url = `https://openlibrary.org/search/authors.json?q=${encodeURIComponent(search.toLowerCase())}`
    fetch(url)
    .then(r=>r.json())
    .then(data => setAuthorS(data))
  }

  useEffect(() => {
    (async () => {
      try{
        const response = await httpClient.get("http://localhost:5555/check_session")
        setUser(response.data)
      }
      catch(error){
        console.log("Not Authenticated")
      }
      }) ()
  }, [])

  useEffect(() => {
    (async () => {
        try {
            const response = await httpClient.get(`http://localhost:5555/users/${user.id}`)
            setUserData(response.data)
        }
        catch (error) {
            console.log("Not authenticated")
        }
      }) ()
  }, [user])

  function addBooktoLists( key, title, description, publisher, language, isbn, date, rating, count, authors, cover, subject) {
    (async () => {
      try {
        const response = await httpClient.post("http://localhost:5555/books", {
          "key": key,
          "title": title,
          "description": description,
          "publisher": publisher,
          "language": language,
          "isbn": isbn,
          "publish_date": date,
          "rating": rating,
          "rating_count": count,
          "author": authors,
          "cover": cover,
          "subjects": subject
        })
        setBookInList(response.data)
      }
      catch (error) {
        console.log("Book Already in Data")
      }
  }) ()}

  // function getBookLinks(key){
  //   const response = httpClient.get(`http://localhost:5555/links/${key}`)
  //   setBookLinks(response.data)
  // }

  useEffect(() => {
    (async () => {
        try {
            const response = await httpClient.get("http://localhost:5555/books")
            setBookList(response.data)
        }
        catch (error) {
          console.log(error)
        }
      }) ()
  }, [])

  if (BookLists){
    return (
      <div className="App">
        <ThemeContextProvider>
            <NavBar
              user = {user}
              data = {userData}
            />
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/sign' exact component={Sign} />
              <Route exact path="/profile">
                <Profile
                  data = {userData}
                  setUserData = {setUser}
                  user = {user}
                />
              </Route>
              <Route exact path="/Books">
                <BookList
                  books = {BookLists}
                />
              </Route>
              {BookLists.map((book,index) => {
                  return (
                      <Route key={index} exact path={`/books/${book.id}`}>
                        <ListDetails
                            book = {book}
                            userData = {userData}
                        />
                      </Route>
                  )
              })}
              <Route exact path="/Search">
                <Search
                  SearchSetter = {SearchSetter}
                  handleSearch = {handleSearch}
                  bookS = {bookS}
                  search = {search}
                  linkSetter = {linkSetter}
                  handleBookDetails = {handleBookDetails}
                  handleAuthorSearch = {handleAuthorSearch}
                  authorS = {authorS}
                  handleAuthorDetails = {handleAuthorDetails}
                  handleWorks = {handleWorks}
                />
              </Route>
              {bookS.docs?.map((book, index)=>{
                return (
                  <Route key={index} exact path={link}>
                    <BookDetails
                      book = {book}
                      userData = {userData}
                      bookDetails={bookDetails}
                      bookInList = {bookInList}
                      addBooktoLists = {addBooktoLists}
                      cover = {
                        typeof bookDetails["covers"] === "undefined" 
                        ? 
                        `https://bookcart.azurewebsites.net/Upload/Default_image.jpg` 
                        :
                        `https://covers.openlibrary.org/b/id/${bookDetails["covers"][0]}-M.jpg`
                      }
                    />
                  </Route>
                )
              })}
              {authorS.docs?.map((author, index)=>{
                return (
                  <Route key={index} exact path={`/author/${author.key}`}>
                    <AuthorDetails
                      author = {author}
                      authorDetails={authorDetails}
                      works = {works}
                      handleAuthorBooks={handleAuthorBooks}
                      cover = {
                        typeof authorDetails["photos"] === "undefined" 
                        ? 
                        `https://openlibrary.org/images/icons/avatar_author-lg.png` 
                        :
                        `https://covers.openlibrary.org/a/id/${authorDetails["photos"][0]}-M.jpg`
                      }
                    />
                  </Route>
                )
              })}
              {authorBook ? (<div>
                {works.entries?.map((work, index) => {
                return(
                  <Route key={index} exact path={`/author${work.key}`}>
                    <AuthorWorks
                      userData = {userData}
                      book = {work}
                      bookInList = {bookInList}
                      bookS = {authorBook?.docs[0]}
                      addBooktoLists = {addBooktoLists}
                      cover = {
                        typeof work["covers"] === "undefined" 
                        ? 
                        `https://bookcart.azurewebsites.net/Upload/Default_image.jpg` 
                        :
                        `https://covers.openlibrary.org/b/id/${work["covers"][0]}-M.jpg`
                      }
                    />
                  </Route>
                )
              })}
              </div>):(<div></div>)}
            </Switch>
        </ThemeContextProvider>
      </div>
    );
  }
}

export default App;
