import PropTypes from 'prop-types';

function PostForm({ handleSubmit, title, setTitle, text, setText }) {
  return (
    <form className="post-form" onSubmit={handleSubmit}>
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
  );
}

PostForm.propTypes = {
  handleSubmit: PropTypes.func,
  title: PropTypes.string,
  setTitle: PropTypes.func,
  text: PropTypes.string,
  setText: PropTypes.func,
};

export default PostForm;
