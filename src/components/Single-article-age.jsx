import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react'
import { getArticleById, getCommentsByArticleId, patchArticle, postCommentOnArticle, deleteComment } from '../axios'

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
            setIncrementVotes(() => {
              return (incrementVotes + inc_votes);
            });
          const result = await patchArticle(article_id, inc_votes);

          setArticle(result.data.article);
          setError(false);
        } catch (error) {
          setError(true);
          setIncrementVotes(() => {
            return (incrementVotes - inc_votes);
          });
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
    const [username, setUsername] = useState('jessjelly')
    const [commentsVisible, setCommentsVisible] = useState(false)
    const [commentFormVisible, setCommentFormVisible] = useState(false)
    const [errorPostingComment, setErrorPostingComment] = useState(false)
    const [loadingComments, setLoadingComments] = useState(false)
    const displayAllComments = async () => {
        setLoadingComments(true)
        const {data : {comments}} = await getCommentsByArticleId(article_id)
        setLoadingComments(false)
        setCommentsVisible(true)
        setComments(comments)
        setErrorPostingComment(false)
    }

    const addComment = () => {
        setCommentFormVisible(true)
        setErrorPostingComment(false)
    }

    const removeComment = async(comment_id) => {
        const res = await deleteComment(comment_id)
        const {data : {comments}} = await getCommentsByArticleId(article_id)
        setLoadingComments(false)
        setCommentsVisible(true)
        setComments(comments)
        setErrorPostingComment(false)

    }
    return (
        <>
          {!commentsVisible ? (
            <>
              <button onClick={displayAllComments}>View Comments</button>
              {!commentFormVisible && <button onClick={addComment}>➕ </button>}
              {commentFormVisible && <CommentForm article_id={article_id} setComments={setComments} comments={comments} setCommentFormVisible={setCommentFormVisible} errorPostingComment={errorPostingComment} setErrorPostingComment={setErrorPostingComment} setCommentsVisible={setCommentsVisible} setLoadingComments={setLoadingComments} />}
            </>
          ) : (!loadingComments ?
            <>
              <button onClick={() => setCommentsVisible(false)}>Hide Comments </button> 
            {!commentFormVisible && <button onClick={addComment}>➕ </button>}
            {commentFormVisible && <CommentForm article_id={article_id} setComments={setComments} comments={comments} setCommentFormVisible={setCommentFormVisible} errorPostingComment={errorPostingComment} setErrorPostingComment={setErrorPostingComment} setCommentsVisible={setCommentsVisible} setLoadingComments={setLoadingComments} />}
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
                      {username===comment.author && <button onClick={(e) => {
                        e.currentTarget.disabled=true
                        let {comment_id} = comment
                        removeComment(comment_id)}}>❌</button>} 
                    </div>
                  );
                })}
              </div>
            </>
            : <h2>Loading Comments ...</h2>
          )}
        </>
      );
    }

function CommentForm({article_id, setComments, comments, setCommentFormVisible, errorPostingComment, setErrorPostingComment, setCommentsVisible, loadingComments, setLoadingComments}) {
    const [userInput, setUserInput] = useState('')
    
    const handleSubmitComment = async (e) => {
        try {
          e.preventDefault();
          setLoadingComments(true)
          const {data:{comment}} = await postCommentOnArticle(article_id, userInput);
          const {data : {comments}} = await getCommentsByArticleId(article_id)
          setLoadingComments(false)
          setComments(comments);
          setCommentFormVisible(false);
          setErrorPostingComment(false)
          setCommentsVisible(true)
        } catch (error) {
          setErrorPostingComment(true)
        }
      };

    return (
        !errorPostingComment ? 
        <form className="comment-form-container" onSubmit={handleSubmitComment}>
            <label value={userInput} htmlFor="comment"></label>
            <input className='comment-form-input' required type="text" value={userInput} onChange={(e) => {
                const{target : {value}} = e
                setUserInput(value)
        

            }} placeholder="add comment" id="comment" />
            <button type='submit'>Submit</button>
            <button onClick={() => setCommentFormVisible(false)}>❌ </button>
        </form> : <p>Apologies, your comment could not be posted</p>
    )
}
export default SingleArticlePage