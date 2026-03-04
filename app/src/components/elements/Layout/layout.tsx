import { Navbar } from "../Navbar";
import { Sidebar } from "../Sidebar";
import { Flex, Box } from "@chakra-ui/react";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Flex h="100vh">
      <Sidebar />
      <Flex flex={1} direction="column">
        <Navbar />
        <Box p={6} flex={1} overflow="auto">
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};
