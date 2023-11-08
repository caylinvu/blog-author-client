import { DateTime } from 'luxon';
import { useParams, useOutletContext } from 'react-router-dom';
// import Comments from './Comments';

function PostDetail() {
  const { posts } = useOutletContext();
  const { postId } = useParams();

  return (
    <div className="post-detail">
      {posts
        .filter((obj) => obj._id === postId)
        .map((obj) => {
          return (
            <div key={obj._id} className="post">
              <h1>{obj.title}</h1>
              <p>
                {DateTime.fromISO(obj.timestamp).toLocaleString(DateTime.DATETIME_MED)} || by{' '}
                {obj.author.first_name} {obj.author.last_name}
              </p>
              <p>{obj.text}</p>
            </div>
          );
        })}
      {/* <Comments /> */}
    </div>
  );
}

export default PostDetail;
