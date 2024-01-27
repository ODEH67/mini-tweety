import {createContext, useEffect,useState } from "react";



export const APIContext = createContext({

    // setTweet :() => {},
    // tweet : {},
    // loading : true,
    // setLoading : () => {}
})


export default function APIFetch({children}) {

    const [loading, setLoading] = useState(true);
    const [api, setApi] = useState({});
    const [allUsers, setAllUsers] = useState({});
    const [tweet, setTweet] = useState({});
    const [apiSearch, setApiSearch] = useState({});
    const [MyUser, setMyUser] = useState({});
    const [searchedQuery, setSearchedQuery] = useState("");

    console.log("api",api)
    console.log("tweet api",tweet)


    useEffect(() => {
const DataFetch = async () => {

    try {
        const response = await fetch(`${process.env.REACT_APP_API}/posts/list?api_key=${process.env.REACT_APP_API_KEY}`);
        if (!response.ok) {
            throw new Error(`Request failed, status: ${response.status}`);
        }
        const data = await response.json();
        setLoading(false)
        setApi(data);
        // console.log("data",data)
    } catch (error) {
		console.log(error);
		}
	};
    DataFetch()
}, []);


    return (
        <APIContext.Provider value={{api,loading,tweet,setTweet,setApiSearch,apiSearch,searchedQuery,setSearchedQuery,setAllUsers,allUsers,MyUser,setMyUser}}>
            {children}
    </APIContext.Provider>
    )
}