import React, {Fragment, useState, useEffect} from './node_modules/react';
import axios from './node_modules/axios';

const Main = () => {

    const BASE_URL = 'https://hn.algolia.com/api/v1/search';

    const [data, setData] = useState({hits: []});
    const [query, setQuery] = useState('');
    const [url, setUrl] = useState(`${BASE_URL}?query=${query}`)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios({url});
            setData(result.data);
        };
        fetchData()
    },[url]);

    return(
        <Fragment>
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