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

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
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
        path: 'postAuth',
        element: <PostAuthLayout />,
        children: [
          { path: 'home', element: <Overview /> },
          { path: 'addnewExpenses', element: <NewExpenses /> },
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
