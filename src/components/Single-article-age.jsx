import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react'
import { getArticleById, getCommentsByArticleId } from '../axios'
function SingleArticlePage() {
    const { article_id } = useParams();
    const [article, setArticle] = useState({});
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([{}]);
  
    useEffect(() => {
      const fetchArticle = async () => {
        const { data: { article } } = await getArticleById(article_id);
        setArticle(article);
        setLoading(false);
      };
  
      fetchArticle();
    }, [article_id]);
  
    return (
      loading ? <h2>Loading...</h2> :
      <>
        <div className='display-single-article'>
          <h2>{article.title}</h2>
          <p>Written by: {article.author}</p>
          <img className='display-single-article-image' src={article.article_img_url} alt={article.title} />
          <p className='article-body'>{article.body}</p>
          <div className='article-info'>
                        <p>Votes: {article.votes}  </p>
                        <p>Topic: {article.topic} </p>
                        <p>Date: {article.created_at.slice(0,10)}</p>
                    </div>
        </div>
        <CommentsSection setComments={setComments} article_id={article_id} comments={comments}/>
      </>
    );
  }


function CommentsSection({setComments, article_id, comments}) {
    const [commentsLoaded, setCommentsLoaded] = useState(false)
    const displayAllComments = async () => {
        const {data : {comments}} = await getCommentsByArticleId(article_id)
        setCommentsLoaded(true)
        setComments(comments)
    }
    return (
        !commentsLoaded ?
          <button onClick={displayAllComments}>View Comments</button>
          :
          <>
          <button onClick={() => setCommentsLoaded(false)}>Hide Comments </button> 
          <div className="comments-container">
          {comments.map((comment) => {
              return (
                  <div className='comment' key={comment.comment_id}>
                  <p>{comment.body}</p>
                 <div className="comment-info">
                    <p>{comment.author}</p>
                    <p>Votes: {comment.votes}</p>
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