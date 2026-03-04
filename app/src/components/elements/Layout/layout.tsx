import { Navbar } from "../Navbar";
import { Sidebar } from "../Sidebar";
import { Flex, Box, useBreakpointValue } from "@chakra-ui/react";
import { useSidebar } from "../../../context/sidebar-context";
import { useEffect, useRef } from "react";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isOpen, close } = useSidebar();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const prevIsMobile = useRef(isMobile);

  // Auto-close sidebar when switching to mobile
  useEffect(() => {
    if (isMobile && !prevIsMobile.current) {
      close();
    }
    prevIsMobile.current = isMobile;
  }, [isMobile, close]);

  return (
    <Flex h="100vh">
      {isOpen && <Sidebar />}
      <Flex flex={1} direction="column">
        <Navbar />
        <Box p={6} flex={1} overflow="auto">
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};
