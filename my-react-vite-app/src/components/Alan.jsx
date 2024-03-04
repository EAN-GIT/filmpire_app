import alanBtn from '@alan-ai/alan-sdk-web';
import React, { useContext, useEffect } from 'react';

import { ColorModeContext } from '../utils/ToggleColorMode';

// alan is not a component its a custom hook...so its doesnt return ny thing

const useAlan = () => {
  const { setMode } = useContext(ColorModeContext);

  useEffect(() => {
    alanBtn({
      key: 'b56e87b57b0cd7ee4e9f48947d327f0e2e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: ({ command, mode }) => {
        if (command === 'changeMode') {
          // Call the client code that will react to the received command
          if (mode === 'light') {
            setMode('light');
          } else {
            setMode('dark');
          }
        }
      }
    });
  }, []);
};

export default useAlan;
