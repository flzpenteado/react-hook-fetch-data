import React, {Fragment, useState, useEffect} from 'react';
import axios from 'axios';

const Main = () => {

    const BASE_URL = 'https://hn.algolia.com/api/v1/search';

    const [data, setData] = useState({hits: []});
    const [query, setQuery] = useState('');
    const [url, setUrl] = useState(`${BASE_URL}?query=${query}`)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            
            const result = await axios({url});
            setData(result.data);

            setIsLoading(false);
            
        };
        fetchData()
    },[url]);

    return(
        <Fragment>

            <div hidden={!isLoading} >Loading...</div>

            <input type="text" value={query} onChange={e => setQuery(e.target.value)}/>
            <button type="button" onClick={() => setUrl(`${BASE_URL}?query=${query}`)}>Search</button>
            <hr/>
            <ul>
                {data.hits.map(item => 
                    <li key={item.objectID}>
                        <a href={item.url}>{item.title}</a>
                    </li>
                )}
            </ul>


        </Fragment>
    )
}

export default Main;