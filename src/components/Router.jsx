import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import PreviewContainer from './PreviewContainer';
import PostDetail from './PostDetail';
import CreatePost from './CreatePost';

function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        { path: '/', element: <PreviewContainer /> },
        { path: '/create-post', element: <CreatePost /> },
        { path: '/post/:postId', element: <PostDetail /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default Router;
