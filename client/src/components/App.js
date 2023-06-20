import './App.css';
import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import httpClient from "./httpClient";
import Home from "./Home";
import Sign from './Sign';
import Profile from "./Profile"
import ThemeContextProvider from '../context/ThemeContext';
import Search from "./Search"

function App() {
  const [user, setUser] = useState("")
  const [userData, setUserData] = useState("")
  const [search, setSearch] = useState("")
  const [bookS, setBookS] = useState("")

  function SearchSetter(search){
    setSearch(search)
  }

  function handleSearch(){
      const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(search.toLowerCase()).replace(/%20/g, "+")}`
          fetch(url)
          .then(r=>r.json())
          .then(data => setBookS(data))
  }

  console.log(bookS)

  useEffect(() => {
    (async () => {
          try {
              const response = await httpClient.get("//localhost:5555/check_session")
              setUser(response.data)
          }
          catch (error) {
              console.log("Not authenticated")
          }
        }) ()
  }, [])

  useEffect(() => {
    (async () => {
        try {
            const response = await httpClient.get(`//localhost:5555/users/${user.id}`)
            setUserData(response.data)
        }
        catch (error) {
            console.log("Not authenticated")
        }
      }) ()
  }, [user])

  if(user){
    console.log(user)
  }
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
            <Route exact path="/Search">
              <Search
                SearchSetter = {SearchSetter}
                handleSearch = {handleSearch}
                bookS = {bookS}
                search = {search}
              />
            </Route>
          </Switch>
      </ThemeContextProvider>
    </div>
  );
}

export default App;
