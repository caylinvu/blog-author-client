import { useState, useEffect } from 'react';
import { useOutletContext, useNavigate, useLocation } from 'react-router-dom';
import PostForm from './PostForm';

function EditPost() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const { updatePosts, setUpdatePosts, token } = useOutletContext();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setTitle(location.state.title);
    setText(location.state.text);
  }, [location.state]);

  const handleEdit = async (isPublished) => {
    try {
      const response = await fetch(
        'https://blog-api-production-7f4c.up.railway.app/api/posts/' + location.state._id,
        {
          method: 'PUT',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: title,
            text: text,
            isPublished: isPublished,
          }),
        },
      );
      if (response.status === 200) {
        setTitle('');
        setText('');
        setUpdatePosts(!updatePosts);
        navigate('/post/' + location.state._id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let submitType = e.nativeEvent.submitter.value;
    if (submitType === 'save') {
      handleEdit(false);
    } else if (submitType === 'publish') {
      handleEdit(true);
    }
  };

  return (
    <div className="edit-post">
      <h2>Edit Blog Post</h2>
      <PostForm
        handleSubmit={handleSubmit}
        title={title}
        setTitle={setTitle}
        text={text}
        setText={setText}
      />
    </div>
  );
}

export default EditPost;
