import { Box, Spinner, Text } from "@chakra-ui/react";

export const Loading: React.FC = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      flexDirection="column"
    >
      <Spinner size="xl" color="blue.500" />
      <Text fontSize="xl" fontWeight="semibold" color="gray.500" mt={4}>
        Loading...
      </Text>
    </Box>
  );
};
