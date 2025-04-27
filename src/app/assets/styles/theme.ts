import { createTheme, ThemeOptions } from '@mui/material';

const THEME_OPTIONS: ThemeOptions = {
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    h1: {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '28px',
      fontWeight: 700,
      textTransform: 'none',
      lineHeight: '100%',
    },
    h2: {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '22px',
      fontWeight: 'bold',
      textTransform: 'none',
      lineHeight: '100%',
    },
    subtitle1: {
      fontFamily: 'Nunito, sans-serif',
      fontWeight: 700,
      fontSize: '22px',
      letterSpacing: '5%',
      lineHeight: '100%',
      textTransform: 'none',
    },
    subtitle2: {
      fontSize: '44px',
      lineHeight: '100%',
      fontWeight: 'bold',
    },
  },
  components: {
    MuiFormHelperText: {},
    MuiButton: {
      defaultProps: {
        color: 'success',
      },
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.variant === 'contained' &&
            ownerState.color === 'success' && {
              backgroundColor: theme.palette.success.main,
              color: '#fff',
            }),
          borderRadius: '10px',
        }),
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(16, 16, 16, 0.95)',
          borderRadius: '10px',
        },
      },
    },
  },
  palette: {
    mode: 'dark',
    background: {
      paper: '#373737',
    },
    primary: {
      main: '#FFCD1B',
    },
    secondary: {
      main: '#373737',
    },
    success: {
      main: '#0AB04C',
    },
  },
};
export const theme = createTheme(THEME_OPTIONS);
