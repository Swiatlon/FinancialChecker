import React, { createContext } from 'react';
import { ThemeProvider } from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from './layouts/MainLayout/MainLayout';
import theme from './assets/theme/theme';

export const ThemeUpdateContext = createContext();

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const setAppDesignColor = (color) => {
    theme.colors.neonColor = `${color}`;
    navigate(location.pathname); // we refresh route due to change of styles
  };

  return (
    <ThemeUpdateContext.Provider value={setAppDesignColor}>
      <ThemeProvider theme={theme}>
        <Layout />
      </ThemeProvider>
    </ThemeUpdateContext.Provider>
  );
}
export default App;
