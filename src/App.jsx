import './styles/App.css';
import { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Login from './components/Login';
import Logout from './components/Logout';

function App() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [updatePosts, setUpdatePosts] = useState(false);
  const [updateComments, setUpdateComments] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem('isLoggedIn')) || false,
  );
  const [token, setToken] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      return;
    } else {
      const hours = 24;
      const createdAt = JSON.parse(localStorage.getItem('createdAt'));
      if (new Date().getTime() - createdAt > hours * 60 * 60 * 1000) {
        handleLogout();
        return;
      }
      setToken(JSON.parse(localStorage.getItem('token')));
      setUser(JSON.parse(localStorage.getItem('user')));
      setIsLoggedIn(JSON.parse(localStorage.getItem('isLoggedIn')));
    }
  }, []);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch('https://blog-api-production-7f4c.up.railway.app/api/posts');
        if (!response.ok) {
          throw new Error(`This is an HTTP error: The status is ${response.status}`);
        }
        const postData = await response.json();
        setPosts(postData);
      } catch (err) {
        setPosts([]);
        console.log(err);
      }
    };
    if (isLoggedIn) {
      getPosts();
    }
  }, [updatePosts, isLoggedIn]);

  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await fetch(
          `https://blog-api-production-7f4c.up.railway.app/api/comments`,
        );
        if (!response.ok) {
          throw new Error(`This is an HTTP error: The status is ${response.status}`);
        }
        const commentData = await response.json();
        setComments(commentData);
      } catch (err) {
        setComments([]);
        console.log(err);
      }
    };
    if (isLoggedIn) {
      getComments();
    }
  }, [updateComments, isLoggedIn]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setToken('');
    setUser('');
    setPosts([]);
    setComments([]);
  };

  return (
    <>
      <div className="header">
        <Link to="/">
          <h1 className="header-txt">Blog4Cats (Author)</h1>
        </Link>
        {isLoggedIn && <Logout handleLogout={handleLogout} />}
      </div>
      {isLoggedIn ? (
        <Outlet
          context={{
            posts,
            comments,
            updatePosts,
            setUpdatePosts,
            updateComments,
            setUpdateComments,
            token,
            user,
          }}
        />
      ) : (
        <Login setToken={setToken} setUser={setUser} setIsLoggedIn={setIsLoggedIn} />
      )}
    </>
  );
}

export default App;

// add error text for login
