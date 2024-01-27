
import './components/Style.css';

import {useState } from "react";
import { NavLink } from "react-router-dom";
import {Routes, Route } from "react-router-dom";
import MainPage from "./components/mainPage";
import UserPage from "./components/userPage";
import AllUsers from "./components/allUsers";
import TweetPage from "./components/tweetPage";
import Searchbar from "./components/searchbar";
import SearchPage from "./components/searchpPage";


function App() {


  return (
    <div >
      <header className='header'>
      <NavLink to="/">
      <h3>mini twitty</h3>
      </NavLink>
      <NavLink to={`/users/`}>
      <h3>All users</h3>
      </NavLink>
      <Searchbar/>
      </header>
      <main className='main-div'>
      <div className="sidebar-container">
        <div className="sidebar-content">
          <img src={{}}/>
          <h3>Uncle Phil</h3>
            <ul>
                <li>Country: USA</li>
                <li>State: Philadelphia</li>
                <li>Messages:</li>
            </ul>
            </div>
          <button className='btn-sign-out'>Sign Out</button>
        </div>
        
      <Routes>
        <Route  path="/" element={<MainPage/>} />
        <Route  path="/post/:postId" element={<TweetPage/>} />
        <Route  path="/user/:userId" element={<UserPage/>} />
        <Route  path="/search/:searchValue" element={<SearchPage/>} />
        <Route  path="/users/" element={<AllUsers/>} />
        <Route  path="*" element={<h1 className="not-found">Error 404 page Not Found</h1>}/>
      </Routes>
      </main>
    </div>
  );
}

export default App;
