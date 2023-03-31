import React, { createContext, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Layout from './layouts/MainLayout/MainLayout';
import theme from './assets/theme/theme';

export const ThemeUpdateContext = createContext();

function App() {
  const navigate = useNavigate();

  const setAppDesignColor = () => {
    theme.colors.neonColor = 'red';
    navigate('postAuth/overview');
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
