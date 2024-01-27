import {useContext, useEffect,useState } from "react";
import './Style.css';
import SyncLoader from "react-spinners/ClockLoader";
import {APIContext} from './APIFetch';
import { NavLink,useParams,useNavigate,useLocation  } from "react-router-dom";
import { BiSearch } from 'react-icons/bi'



export default function Searchbar() {

    const {apiSearch,setApiSearch,searchedQuery,setSearchedQuery} = useContext(APIContext);

    // const [apiSearch, setApiSearch] = useState({});
    // const [loading5, setLoading5] = useState(true);
    console.log("apiSearch",apiSearch)
    // console.log("loading5",loading5)


    // it seems only text value is working in this api
    const search_Values = ["text", "date", "user"]

    const navigate = useNavigate();
    // const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
        
            try {
                const response = await fetch(`${process.env.REACT_APP_API}/posts/search?text=${searchedQuery}&api_key=${process.env.REACT_APP_API_KEY}`);
                // console.log("response",response)
                if (!response.ok) {
                    throw new Error(`Request failed, status: ${response.status}`);
                }
                const data = await response.json();
                setApiSearch(data);
                // setLoading5(false)
                // console.log("data.search",data)
            } catch (error) {
                console.log(error);
                }
            };
            fetchData()
        }, [searchedQuery]);


        function handleSearch (e){
        if(e.key === 'Enter' && searchedQuery.length > 0) {
                navigate(`/search/${searchedQuery}`)
            }
        }

        function handleClickSearch (e){
        if(searchedQuery.length > 0) {
                navigate(`/search/${searchedQuery}`)
            }
        }

return (
<div className="wrap">
    <div className="search">
        <input value={searchedQuery}
        type="text" 
        className="searchQuery" 
        placeholder="Search twitties..." 
        onChange={(e) => {
        setSearchedQuery(e.target.value)
        }}
        onKeyDown={handleSearch}
        />
    <button type="submit" className="searchButton" onClick={handleClickSearch} onKeyDown={handleSearch}>
            <i className="fa fa-search"><BiSearch/></i>
        </button>
    </div>
</div>
)
}
