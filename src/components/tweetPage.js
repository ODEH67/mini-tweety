import {useContext, useEffect,useState } from "react";
import "../App.css";
import SyncLoader from "react-spinners/ClockLoader";
import {APIContext} from './APIFetch';
import DateCorrector from './DateCorrector';
import { NavLink,useParams } from "react-router-dom";


export default function TweetPage() {

    const {setTweet,tweet, setLoading,loading} = useContext(APIContext);

    const [loading2, setLoading2] = useState(true);
    const page = useParams();

    // console.log("page.id",page.postId)
    // console.log("tweet tweeet",tweet)
    // console.log("tweet loading",loading)


    useEffect(() => {
        const fetchData = async () => {
        
            try {
                const response = await fetch(`${process.env.REACT_APP_API}/posts/listone?id=${page.postId}&api_key=${process.env.REACT_APP_API_KEY}`);
                // console.log("response",response)
                if (!response.ok) {
                    throw new Error(`Request failed, status: ${response.status}`);
                }
                const data = await response.json();
                // console.log("data.post",data.post)
                setTweet(data.post);
                setLoading2(false)
                console.log("data.post",data.post)
            } catch (error) {
                console.log(error);
                }
            };
            fetchData()
        }, []);


    // useEffect(() => {
    //     const ClickedTweet = api.posts.find((Item) => Item._id === page.id);
    //     setTweet(ClickedTweet);
    //     }, [api,page.id]);


    return (
        <>
        { loading2 ? (
            <SyncLoader
                color="white"
                cssOverride={{ margin: "40vh auto" }}
                loading
                size={90}
            />
        ) : tweet && tweet._id ? ( 
        <>
<section className="App_body" key={tweet._id}>
    <ul>
    <NavLink className="back-button" to="/"  >Back to homepage</NavLink>
    </ul>
    <div className="App_space">

        <div className="body_elements"> 
        <div className="twitty-container" key={tweet._id} id={tweet._id}>
            <NavLink  className="tweet-user" to={`/user/${tweet.owner._id}`}>
            <img src={tweet.owner.image} alt=""/>
            <span className="username-span" id={tweet.owner._id} >{tweet.owner.username}</span>
            </NavLink>
            <h2>{tweet.text}</h2>
            
            <br/>
            <span className="time-span"><DateCorrector date={tweet.date}/></span>
            <hr/>
            <ul className="like-comment-share">
                <li>Likes</li>
                <li>Comments</li>
                <li>Share</li>
            </ul>
        </div>
        </div>
    </div>
</section>
</>
) : null}
    </>
    )}