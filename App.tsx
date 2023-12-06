import React from "react";
import { createTheme, ThemeMode, ThemeProvider } from "@rneui/themed";
import { useColorScheme, View } from "react-native";
import Main from "./src/screens/Main";
import * as Yup from 'yup';
import { pt } from "yup-locale-pt";

Yup.setLocale(pt);

const App = () => {
  theme.mode = useColorScheme() as ThemeMode;

  return (
    <ThemeProvider theme={theme}>
      <Main />
    </ThemeProvider>
  );
}

export const iconType = 'font-awesome-5';
export const errorMessageColor = '#e10';

const theme = createTheme({
  lightColors: {},
  darkColors: {
    background: '#252526',
  },
  components: {
    Input: (props, theme) => ({
      containerStyle: {
        paddingHorizontal: 0,
      },
      inputContainerStyle: {
        borderWidth: 1,
        borderRadius: 3,
        paddingHorizontal: 8,
        backgroundColor: theme.colors.background,
        borderColor: props.renderErrorMessage || (props.errorMessage != null && props.errorMessage.length > 0) ? errorMessageColor : theme.colors.black,
      },
      labelStyle: {
        color: theme.colors.black,
        paddingBottom: 3,
      },
      inputStyle: {
        color: props.renderErrorMessage || (props.errorMessage != null && props.errorMessage.length > 0) ? errorMessageColor : theme.colors.black,
      },
      leftIconContainerStyle: {
        paddingRight: props.leftIcon ? 8 : 0,
      },
      leftIcon: props.leftIcon ? { type: iconType, color: props.renderErrorMessage || (props.errorMessage != null && props.errorMessage.length > 0) ? errorMessageColor : theme.colors.black } : undefined,
      errorStyle: {
        padding: 0,
        paddingVertical: 0,
        paddingHorizontal: 0,
        height: props.renderErrorMessage || (props.errorMessage != null && props.errorMessage.length > 0) ? 'auto' : 0,
        color: props.renderErrorMessage || (props.errorMessage != null && props.errorMessage.length > 0) ? errorMessageColor : theme.colors.black,
      }
    }),
    Button: (props, theme) => ({
      containerStyle: {
        paddingHorizontal: 0,
        marginBottom: 10,
      },
      buttonStyle: {
        borderRadius: 3,
        padding: 10,
      },
      icon: props.icon ? { type: iconType, color: theme.mode === 'dark' ? theme.colors.black : theme.colors.white } : undefined
    })
  }
});

export default App;