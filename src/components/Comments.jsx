import { DateTime } from 'luxon';
import { useState, useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';

function Comments() {
  const { comments, updateComments, setUpdateComments, token } = useOutletContext();
  const { postId } = useParams();
  const [postComments, setPostComments] = useState([]);

  useEffect(() => {
    setPostComments(comments.filter((obj) => obj.post === postId));
  }, [comments, postId]);

  const deleteComment = async (commentId) => {
    try {
      const response = await fetch(
        'https://blog-api-production-7f4c.up.railway.app/api/posts/' +
          postId +
          '/comments/' +
          commentId,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.status === 200) {
        setUpdateComments(!updateComments);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="comment-container">
      <h2>Comments</h2>
      {postComments.length > 0 ? (
        postComments.map((obj) => {
          return (
            <div key={obj._id} className="comment">
              <div className="comment-section">
                <p>{obj.text}</p>
                <button type="button" onClick={() => deleteComment(obj._id)}>
                  <img src="/trash.svg" alt="" />
                </button>
              </div>
              <p>@{obj.display_name}</p>
              <p>{DateTime.fromISO(obj.timestamp).toLocaleString(DateTime.DATETIME_MED)}</p>
            </div>
          );
        })
      ) : (
        <div className="no-comments">No comments yet</div>
      )}
    </div>
  );
}

export default Comments;
