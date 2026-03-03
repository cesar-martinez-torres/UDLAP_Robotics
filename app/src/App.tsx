import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Router } from "./router/Router";
import { ProjectsProvider } from "./context/ProjectsContext";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
});

export const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <ProjectsProvider>
        <Router />
      </ProjectsProvider>
    </ChakraProvider>
  );
};
