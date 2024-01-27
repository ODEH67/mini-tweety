import {useContext, useEffect,useState } from "react";

import './Style.css';
import SyncLoader from "react-spinners/ClockLoader";
import {APIContext} from './APIFetch';
// import DateCorrector from './DateCorrector';
import { NavLink,useParams } from "react-router-dom";


export default function TweetBox({MyUser,loading5}) {

    const {api} = useContext(APIContext);
    const [TweetText, setTweetText] = useState("");



        const PostData = async () => {
        
            try {
                const response = await fetch(`${process.env.REACT_APP_API}/posts/add?api_key=${process.env.REACT_APP_API_KEY}`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    owner: api.posts[4].owner._id,
                    text: TweetText
                })
                })
                // console.log("response",response)
                if (!response.ok) {
                    throw new Error(`Request failed, status: ${response.status}`);
                }
                const data = await response.json();
                console.log("added post",data)
                
            } catch (error) {
                console.log(error);
                }
            };



        function handleSubmit(event) {
            event.preventDefault();
            PostData();
            setTweetText("")
        }



    return (
<>
    <div className="selected-user-container" >
    
    {loading5 ? (
        <SyncLoader
            color="white"
            cssOverride={{ margin: "auto" }}
            loading
            size={60}
        />
    ) : (
        <>
        <div className="tweet-user">
        <NavLink to={`/user/${MyUser._id}`}>
        <img id="text-box-Img"  src={MyUser.image} alt=""/>
        </NavLink>
        <NavLink to={`/user/${MyUser._id}`}>
        <span>{MyUser.username}</span>
        </NavLink>
        </div>
        </>
        )}
        <div className="tweet-text-box">
            <form onSubmit={handleSubmit}>
                <textarea className="tweet-box"
                    type="text"
                    name="title"
                    value={TweetText}
                    onChange={((e)=> setTweetText(e.target.value) )}>
                </textarea>

                <button type="submit">Post</button>
            </form>
        </div>
        <div className="empty-div">
        </div>
    </div>

    <hr/>
    <br/>
</>
)
}