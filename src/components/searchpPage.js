import {useContext, useEffect,useState } from "react";
import "../App.css";
import SyncLoader from "react-spinners/ClockLoader";
import {APIContext} from './APIFetch';
import DateCorrector from './DateCorrector';
import { NavLink,useParams } from "react-router-dom";


export default function SearchPage() {

    const {api,apiSearch,loading,searchedQuery} = useContext(APIContext);
console.log("apiSearch in searchpage",apiSearch)

    return (
<section className="App_body">
<div className="App_space">
    <div className="body_elements">
    {loading ? (
        <SyncLoader
            color="white"
            cssOverride={{ margin: "40vh auto" }}
            loading
            size={90}
        />
    ) : !apiSearch.success ? (
        <>
        {(api && api.posts  && api.posts.length === 0) ? (
        <h1>No twittes found</h1>) : ( api && api.posts && api.posts.map((item, idx) => {
        return (
        <div className="twitty-container" key={item._id} id={item._id}>
            <NavLink className="tweet-user" to={`/user/${item.owner._id}`}>
            <img src={item.owner.image} alt=""/>
            <span className="username-span"  id={item.owner._id} >{item.owner.username}</span>
            </NavLink>
            <NavLink to={`/post/${item._id}`}>
            <h2>{item.text}</h2>
            </NavLink>
            <br/>
            <span><DateCorrector date={item.date}/></span>
            <hr/>
            <ul className="like-comment-share">
                <li>Likes</li>
                <li>Comments</li>
                <li>Share</li>
            </ul>
        </div>
        )}
        ))
        }
        </>
        ) : 
        <>
        {(apiSearch && apiSearch.posts  && apiSearch.posts.length === 0) ? (
        <h1>No twittes found</h1>) : ( apiSearch && apiSearch.posts && apiSearch.posts.map((item, idx) => {
        return (
        <div className="twitty-container" key={item._id} id={item._id}>
            <NavLink className="tweet-user" to={`/user/${item.owner._id}`}>
            <img src={item.owner.image} alt=""/>
            <span className="username-span" id={item.owner._id} >{item.owner.username}</span>
            </NavLink>
            <NavLink to={`/post/${item._id}`}>
            <h2>{item.text}</h2>
            </NavLink>
            <br/>
            <span className="time-span"><DateCorrector date={item.date}/></span>
            <hr/>
            <ul className="like-comment-share">
                <li>Likes</li>
                <li>Comments</li>
                <li>Share</li>
            </ul>
        </div>
        )}
        ))
        }
        </>
    }
    </div>
</div>
</section>
    )}