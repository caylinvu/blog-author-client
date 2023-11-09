import { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const { updatePosts, setUpdatePosts, token } = useOutletContext();
  const navigate = useNavigate();

  const handlePublish = async (isPublished) => {
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
      handlePublish(false);
    } else if (submitType === 'publish') {
      handlePublish(true);
    }
  };

  return (
    <div className="create-post">
      <h2>Create Blog Post</h2>
      <form className="create-post-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="title"
            name="title"
            id="title"
            maxLength={60}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="text">Text</label>
          <textarea
            name="text"
            id="text"
            rows={15}
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
        <div className="form-btns">
          <button type="submit" value="save">
            Save to Drafts
          </button>
          <button type="submit" value="publish">
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;

// figure out if want to keep two submit buttons or switch to checkbox for publish
