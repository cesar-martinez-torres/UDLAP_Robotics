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
import { useProjects } from "../../../context/projects-context";

export const Sidebar: React.FC = () => {
  const { colorMode } = useColorMode();
  const { sections, loading } = useProjects();
  
  // Initialize with all sections expanded by default
  const [expandedSections, setExpandedSections] = useState<Set<string>>(() => 
    new Set(sections.map(s => s.sectionKey))
  );
  const [expandedPages, setExpandedPages] = useState<Set<string>>(() => 
    new Set(sections.flatMap(s => s.pages.map(p => p.id)))
  );

  const toggleSection = (sectionKey: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionKey)) {
        newSet.delete(sectionKey);
      } else {
        newSet.add(sectionKey);
      }
      return newSet;
    });
  };

  const togglePage = (pageId: string) => {
    setExpandedPages((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(pageId)) {
        newSet.delete(pageId);
      } else {
        newSet.add(pageId);
      }
      return newSet;
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
        {loading ? (
          <Loading />
        ) : (
          sections.map((section) => (
            <Box key={section.sectionKey} w="full">
              <Heading
                as="h2"
                size="md"
                cursor="pointer"
                onClick={() => toggleSection(section.sectionKey)}
                display="flex"
                alignItems="center"
                _hover={{ opacity: 0.8 }}
              >
                {section.displayName}
                <IconButton
                  aria-label={
                    expandedSections.has(section.sectionKey) ? "Collapse" : "Expand"
                  }
                  icon={
                    expandedSections.has(section.sectionKey) ? (
                      <ChevronUpIcon />
                    ) : (
                      <ChevronDownIcon />
                    )
                  }
                  size="sm"
                  variant="link"
                  ml={2}
                />
              </Heading>
              <Collapse in={expandedSections.has(section.sectionKey)}>
                <VStack align="start" pl={4} spacing={2} mt={2}>
                  {section.pages.map((page) => (
                    <Box key={page.id} w="full">
                      <Link
                        as={RouterLink}
                        to={`/docs/${toKebabCase(page.title)}`}
                        _hover={{ textDecoration: "underline" }}
                        fontWeight="bold"
                        display="flex"
                        alignItems="center"
                      >
                        {page.displayTitle}
                        {page.sections.length > 0 && (
                          <IconButton
                            aria-label={
                              expandedPages.has(page.id) ? "Collapse" : "Expand"
                            }
                            icon={
                              expandedPages.has(page.id) ? (
                                <ChevronUpIcon />
                              ) : (
                                <ChevronDownIcon />
                              )
                            }
                            size="sm"
                            variant="link"
                            ml={2}
                            onClick={(e) => {
                              e.preventDefault();
                              togglePage(page.id);
                            }}
                          />
                        )}
                      </Link>
                      {page.sections.length > 0 && (
                        <Collapse in={expandedPages.has(page.id)}>
                          <VStack align="start" spacing={1} pl={4} mt={1}>
                            {page.sections.map((section) => {
                              const sectionLink = toKebabCase(section.clean);
                              return (
                                <Link
                                  key={sectionLink}
                                  as={RouterLink}
                                  to={`/docs/${toKebabCase(page.title)}#${sectionLink}`}
                                  _hover={{ textDecoration: "underline" }}
                                  fontSize="sm"
                                >
                                  {section.display}
                                </Link>
                              );
                            })}
                          </VStack>
                        </Collapse>
                      )}
                    </Box>
                  ))}
                </VStack>
              </Collapse>
            </Box>
          ))
        )}
      </VStack>
    </Box>
  );
};
