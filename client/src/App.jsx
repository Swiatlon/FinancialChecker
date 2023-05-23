import React, { createContext, useEffect, useRef } from 'react';
import { ThemeProvider } from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { alertForSleepingServer, alertForServerAwake } from './helpers/Alerts/Swal';
import { useWakeUpMutation } from './features/wakingUpServer/wakingUpServerSlice';
import Layout from './layouts/MainLayout/MainLayout';
import theme from './assets/theme/theme';
import CustomClassesStyle from './assets/styles/CustomClasses.style';

export const ThemeUpdateContext = createContext();

function App() {
  // On Render.IO we wakeup our hosting backend cause he's falling asleep every 15 minutes due to free hosting
  const [wakeUp] = useWakeUpMutation();
  const effectRan = useRef(false);

  useEffect(() => {
    // React 18 Strict Mode trick to avoid double rendering
    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
      let serverIsSleeping = false;
      const alertInstance = alertForSleepingServer;
      // If server takes more than 3 second to respond we show alert
      const timer = setTimeout(() => {
        alertInstance(theme.colors.neonColor);
        serverIsSleeping = true;
      }, 3000);

      wakeUp()
        .unwrap()
        .then(() => {
          clearTimeout(timer);
          if (serverIsSleeping) alertForServerAwake();
          return true;
        });
    }

    return () => (effectRan.current = true);
  }, []);

  // React
  const navigate = useNavigate();
  const location = useLocation();

  const setAppDesignColor = async (newColor) => {
    theme.colors.neonColor = newColor;
    navigate(location.pathname); // we refresh route due to change of styles
  };

  return (
    <ThemeUpdateContext.Provider value={setAppDesignColor}>
      <ThemeProvider theme={theme}>
        <CustomClassesStyle />
        <Layout />
      </ThemeProvider>
    </ThemeUpdateContext.Provider>
  );
}
export default App;
