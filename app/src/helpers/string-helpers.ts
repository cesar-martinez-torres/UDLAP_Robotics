export const toKebabCase = (input: string): string => {
  return input
    .trim() // Remove any leading/trailing whitespace
    .toLowerCase() // Convert to lowercase
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .replace(/[^\w-]+/g, ""); // Remove any non-word characters (except dashes)
};
