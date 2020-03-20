import "./App.css";
import React from "react";

import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

import { HistoryContainer } from "./history-container/HistoryContainer";

/**
 * Created custom theme for overriding ui material default values
 */
const theme = createMuiTheme({
  palette: {
    primary: { main: "#196cad" }, // Had to darken the given blue color to get enough contrast
    error: { main: "#d8372a" } // Had to darken given red color to get enough contrast
  },
  typography: {
    fontSize: 12
  }
});

/**
 * In real life project we would need to decide things like
 * routing, translations, localizations, offline support, SEO, code splitting etc...
 * For this exercise though, we just ignore them
 */
export const App = () => {
  return (
    <ThemeProvider key="data-testid-theme-provider" theme={theme}>
      <Container data-testid="app-container" className="app">
        <Box data-testid="app-box" className="app-box" m={2}>
          <HistoryContainer data-testid="history-container" />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;
