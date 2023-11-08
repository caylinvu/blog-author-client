import { DateTime } from 'luxon';
import { useState, useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';

function Comments() {
  const { comments } = useOutletContext();
  const { postId } = useParams();
  const [postComments, setPostComments] = useState([]);

  useEffect(() => {
    setPostComments(comments.filter((obj) => obj.post === postId));
  }, [comments, postId]);

  return (
    <div className="comment-container">
      <h2>Comments</h2>
      {postComments.length > 0 ? (
        postComments.map((obj) => {
          return (
            <div key={obj._id} className="comment">
              <p>{obj.text}</p>
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
