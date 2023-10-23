import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react'
import { getArticleById, getCommentsByArticleId, patchArticle } from '../axios'
function SingleArticlePage() {
    const { article_id } = useParams();
    const [article, setArticle] = useState({});
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([{}]);
    const [incrementVotes, setIncrementVotes] = useState(0)
    const [error, setError] = useState(false)
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
          const result = await patchArticle(article_id, inc_votes);

          setArticle(result.data.article);
          setError(false);
          setIncrementVotes(() => {
            return (incrementVotes + inc_votes);
          });
        } catch (error) {
          setError(true);
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
                        <button disabled={![0, -1].includes(incrementVotes)} onClick={() => incrementVote(1)}>👍</button>
                        <button disabled={![1, 0].includes(incrementVotes)} onClick={() => incrementVote(-1)}>👎</button>

            </div>
                        <p>Topic: {article.topic} </p>
                        <p>Date: {article.created_at.slice(0,10)}</p>
                    </div>
        </div>
        <CommentsSection setComments={setComments} article_id={article_id} comments={comments}/>
      </>
    );
  }


function CommentsSection({setComments, article_id, comments}) {
    const [commentsVisible, setCommentsVisible] = useState(false)
    const displayAllComments = async () => {
        const {data : {comments}} = await getCommentsByArticleId(article_id)
        setCommentsVisible(true)
        setComments(comments)
    }
    return (
        !commentsVisible ?
          <button onClick={displayAllComments}>View Comments</button>
          :
          <>
          <button onClick={() => setCommentsVisible(false)}>Hide Comments </button> 
          <div className="comments-container">
          {comments.map((comment) => {
              return (
                  <div className='comment' key={comment.comment_id}>
                  <p>{comment.body}</p>
                 <div className="comment-info">
                    <p>{comment.author}</p>
                    <div>
                    <p> Votes: {comment.votes}</p>
                    </div>
                    <p>Date: {comment.created_at.slice(0,10)}</p>
                 </div>
                  </div>
                  );
                })}
                
          </div>
          </>
      );
        }
export default SingleArticlePage