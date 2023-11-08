import './styles/App.css';
import { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';

function App() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [updatePosts, setUpdatePosts] = useState([]);
  const [updateComments, setUpdateComments] = useState(false);

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
    getPosts();
  }, [updatePosts]);

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
    getComments();
  }, [updateComments]);

  return (
    <>
      <Link to="/">
        <h1 className="header-txt">Blog4Cats (Author)</h1>
      </Link>
      <Outlet
        context={{
          posts,
          comments,
          updatePosts,
          setUpdatePosts,
          updateComments,
          setUpdateComments,
        }}
      />
    </>
  );
}

export default App;

// Create login page!!!
// -- IF no user logged in, show login page
// -- IF user is logged in, show outlet routes

// Add way to update posts

// Add button to easily publish/unpublish

// Add way to add new posts

// Add ability to delete comments
