import PropTypes from 'prop-types';

function Logout({ handleLogout }) {
  return (
    <button className="logout" onClick={handleLogout}>
      Logout
    </button>
  );
}

Logout.propTypes = {
  handleLogout: PropTypes.func,
};

export default Logout;
