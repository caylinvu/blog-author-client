import PropTypes from 'prop-types';

function Buttons({ postId, isPublished }) {
  return (
    <div className="btn-container">
      <button>{isPublished ? 'Unpublish' : 'Publish'}</button>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
}

Buttons.propTypes = {
  postId: PropTypes.string,
};

export default Buttons;
