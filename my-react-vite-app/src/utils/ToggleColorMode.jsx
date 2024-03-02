import { createTheme, ThemeProvider } from '@mui/material';
import React, { useState } from 'react';
import { useMemo } from 'react';
import { createContext } from 'react';

// Create a context to manage the color mode state
export const ColorModeContext = createContext();

// Component to toggle between light and dark mode
const ToggleColorMode = ({ children }) => {
  const [mode, setMode] = useState('light');
  
  // Memoized theme creation to prevent unnecessary re-renders
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode // Use the current color mode
        }
      }),
    [mode]
  );

  // Function to toggle between mode
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Provide color mode context to children components
  return (
    <ColorModeContext.Provider value={{ mode, setMode, toggleColorMode }}>
     
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ToggleColorMode;
