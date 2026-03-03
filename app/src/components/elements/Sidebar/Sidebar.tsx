import {
  Box,
  VStack,
  Link,
  Heading,
  Collapse,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { toKebabCase } from "../../../helpers/string-helpers";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Loading } from "../Loading";
import { useProjects } from "../../../context/ProjectsContext";

export const Sidebar: React.FC = () => {
  const { colorMode } = useColorMode();
  const { projects, loading } = useProjects();
  const [expandedPages, setExpandedPages] = useState<Set<string>>(new Set());

  const toggleSection = (pageTitle: string) => {
    setExpandedPages((prevExpandedPages) => {
      const newExpandedPages = new Set(prevExpandedPages);
      if (newExpandedPages.has(pageTitle)) {
        newExpandedPages.delete(pageTitle);
      } else {
        newExpandedPages.add(pageTitle);
      }
      return newExpandedPages;
    });
  };

  return (
    <Box
      w="64"
      bg={colorMode === "dark" ? "gray.800" : "gray.100"}
      color={colorMode === "dark" ? "white" : "gray.800"}
      h="100vh"
      p={4}
      borderRightWidth={1}
      boxShadow="md"
      overflowY="auto"
    >
      <VStack align="start" spacing={4} pb={3}>
        <Heading as="h2" size="md">
          Projects
        </Heading>
        {loading ? (
          <Loading />
        ) : (
          <VStack align="start" pl={4} spacing={2}>
            {projects.map((page) => (
              <Box key={page.id}>
                <Link
                  as={RouterLink}
                  to={`/docs/${toKebabCase(page.title)}`}
                  _hover={{ textDecoration: "underline" }}
                  fontWeight="bold"
                  onClick={() => toggleSection(page.title)}
                >
                  {page.displayTitle}
                  <IconButton
                    aria-label={
                      expandedPages.has(page.title) ? "Collapse" : "Expand"
                    }
                    icon={
                      expandedPages.has(page.title) ? (
                        <ChevronUpIcon />
                      ) : (
                        <ChevronDownIcon />
                      )
                    }
                    size="sm"
                    variant="link"
                    ml={2}
                  />
                </Link>
                <Collapse in={expandedPages.has(page.title)}>
                  <VStack align="start" spacing={2} pl={4}>
                    {page.sections.map((section) => {
                      const sectionLink = toKebabCase(section.clean);
                      return (
                        <Link
                          key={sectionLink}
                          as={RouterLink}
                          to={`/docs/${toKebabCase(page.title)}#${sectionLink}`}
                          _hover={{ textDecoration: "underline" }}
                        >
                          {section.display}
                        </Link>
                      );
                    })}
                  </VStack>
                </Collapse>
              </Box>
            ))}
          </VStack>
        )}
      </VStack>
    </Box>
  );
};
