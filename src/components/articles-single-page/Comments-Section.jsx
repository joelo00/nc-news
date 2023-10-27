import { useParams } from "react-router-dom"
import { useEffect, useState, useContext } from 'react'
import { getArticleById, getCommentsByArticleId, patchArticle, postCommentOnArticle, deleteComment } from '../../axios'
import { CommentForm } from "./Comment-form"
import { UserContext } from '../users/UserContext';
export function CommentsSection({setComments, article_id, comments}) {
    const { user } = useContext(UserContext);
    const [commentsVisible, setCommentsVisible] = useState(false)
    const [commentFormVisible, setCommentFormVisible] = useState(false)
    const [errorPostingComment, setErrorPostingComment] = useState(false)
    const [loadingComments, setLoadingComments] = useState(false)
    const [errorDeletingComment, setErrorDeletingComment] = useState(false)
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
        let displayComments = comments.filter((comment) => comment.comment_id !== comment_id)
        setComments(displayComments)
        setErrorDeletingComment(false);
        try {
          const res = await deleteComment(comment_id);
          setLoadingComments(false);
          setCommentsVisible(true);
          setErrorPostingComment(false);
        } catch (error) {
          setErrorDeletingComment(true);
          setCommentsVisible(false);
          setComments(comments);
        }

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
            {errorDeletingComment && <p>Apologies, your comment could not be deleted</p>}
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
                      {user===comment.author && <button onClick={(e) => {
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