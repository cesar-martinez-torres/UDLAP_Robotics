import { useColorMode, Box, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { toKebabCase } from "../../../helpers/string-helpers";
import { IPage } from "../../../shared/interfaces/page.interface";

interface IDocPage {
  pages?: IPage[];
  page?: IPage;
}

export const DocPage: React.FC<IDocPage> = ({ pages = [], page }) => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { colorMode } = useColorMode(); // Access current color mode

  const matchingPage = pages.find((p) => toKebabCase(p.title) === id);

  // Handle hash navigation
  useEffect(() => {
    const handleHashChange = () => {
      const sectionId = window.location.hash.replace("#", "");
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };

    handleHashChange();
    return () => {};
  }, [location]);

  if (!matchingPage && !page) {
    return (
      <Box p={6} color={colorMode === "dark" ? "white" : "black"}>
        <Heading size="lg">Page Not Found</Heading>
      </Box>
    );
  }

  return (
    <Box
      p={6}
      bg={colorMode === "dark" ? "gray.900" : "white"}
      color={colorMode === "dark" ? "gray.200" : "gray.800"}
    >
      {matchingPage?.content || page?.content}
    </Box>
  );
};
