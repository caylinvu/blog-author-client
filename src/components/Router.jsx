import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import PreviewContainer from './PreviewContainer';
import PostDetail from './PostDetail';

function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        { path: '/', element: <PreviewContainer /> },
        { path: '/post/:postId', element: <PostDetail /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default Router;
