import './App.css';
import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import httpClient from "./httpClient";
import Home from "./Home";
import Profile from "./Profile"
import Search from "./Search";
import BookDetails from './BookDetails';
import BookList from './BookLists';
import ListDetails from "./ListDetail";
import UserForms from "./UserForms.js";
import axios from 'axios';

function App() {
  const [user, setUser] = useState("")
  const [userData, setUserData] = useState("")
  const [search, setSearch] = useState("")
  const [bookS, setBookS] = useState("")
  const [authorS, setAuthorS] = useState("")
  const [BookLists, setBookList] = useState("")
  const [bookInList, setBookInList] = useState("")
  const [ bookLinks, setBookLinks ] = useState("")
  const [ googBooks, setGoogBooks ] = useState("")


  function SearchSetter(search){
    setSearch(search)
  }


  function handleSearch(){
    let book = encodeURIComponent(search.toLowerCase())
    const response = httpClient.post("http://localhost:5555/search", {
      "book": book
    })
    .then(data => {setBookS(data.data)})
  }

  function handleAuthorSearch(){
    let works = encodeURIComponent(search.toLowerCase())
    const response = httpClient.post("http://localhost:5555/search_works", {
      "works": works
    })
    .then(data => setAuthorS(data.data))
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
        const response = await axios.post("http://localhost:5555/books", {
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

  function getBookLinks(key){
    try{
      const url = `http://localhost:5555/books/links/${key}`
      fetch(url)
      .then(r=>r.json())
      .then(data => {
        setBookLinks(data)})
    }
    catch(error){
      console.log("error")
    }
  }

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
            <NavBar
              user = {user}
              data = {userData}
            />
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/sign' exact component={UserForms} />
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
                            getBookLinks = {getBookLinks}
                            bookLinks = {bookLinks}
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
                  setGoogBooks = {setGoogBooks}
                  handleAuthorSearch = {handleAuthorSearch}
                  authorS = {authorS}
                />
              </Route>
              <Route exact path ={`/${googBooks.id}`}>
                <BookDetails
                  book = {googBooks.volumeInfo}
                  userData = {userData}
                />
              </Route>
            </Switch>
      </div>
    );
  }
}

export default App;
