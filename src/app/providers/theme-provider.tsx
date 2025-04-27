import React, { FC } from 'react';
import { ComponentWithChildren } from '@shared/types';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import '../assets/styles/global-styles.css';
import { theme } from '@app/assets/styles/theme';

export const ThemeProvider: FC<ComponentWithChildren> = ({ children }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
