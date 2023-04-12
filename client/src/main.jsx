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
import store from './app/store';

const user = 'Wiercik';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'postAuth',
        element: <PostAuthLayout user={user} />,
        children: [
          { path: 'overview', element: <Overview /> },
          { path: 'newExpenses', element: <NewExpenses /> },
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
