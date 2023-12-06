import React from "react";
import { createTheme, ThemeMode, ThemeProvider } from "@rneui/themed";
import { useColorScheme } from "react-native";
import Home from "./screens/Home";

const theme = createTheme({
  lightColors: {},
  darkColors: {},
});

export default function App() {
  theme.mode = useColorScheme() as ThemeMode;

  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
}
