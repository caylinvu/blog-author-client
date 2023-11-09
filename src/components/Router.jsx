import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import PreviewContainer from './PreviewContainer';
import PostDetail from './PostDetail';
import CreatePost from './CreatePost';
import EditPost from './EditPost';

function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        { path: '/', element: <PreviewContainer /> },
        { path: '/create-post', element: <CreatePost /> },
        { path: '/post/:postId', element: <PostDetail /> },
        { path: '/post/:postId/edit', element: <EditPost /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default Router;
