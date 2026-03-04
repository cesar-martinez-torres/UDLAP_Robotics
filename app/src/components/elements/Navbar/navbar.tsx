import { Box, Flex, Link, Text, IconButton } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import { useSidebar } from "../../../context/sidebar-context";

export const Navbar: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { toggle } = useSidebar();

  return (
    <Box
      bg={colorMode === "dark" ? "gray.800" : "gray.100"}
      color={colorMode === "dark" ? "white" : "gray.800"}
      p={4}
      boxShadow="md"
    >
      <Flex justify="space-between" align="center">
        <Flex align="center">
          {/* Sidebar Toggle Button */}
          <IconButton
            aria-label="Toggle Sidebar"
            icon={<HamburgerIcon />}
            onClick={toggle}
            variant="ghost"
            color={colorMode === "dark" ? "white" : "gray.800"}
            fontSize="xl"
            mr={4}
          />
          <Text fontSize="xl" fontWeight="bold">
            UDLAP Robotics
          </Text>
        </Flex>
        <Flex align="center">
          {/* Home Link */}
          <Link
            as={RouterLink}
            to="/"
            fontSize="lg"
            mr={4}
            _hover={{ textDecoration: "underline" }}
            color={colorMode === "dark" ? "white" : "gray.800"}
          >
            Home
          </Link>
          {/* GitHub Link */}
          <Link
            href="https://github.com/cesar-martinez-torres/UDLAP_Robotics"
            isExternal
            fontSize="lg"
            mr={4}
            _hover={{ textDecoration: "underline" }}
            color={colorMode === "dark" ? "white" : "gray.800"}
          >
            GitHub
          </Link>

          {/* Color Mode Toggle Button */}
          <IconButton
            aria-label="Toggle Dark Mode"
            icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
            onClick={toggleColorMode}
            variant="link"
            color={colorMode === "dark" ? "white" : "gray.800"}
            fontSize="xl"
          />
        </Flex>
      </Flex>
    </Box>
  );
};
