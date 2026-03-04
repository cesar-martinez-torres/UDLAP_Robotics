import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Router } from "./router/router";
import { ProjectsProvider } from "./context/projects-context";
import { SidebarProvider } from "./context/sidebar-context";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
});

export const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <SidebarProvider>
        <ProjectsProvider>
          <Router />
        </ProjectsProvider>
      </SidebarProvider>
    </ChakraProvider>
  );
};
