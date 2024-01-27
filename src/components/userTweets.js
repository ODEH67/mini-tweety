import {useEffect,useState } from "react";
import "../App.css";
// import SyncLoader from "react-spinners/ClockLoader";
import DateCorrector from './DateCorrector';
import { NavLink,useParams } from "react-router-dom";
import SyncLoader from "react-spinners/ClockLoader";


export default function APIFetch({loading1,setLoading1,userId}) {

    const [userTweets, setUserTweets] = useState([]);
    const [Loading3, setLoading3] = useState(true);

    // console.log("userTweets",userTweets)
    // console.log("tweet api",tweet)


    useEffect(() => {
const DataFetch = async () => {

    try {
        const response = await fetch(`${process.env.REACT_APP_API}/posts/listbyuser?user=${userId}&api_key=${process.env.REACT_APP_API_KEY}`);
        if (!response.ok) {
            throw new Error(`Request failed, status: ${response.status}`);
        }
        const data = await response.json();
        setUserTweets(data.posts);
        setLoading3(false)
        console.log("data all tweets user",data.posts)
    } catch (error) {
		console.log(error);
		}
	};
    DataFetch()
}, [userId]);


    return (
        <>
        {Loading3 ? (
            <SyncLoader
                color="white"
                cssOverride={{ margin: "40vh auto" }}
                loading
                size={90}
            />
        ) : ( 
<>
            {/* {console.log("userTweets",userTweets)} */}
        {userTweets && userId && userTweets.map((item, idx) => {
        return (
        <div className="twitty-container" key={item._id} id={item._id}>
            <div className="tweet-user" to={`/user/${item.owner._id}`}>
            <img src={item.owner.image} alt=""/>
            <span className="username-span" id={item.owner._id} >{item.owner.username}</span>
            </div>
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
        )}
        </>
    )}
    </>
    )
}