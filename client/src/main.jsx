import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GlobalStyle from './assets/styles/GlobalStyle';
import ErrorPage from './views/ErrorPage/ErrorPage';
import App from './App';
import PostAuthLayout from './layouts/PostAuthLayout/PostAuthLayout';
import Overview from './views/Overview/Overview';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: 'postAuth', element: <PostAuthLayout />, children: [{ path: 'overview', element: <Overview /> }] },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyle />
    <RouterProvider router={router} />
  </React.StrictMode>,
);
