import {useContext, useEffect,useState } from "react";
import "../App.css";
import SyncLoader from "react-spinners/ClockLoader";
import { Link,useParams } from "react-router-dom";
import UserTweets from "./userTweets"


export default function TweetPage() {

    const [loading1, setLoading1] = useState(true);
    const [user, setUser] = useState({});
    
    const page = useParams();
    // console.log("page.id",page.postId)
    // console.log("user",user)
    // console.log("tweet loading",loading)

    useEffect(() => {
        const fetchData = async () => {
        
            try {
                const response = await fetch(`${process.env.REACT_APP_API}/users/listone?id=${page.userId}&api_key=${process.env.REACT_APP_API_KEY}`);
                // console.log("response",response)
                if (!response.ok) {
                    throw new Error(`Request failed, status: ${response.status}`);
                }
                const data = await response.json();
                console.log("data user",data)
                setUser(data.user);
                setLoading1(false)
                // console.log("data.user",data.user)
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
        {loading1 ? (
            <SyncLoader
                color="white"
                cssOverride={{ margin: "40vh auto" }}
                loading
                size={90}
            />
        ) : ( 
        <>
{user.hobbies && user._id && page.userId && (
<section className="App_body" key={user._id}>
<ul><Link className="back-button" to="/" onClick={()=>setLoading1(true)} >Back to homepage</Link></ul>
    <div className="App_space">
        <div className="body_elements">
            <div className="selected-user-container" id={user._id}>
                <img id="userpageImg" src={user.image} alt=""/>
                <div className="user-info">
                    <span className="user-span-name" id={page.postId}>{user.username}</span>
                    <span><strong>Gender:</strong> {user.gender}</span>
                    <span><strong>Age:</strong> {user.age}</span>
                    <span><strong>Country:</strong> {user.country}</span>
                    <span><strong>City:</strong> {user.city}</span>
                    <span><strong>Email:</strong> {user.email}</span>
                    <span><strong>Hobbies:</strong> {user.hobbies.map((item,idx)=> {
                        return (<>
                        <span id={idx}>{item} {idx !== user.hobbies.length - 1 && ","} </span>
                        </>)
                        })}
                    </span>        
                </div>
                <div className="empty-div">
                </div>
            </div>
            <hr/>
            <br/>
            {page.userId && <UserTweets setLoading1 ={setLoading1} loading1 ={loading1} userId={page.userId}/>}
        </div>
    </div>
</section>
)}
</>
)}
    </>
    )}