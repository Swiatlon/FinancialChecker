import React, { createContext } from 'react';
import { ThemeProvider } from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from './layouts/MainLayout/MainLayout';
import theme from './assets/theme/theme';

export const ThemeUpdateContext = createContext();

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const setAppDesignColor = (newColor) => {
    theme.colors.neonColor = newColor;
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
