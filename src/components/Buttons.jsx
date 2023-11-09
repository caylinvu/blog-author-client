import PropTypes from 'prop-types';
import { useOutletContext } from 'react-router-dom';

function Buttons({ post }) {
  const { token, updatePosts, setUpdatePosts } = useOutletContext();

  const handlePublish = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        'https://blog-api-production-7f4c.up.railway.app/api/posts/' + post._id,
        {
          method: 'PUT',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: post.title,
            text: post.text,
            isPublished: !post.isPublished,
          }),
        },
      );
      const updatedPost = await response.json();
      console.log(updatedPost);
      if (response.status === 200) {
        setUpdatePosts(!updatePosts);
        console.log('SUCCESSFULLY PUBLISHED/UNPUBLISHED');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
  };

  const handleDelete = (e) => {
    e.preventDefault();
  };

  return (
    <div className="btn-container">
      <button type="button" onClick={handlePublish}>
        {post.isPublished ? 'Unpublish' : 'Publish'}
      </button>
      <button type="button" onClick={handleEdit}>
        Edit
      </button>
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

Buttons.propTypes = {
  post: PropTypes.object,
};

export default Buttons;
