
import './components/Style.css';

import {useEffect,useContext } from "react";
import { NavLink } from "react-router-dom";
import {Routes, Route } from "react-router-dom";
import MainPage from "./components/mainPage";
import UserPage from "./components/userPage";
import AllUsers from "./components/allUsers";
import TweetPage from "./components/tweetPage";
import Searchbar from "./components/searchbar";
import SearchPage from "./components/searchpPage";
import {APIContext} from './components/APIFetch';


function App() {

  const {MyUser,setMyUser} = useContext(APIContext)

  useEffect(() => {
    const fetchMyUser = async () => {
    
        try {
            const response = await fetch(`${process.env.REACT_APP_API}/users/listone?id=615cefd72b3e8272f6c87510&api_key=${process.env.REACT_APP_API_KEY}`);
            // console.log("response",response)
            if (!response.ok) {
                throw new Error(`Request failed, status: ${response.status}`);
            }
            const data = await response.json();
            console.log("MY user data ✔",data)
            setMyUser(data.user);
            
            // console.log("data.user",data.user)
        } catch (error) {
            console.log(error);
            }
        };
        fetchMyUser()
    }, []);


  return (
    <div >
      <header className='header'>
      <NavLink to="/">
      <h3>mini tweety</h3>
      </NavLink>
      <NavLink to={`/users/`}>
      <h3>All users</h3>
      </NavLink>
      <Searchbar/>
      </header>
      <main className='main-div'>
      <div className="sidebar-container">
        <div className="sidebar-content">
        <NavLink to={`/user/${MyUser._id}`}>
          <img src={MyUser.image} alt=''/>
          </NavLink>
          <h3>{MyUser.username}</h3>
            <ul>
                <li>Country: {MyUser.country}</li>
                <li>City: {MyUser.city}</li>
                <li>Gender: {MyUser.gender}</li>
                <li>Age: {MyUser.age}</li> 
                
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
