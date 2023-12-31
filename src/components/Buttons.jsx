import PropTypes from 'prop-types';
import { useOutletContext, useNavigate } from 'react-router-dom';

function Buttons({ post }) {
  const { token, updatePosts, setUpdatePosts } = useOutletContext();
  const navigate = useNavigate();

  const togglePublish = async (e) => {
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
      if (response.status === 200) {
        setUpdatePosts(!updatePosts);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const navToEdit = (e) => {
    e.preventDefault();
    navigate('/post/' + post._id + '/edit', { state: post });
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        'https://blog-api-production-7f4c.up.railway.app/api/posts/' + post._id,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.status === 200) {
        setUpdatePosts(!updatePosts);
        navigate('/');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="btn-container">
      <button type="button" onClick={togglePublish}>
        {post.isPublished ? 'Unpublish' : 'Publish'}
      </button>
      <button type="button" onClick={navToEdit}>
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
