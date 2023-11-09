import { DateTime } from 'luxon';
import { useOutletContext, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Buttons from './Buttons';

function PostContainer() {
  const { posts, user } = useOutletContext();
  const [orderedPosts, setOrderedPosts] = useState([]);

  useEffect(() => {
    const unpublished = posts.filter((obj) => !obj.isPublished);
    const published = posts.filter((obj) => obj.isPublished);
    setOrderedPosts(unpublished.concat(published));
  }, [posts]);

  return (
    <>
      <div className="introduction">
        <h2>
          Hello {user.first_name} {user.last_name}!
        </h2>
        <Link to="/create-post">
          <button type="button">Create New Post</button>
        </Link>
      </div>
      <div className="preview-container">
        {orderedPosts.map((obj) => {
          return (
            <Link to={'/post/' + obj._id} key={obj._id}>
              <div className="post-preview">
                <div className="top">
                  <h2>{obj.title}</h2>
                  <p>{obj.text.slice(0, 100)}...</p>
                </div>
                <div className="bottom">
                  <p>
                    By {obj.author.first_name} {obj.author.last_name}
                  </p>
                  {obj.isPublished ? (
                    <p className="pub-txt">
                      Published{' '}
                      {DateTime.fromISO(obj.timestamp).toLocaleString(DateTime.DATETIME_MED)}
                    </p>
                  ) : (
                    <p className="unpub-txt pub-txt">Unpublished</p>
                  )}
                  <Buttons post={obj} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default PostContainer;
