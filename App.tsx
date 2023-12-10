import 'react-native-gesture-handler';
import { createTheme, ThemeMode, ThemeProvider } from "@rneui/themed";
import { useColorScheme } from "react-native";
import * as Yup from 'yup';
import { pt } from "yup-locale-pt";

import Routes from '@navigation/routes';
import { useEffect, useState } from 'react';
import { useStorage } from '@hooks/Storage';

Yup.setLocale(pt);

export default function App() {
  const { storageService } = useStorage();

  const [ isLoading, setIsLoading ] = useState(true);
  
  const defaultMode = useColorScheme() as ThemeMode;
  useEffect(() =>{
    storageService.getItem<ThemeMode>("theme.mode").then(mode =>{
      theme.mode = mode || defaultMode;
  
      setIsLoading(false);
    })
  }, []);

  return !isLoading && (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}

declare module '@rneui/themed' {
  export interface Colors {
    foreground: string;
  }
}

export const iconType = 'font-awesome-5';
export const errorMessageColor = '#e10';

const theme = createTheme({
  lightColors: {
    foreground: '#fff',
  },
  darkColors: {
    foreground: '#fff',
    background: '#222',
  },
  components: {
    Text: (props, theme) => ({
      style: {
        marginBottom: theme.spacing.lg,
      }
    }),
    Input: (props, theme) => ({
      containerStyle: {
        paddingHorizontal: 0,
      },
      inputContainerStyle: {
        borderWidth: 1,
        borderRadius: 3,
        paddingHorizontal: theme.spacing.lg,
        backgroundColor: theme.colors.background,
        borderColor: props.renderErrorMessage || !!props.errorMessage ? errorMessageColor : theme.colors.black,
      },
      labelStyle: {
        color: theme.colors.black,
        paddingBottom: theme.spacing.md,
      },
      inputStyle: {
        color: props.renderErrorMessage || !!props.errorMessage ? errorMessageColor : theme.colors.black,
      },
      leftIconContainerStyle: {
        paddingRight: props.leftIcon ? theme.spacing.lg : 0,
      },
      leftIcon: props.leftIcon ? { type: iconType, color: props.renderErrorMessage || !!props.errorMessage ? errorMessageColor : theme.colors.black } : undefined,
      errorStyle: {
        padding: 0,
        paddingVertical: 0,
        paddingHorizontal: 0,
        height: props.renderErrorMessage || !!props.errorMessage ? 'auto' : 0,
        color: props.renderErrorMessage || !!props.errorMessage ? errorMessageColor : theme.colors.black,
      }
    }),
    Button: (props, theme) => ({
      containerStyle: {
        paddingHorizontal: 0,
        marginBottom: theme.spacing.lg,
      },
      buttonStyle: {
        borderRadius: 3,
        padding: theme.spacing.lg,
      },
      icon: props.icon ? { type: iconType, color: theme.mode === 'dark' ? theme.colors.black : theme.colors.white } : undefined
    })
  }
});
