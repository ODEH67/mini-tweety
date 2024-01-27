import {useContext, useEffect,useState } from "react";

import './Style.css';
import SyncLoader from "react-spinners/ClockLoader";
import {APIContext} from './APIFetch';
import DateCorrector from './DateCorrector';
import { NavLink,useParams } from "react-router-dom";
import TweetBox from "./Tweeting-box";


export default function MainPage() {

    const {api,loading} = useContext(APIContext);



    return (
<>

    {loading ? (
        <SyncLoader
            color="white"
            cssOverride={{ margin: "40vh auto" }}
            loading
            size={90}
        />
    ) : (
        <>
        <div className="right-side-twitties">
        <TweetBox/>
        {api && api.posts && api.posts.map((item, idx) => {
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
        )
        }
        </div>
        </>
        )}
</> 
    )}