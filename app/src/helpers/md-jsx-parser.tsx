import ReactMarkdown from "react-markdown";
import {
  Text,
  Heading,
  UnorderedList,
  ListItem,
  OrderedList,
  Image,
  Link,
} from "@chakra-ui/react";
import { IMarkdownParserResult } from "./md-jsx-parser.interface";

// Extract title (first # header)
const extractTitle = (content: string): string => {
  const titleMatch = content.match(/^#\s*\{(.*)\}\s*$/m);
  return titleMatch ? titleMatch[1] : "Untitled";
};

// Extract section headers (## headers)
const extractSections = (content: string): string[] => {
  const sections = content.match(/^##\s*(.*)$/gm);
  return sections
    ? sections.map((section) => section.replace(/^##\s*/, ""))
    : [];
};

const ChakraRenderer = (colorMode: "light" | "dark") => {
  return {
    h1: (props: any) => (
      <Heading
        as="h1"
        py={4}
        size="xl"
        color={colorMode === "dark" ? "white" : "gray.800"}
        fontWeight="bold"
        borderBottom={colorMode === "dark" ? "2px solid #444" : "none"}
        mb={3}
        {...props}
      />
    ),
    h2: (props: any) => {
      const anchorId = props.children.toLowerCase().replace(/\s+/g, "-");
      return (
        <Heading
          as="h2"
          my={5}
          size="md"
          id={anchorId}
          color={colorMode === "dark" ? "white" : "gray.800"}
        >
          {props.children}
        </Heading>
      );
    },
    p: (props: any) => (
      <Text
        color={colorMode === "dark" ? "gray.200" : "gray.700"}
        lineHeight="1.8"
        fontSize="md"
        mb={4}
        {...props}
      />
    ),
    ul: (props: any) => (
      <UnorderedList
        color={colorMode === "dark" ? "gray.200" : "gray.700"}
        spacing={3}
        pl={6}
        pb={3}
        {...props}
      />
    ),
    li: (props: any) => (
      <ListItem
        color={colorMode === "dark" ? "gray.200" : "gray.700"}
        fontSize="md"
        lineHeight="1.8"
        {...props}
      />
    ),
    strong: (props: any) => (
      <Text
        as="b"
        color={colorMode === "dark" ? "white" : "black"}
        fontWeight="bold"
        {...props}
      />
    ),
    code: (props: any) => (
      <Text
        as="code"
        color={colorMode === "dark" ? "yellow.300" : "purple.500"}
        fontSize="sm"
        bg={colorMode === "dark" ? "gray.800" : "gray.100"}
        borderRadius="md"
        px={1}
        py={0.5}
        {...props}
      />
    ),
    ol: (props: any) => (
      <OrderedList
        color={colorMode === "dark" ? "gray.200" : "gray.700"}
        spacing={3}
        pl={6}
        pb={3}
        {...props}
      />
    ),
    img: (props: any) => {
      // Check if the image URL is a GitHub URL
      let imageUrl = props.src;
      if (imageUrl.includes("github.com")) {
        // Replace GitHub page URL with the raw GitHub URL
        imageUrl = imageUrl.replace("github.com", "raw.githubusercontent.com");
        imageUrl = imageUrl.replace("/blob/", "/");
      }
      return (
        <Image
          src={imageUrl}
          alt={props.alt}
          boxShadow={
            colorMode === "dark"
              ? "0px 0px 10px rgba(255, 255, 255, 0.1)"
              : "none"
          }
          borderRadius="md"
          mb={4}
        />
      );
    },
    // Custom renderer for anchor (links)
    a: (props: any) => (
      <Link
        href={props.href}
        isExternal
        _hover={{
          textDecoration: "underline",
          color: colorMode === "dark" ? "yellow.400" : "blue.500",
        }}
        color={colorMode === "dark" ? "gray.200" : "gray.700"}
        fontWeight="bold"
        {...props}
      >
        {props.children}
      </Link>
    ),
  };
};

// Function to parse markdown content and return the structured object
export const parseMarkdownToChakra = (
  content: string,
  colorMode: "light" | "dark" = "dark"
): IMarkdownParserResult => {
  const title = extractTitle(content);
  const sections = extractSections(content);
  const updatedContent = content.replace(/^#\s*\{(.*)\}\s*$/m, "# $1");

  const jsxContent = (
    <ReactMarkdown components={ChakraRenderer(colorMode)}>
      {updatedContent}
    </ReactMarkdown>
  );

  return {
    title,
    sections,
    content: jsxContent,
  };
};
