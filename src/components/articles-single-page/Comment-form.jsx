import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react'
import { getArticleById, getCommentsByArticleId, patchArticle, postCommentOnArticle, deleteComment } from '../../axios'



export function CommentForm({article_id, setComments, comments, setCommentFormVisible, errorPostingComment, setErrorPostingComment, setCommentsVisible, loadingComments, setLoadingComments}) {
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