import {
  Box,
  VStack,
  Link,
  Heading,
  Collapse,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { fetchProjectsContents } from "../../../helpers/fetching-helpers";
import { toKebabCase } from "../../../helpers/string-helpers";
import { IPage } from "../../../shared/interfaces/page.interface";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons"; // For the collapsible button
import { Loading } from "../Loading";

export const Sidebar: React.FC = () => {
  const { colorMode } = useColorMode(); // Get colorMode and toggle function

  const [pages, setPages] = useState<IPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedPages, setExpandedPages] = useState<Set<string>>(new Set()); // Track expanded pages

  useEffect(() => {
    const loadPages = async () => {
      const data = await fetchProjectsContents();
      setPages(data);
      setLoading(false);
    };

    loadPages();
  }, []);

  // Toggle the expanded state for a given page title
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
            {pages.map((page) => (
              <Box key={page.id}>
                {/* Link to the page itself */}
                <Link
                  as={RouterLink}
                  to={`/docs/${toKebabCase(page.title)}`}
                  _hover={{ textDecoration: "underline" }}
                  fontWeight="bold"
                  onClick={() => toggleSection(page.title)} // Toggle collapse when clicked
                >
                  {page.title}
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
                {/* Collapsible Sections */}
                <Collapse in={expandedPages.has(page.title)}>
                  <VStack align="start" spacing={2} pl={4}>
                    {page.sections.map((section) => {
                      const sectionLink = toKebabCase(section); // Use kebab-case for links
                      return (
                        <Link
                          key={sectionLink}
                          as={RouterLink}
                          to={`/docs/${toKebabCase(page.title)}#${sectionLink}`}
                          _hover={{ textDecoration: "underline" }}
                        >
                          {section}
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
