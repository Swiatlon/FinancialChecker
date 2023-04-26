import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import GlobalStyle from './assets/styles/GlobalStyle';
import ErrorPage from './views/ErrorPage/ErrorPage';
import App from './App';
import PostAuthLayout from './layouts/PostAuthLayout/PostAuthLayout';
import Overview from './views/Overview/Overview';
import NewExpenses from './views/NewExpenses/NewExpenses';
import Home from './views/Home/Home';
import PreAuthLayout from './layouts/PreAuthLayout/PreAuthLayout';
import Register from './views/Register/Register';
import Login from './views/Login/Login';
import store from './app/store';
import PersistLogin from './components/organisms/PersistLogin/PersistLogin';
import Prefetch from './components/organisms/Prefetch/Prefetch';
import PostAuthHome from './views/PostAuthHome/PostAuthHome';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        // PUBLIC ROUTES
        path: '',
        element: <PreAuthLayout />,
        children: [
          { path: '', element: <Home /> },
          { path: 'home', element: <Home /> },
          { path: 'register', element: <Register /> },
          { path: 'login', element: <Login /> },
        ],
      },
      {
        // PROTECTED ROUTES
        path: 'postAuth',
        element: <PersistLogin />,
        children: [
          {
            element: <Prefetch />,
            children: [
              {
                element: <PostAuthLayout />,
                children: [
                  { path: '', element: <PostAuthHome /> },
                  { path: 'overview', element: <Overview /> },
                  { path: 'addNewExpenses', element: <NewExpenses /> },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
