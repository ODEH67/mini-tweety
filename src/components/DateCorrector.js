import {useContext} from 'react';
import {APIContext} from './APIFetch';


function DateCorrector({date, _id}) {

    const {api,tweet} = useContext(APIContext);
// console.log("dateapi", api);
    const tweetDate = date;
    // console.log("tweetDate",tweet._id)
    const newDate = new Date(tweetDate);


    const formattedDate = newDate.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    });

    return (api && api.posts && api.posts._id ? <div id={api.posts._id}>{formattedDate}</div> : <div id={_id}>{formattedDate}</div>);
}

export default DateCorrector;
