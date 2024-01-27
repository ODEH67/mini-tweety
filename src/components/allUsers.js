import {useContext, useEffect,useState } from "react";
import SyncLoader from "react-spinners/ClockLoader";
import {APIContext} from './APIFetch';
import { NavLink,useParams } from "react-router-dom";


export default function MainPage() {

    // const {loading,setLoading} = useContext(APIContext);
    const [loading4, setLoading4] = useState(true);
    const [counter, setcounter] = useState(0);
    const [allUsers, setAllUsers] = useState({});

    useEffect(() => {
        const DataFetch = async () => {
        
            try {
                const response = await fetch(`${process.env.REACT_APP_API}/users/list?api_key=${process.env.REACT_APP_API_KEY}`);
                if (!response.ok) {
                    throw new Error(`Request failed, status: ${response.status}`);
                }
                const data = await response.json();
                setAllUsers(data);
                setcounter(data.total)
                setLoading4(false)
                console.log(" setAllUsers data",data)
            } catch (error) {
                console.log(error);
                }
            };
            DataFetch()
        }, []);
        


    return (
        <>
        {loading4 ? (
            <SyncLoader
                color="white"
                cssOverride={{ margin: "40vh auto" }}
                loading
                size={90}
            />
        ) : ( 
            <>
    <section className="App_body">
        <ul>
        <NavLink className="back-button" to="/" >Back to homepage</NavLink>    
        </ul>
        {/* <div>Users online: ({counter})</div> */}
        <div className="App_space">
            <div className="body_elements">
            {allUsers.users && allUsers.users.map((user, indx) => {
            return (
                <div className="selected-user-container" id={user._id}>
                    <NavLink className="tweet-user" to={`/user/${user._id}`}>
                    <img id="userpageImg" src={user.image} alt=""/>
                    </NavLink>
                    <div className="user-info">
                    <NavLink className="tweet-user" to={`/user/${user._id}`}>
                        <span className="user-span-name" >{user.username}</span>
                        </NavLink>
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
            );
        })}
            </div>
        </div>
        <ul>
        <div className="Users-counter">Users online: ({counter})</div>
        </ul>
</section>
</>
)}
</>
);}