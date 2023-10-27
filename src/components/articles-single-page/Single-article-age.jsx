import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react'
import { getArticleById, getCommentsByArticleId, patchArticle, postCommentOnArticle, deleteComment } from '../../axios'
import { CommentsSection } from "./Comments-Section";
function SingleArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([{}]);
  const [disableIncrementUpVotes, setdisableIncrementUpVotes] = useState(false);
  const [disableIncrementDownVotes, setdisableIncrementDownVotes] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      const { data: { article } } = await getArticleById(article_id);
      setArticle(article);
      setLoading(false);
    };

    fetchArticle();
  }, [article_id]);

  const incrementVote = async (inc_votes) => {
    try {
      if (inc_votes === 1) {
        setdisableIncrementUpVotes(true);
        setdisableIncrementDownVotes(false);
      } else if (inc_votes === -1) {
        setdisableIncrementDownVotes(true);
        setdisableIncrementUpVotes(false);
      }

      const result = await patchArticle(article_id, inc_votes);

      setArticle(result.data.article);
      setError(false);
    } catch (error) {
      setError(true);
      if (inc_votes === 1) {
        setdisableIncrementUpVotes(false);
      } else if (inc_votes === -1) {
        setdisableIncrementDownVotes(false);
      }
    }
  };

  return (
    loading ? <h2>Loading...</h2> :
    <>
      <div className='display-single-article'>
        <h2>{article.title}</h2>
        <p>Written by: {article.author}</p>
        <img className='display-single-article-image' src={article.article_img_url} alt={article.title} />
        <p className='article-body'>{article.body}</p>
        <div className='article-info'>
          <div>
            <p>Votes: {article.votes}  </p>
            {error && <p>Sorry, vote failed!</p>}
            <button disabled={disableIncrementUpVotes} onClick={() => incrementVote(1)}>👍</button>
            <button disabled={disableIncrementDownVotes} onClick={() => incrementVote(-1)}>👎</button>
          </div>
          <p>Topic: {article.topic} </p>
          <p>Date: {article.created_at.slice(0,10)}</p>
        </div>
      </div>
      <CommentsSection setComments={setComments} article_id={article_id} comments={comments}/>
    </>
  );
}



export default SingleArticlePage