import { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import PostForm from './PostForm';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const { updatePosts, setUpdatePosts, token } = useOutletContext();
  const navigate = useNavigate();

  const handleNewPost = async (isPublished) => {
    try {
      const response = await fetch('https://blog-api-production-7f4c.up.railway.app/api/posts', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title,
          text: text,
          isPublished: isPublished,
        }),
      });
      if (response.status === 200) {
        setTitle('');
        setText('');
        setUpdatePosts(!updatePosts);
        navigate('/');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let submitType = e.nativeEvent.submitter.value;
    if (submitType === 'save') {
      handleNewPost(false);
    } else if (submitType === 'publish') {
      handleNewPost(true);
    }
  };

  return (
    <div className="create-post">
      <h2>Create Blog Post</h2>
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

export default CreatePost;
