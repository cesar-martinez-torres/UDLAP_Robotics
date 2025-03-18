import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Router } from "./router/Router";

// Create a custom theme to set dark mode as default
const theme = extendTheme({
  config: {
    initialColorMode: "dark", // Default color mode is dark
    useSystemColorMode: false, // Disable system color mode to enforce the default color mode
  },
});

export const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router />
    </ChakraProvider>
  );
};
