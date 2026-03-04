import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {
  Text,
  Heading,
  UnorderedList,
  ListItem,
  OrderedList,
  Image,
  Link,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast,
} from "@chakra-ui/react";
import { CopyIcon, CheckIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { IMarkdownParserResult } from "./md-jsx-parser.interface";

// Extract title (first # header)
const extractTitle = (content: string): string => {
  const titleMatch = content.match(/^#\s*\{(.*)\}\s*$/m);
  return titleMatch ? titleMatch[1] : "Untitled";
};

// Extract display title with emojis
const extractDisplayTitle = (content: string): string => {
  return extractTitle(content);
};

// Extract clean title without emojis for URLs
const extractCleanTitle = (content: string): string => {
  const title = extractTitle(content);
  return title.replace(/[\p{Emoji}\p{Emoji_Modifier}\p{Emoji_Component}\p{Emoji_Modifier_Base}\p{Emoji_Presentation}]/gu, '').trim();
};

// Extract section headers (## headers) with display and clean versions
const extractSections = (content: string): Array<{ display: string; clean: string }> => {
  const sections = content.match(/^##\s*(.*)$/gm);
  return sections
    ? sections.map((section) => {
        const displayText = section.replace(/^##\s*/, "");
        const cleanText = displayText
          .replace(/[\p{Emoji}\p{Emoji_Modifier}\p{Emoji_Component}\p{Emoji_Modifier_Base}\p{Emoji_Presentation}]/gu, '')
          .trim();
        return {
          display: displayText,
          clean: cleanText
        };
      })
    : [];
};

// Code block with copy button
const CodeBlock = ({ children, colorMode }: { children: any; colorMode: "light" | "dark" }) => {
  const [copied, setCopied] = useState(false);
  const toast = useToast();

  const handleCopy = () => {
    const code = String(children).replace(/\n$/, "");
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast({
      title: "Copied!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box position="relative" mb={4}>
      <Button
        size="sm"
        position="absolute"
        top={2}
        right={2}
        onClick={handleCopy}
        leftIcon={copied ? <CheckIcon /> : <CopyIcon />}
        colorScheme={copied ? "green" : "gray"}
        variant="solid"
      >
        {copied ? "Copied!" : "Copy"}
      </Button>
      <Box
        as="pre"
        bg={colorMode === "dark" ? "gray.800" : "gray.100"}
        p={4}
        borderRadius="md"
        overflowX="auto"
        fontSize="sm"
      >
        <Text as="code" color={colorMode === "dark" ? "gray.200" : "gray.800"}>
          {children}
        </Text>
      </Box>
    </Box>
  );
};

// Alert/Admonition block parser
const parseAlerts = (content: string): string => {
  const alertTypes = ["NOTE", "TIP", "IMPORTANT", "WARNING", "CAUTION"];
  let processed = content;

  alertTypes.forEach((type) => {
    const regex = new RegExp(`> \\[!${type}\\]\\n((?:> .*\\n?)+)`, "gm");
    processed = processed.replace(regex, (match, alertContent) => {
      const text = alertContent.replace(/^> /gm, "").trim();
      return `<div data-alert="${type}">${text}</div>`;
    });
  });

  return processed;
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
      // Remove emojis and convert to kebab-case for anchor ID
      const cleanText = String(props.children)
        .replace(/[\p{Emoji}\p{Emoji_Modifier}\p{Emoji_Component}\p{Emoji_Modifier_Base}\p{Emoji_Presentation}]/gu, '')
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/^-+|-+$/g, '');
      
      return (
        <Heading
          as="h2"
          my={5}
          size="md"
          id={cleanText}
          color={colorMode === "dark" ? "white" : "gray.800"}
        >
          {props.children}
        </Heading>
      );
    },
    p: (props: any) => {
      // Check if paragraph contains only badges (images or links with images)
      const hasOnlyBadges = props.children && 
        Array.isArray(props.children) && 
        props.children.every((child: any) => {
          if (child === '\n' || child === ' ') return true;
          if (child?.type === 'img') return true;
          // Check if it's a link containing an image (badge link)
          if (child?.type === 'a' && child?.props?.children?.type === 'img') return true;
          return false;
        });

      if (hasOnlyBadges) {
        return (
          <Box display="flex" flexWrap="nowrap" overflowX="auto" gap={2} mb={4} alignItems="center">
            {props.children}
          </Box>
        );
      }

      return (
        <Text
          color={colorMode === "dark" ? "gray.200" : "gray.700"}
          lineHeight="1.8"
          fontSize="md"
          mb={4}
          textAlign="justify"
          {...props}
        />
      );
    },
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
    code: (props: any) => {
      const { inline, children } = props;
      
      // Inline code
      if (inline) {
        return (
          <Text
            as="code"
            color={colorMode === "dark" ? "yellow.300" : "purple.500"}
            fontSize="sm"
            bg={colorMode === "dark" ? "gray.800" : "gray.100"}
            borderRadius="md"
            px={1}
            py={0.5}
          >
            {children}
          </Text>
        );
      }

      // Code block with copy button
      return <CodeBlock colorMode={colorMode}>{children}</CodeBlock>;
    },
    pre: (props: any) => {
      // Extract code content from pre tag
      return props.children;
    },
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

      // Check if it's a badge (shields.io or similar)
      const isBadge = imageUrl.includes("shields.io") || imageUrl.includes("badge");

      if (isBadge) {
        return (
          <Image
            src={imageUrl}
            alt={props.alt}
            display="inline-block"
            height="20px"
          />
        );
      }

      return (
        <Box display="flex" justifyContent="center" mb={4}>
          <Image
            src={imageUrl}
            alt={props.alt}
            boxShadow={
              colorMode === "dark"
                ? "0px 0px 10px rgba(255, 255, 255, 0.1)"
                : "none"
            }
            borderRadius="md"
            maxW="100%"
          />
        </Box>
      );
    },
    a: (props: any) => {
      // Check if link contains a badge image
      const isBadgeLink = props.children?.type === 'img' && 
        (props.children?.props?.src?.includes('shields.io') || 
         props.children?.props?.src?.includes('badge'));

      if (isBadgeLink) {
        return (
          <Link
            href={props.href}
            isExternal
            display="inline-block"
            _hover={{ opacity: 0.8 }}
          >
            {props.children}
          </Link>
        );
      }

      return (
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
      );
    },
    table: (props: any) => (
      <Box overflowX="auto" mb={4}>
        <Table
          variant="simple"
          size="sm"
          colorScheme={colorMode === "dark" ? "whiteAlpha" : "gray"}
          {...props}
        />
      </Box>
    ),
    thead: (props: any) => <Thead {...props} />,
    tbody: (props: any) => <Tbody {...props} />,
    tr: (props: any) => <Tr {...props} />,
    th: (props: any) => (
      <Th
        bg={colorMode === "dark" ? "gray.700" : "gray.200"}
        color={colorMode === "dark" ? "white" : "gray.800"}
        fontWeight="bold"
        {...props}
      />
    ),
    td: (props: any) => (
      <Td
        color={colorMode === "dark" ? "gray.200" : "gray.700"}
        {...props}
      />
    ),
    div: (props: any) => {
      const alertType = props["data-alert"];
      
      if (alertType) {
        const alertConfig: Record<string, { status: any; title: string }> = {
          NOTE: { status: "info", title: "Note" },
          TIP: { status: "success", title: "Tip" },
          IMPORTANT: { status: "warning", title: "Important" },
          WARNING: { status: "warning", title: "Warning" },
          CAUTION: { status: "error", title: "Caution" },
        };

        const config = alertConfig[alertType] || alertConfig.NOTE;

        return (
          <Alert status={config.status} mb={4} borderRadius="md">
            <AlertIcon />
            <Box>
              <AlertTitle>{config.title}</AlertTitle>
              <AlertDescription>{props.children}</AlertDescription>
            </Box>
          </Alert>
        );
      }

      return <Box {...props} />;
    },
  };
};

// Function to parse markdown content and return the structured object
export const parseMarkdownToChakra = (
  content: string,
  colorMode: "light" | "dark" = "dark"
): IMarkdownParserResult => {
  const displayTitle = extractDisplayTitle(content);
  const title = extractCleanTitle(content);
  const sections = extractSections(content);
  const updatedContent = content.replace(/^#\s*\{(.*)\}\s*$/m, "# $1");
  
  // Parse alerts before rendering
  const processedContent = parseAlerts(updatedContent);

  const jsxContent = (
    <ReactMarkdown 
      components={ChakraRenderer(colorMode)}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
    >
      {processedContent}
    </ReactMarkdown>
  );

  return {
    title,
    displayTitle,
    sections,
    content: jsxContent,
  };
};
