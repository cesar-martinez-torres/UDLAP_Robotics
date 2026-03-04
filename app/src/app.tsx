import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Router } from "./router/router";
import { ProjectsProvider } from "./context/projects-context";

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
