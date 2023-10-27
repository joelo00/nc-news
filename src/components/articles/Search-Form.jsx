import { useEffect, useState } from 'react'
import { getAllArticles, getArticlesByTopic, sortArticles, getArticlesByQuery } from '../../axios'



export function SearchForm({setArticles, setLoading}) {
    const [topic, setTopic] = useState('')
    const [sortBy, setSortBy] = useState('')
    const [order, setOrder] = useState('desc')
    const displayAllArticles = async () => {
        setLoading(true)
        const {data : {articles}} = await getAllArticles()
        setLoading(false)
        setArticles(articles)
    }

      useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
          const {data: {articles}} = await getArticlesByQuery(topic.toLowerCase(), sortBy.toLowerCase(), order.toLowerCase()); 
          setArticles(articles);
          setLoading(false)
        };
        fetchData();
      
      },[topic, sortBy, order])

    return (
        <>
        <form>
            <label htmlFor="search"></label>
            <input type="text" placeholder="search for articles" id="search" />
            <button>Search</button>
        </form>
        <div>
            <button onClick={displayAllArticles}>View All Articles </button>
            <label htmlFor="select">
          <select value={topic}   onChange={(e) => {setTopic(e.target.value)}} id="select">
            <option  value="">
              Select Topic
            </option>
            <option  value="Cooking">
              Cooking
            </option>
            <option  value="Coding">
              Coding
            </option>
            <option  value="Football">
              Football
            </option>
          </select>
        </label>
        <label htmlFor="select">
          <select value={sortBy}   onChange={(e) => {setSortBy(e.target.value)}} id="select">
            <option  value="">
              sort by
            </option>
            <option  value="Author">
              Author
            </option>
            <option  value="Votes">
              Votes
            </option>
         {/*    <option  value="Comment count">
              Comment count
            </option> */}
          </select>
        </label>
        {sortBy && <button onClick={() =>setOrder('asc')}>⇑</button>}
        {sortBy && <button onClick={() => setOrder('desc')}>⇓</button>} 

        </div>
        </>
    )
}