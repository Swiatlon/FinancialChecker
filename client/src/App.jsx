import React from 'react';
import { ThemeProvider } from 'styled-components';
import Layout from './layouts/MainLayout/MainLayout';
import theme from './assets/theme/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout />
    </ThemeProvider>
  );
}
export default App;
