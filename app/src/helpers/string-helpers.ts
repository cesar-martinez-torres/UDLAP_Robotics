// Remove emojis from string
export const removeEmojis = (input: string): string => {
  return input.replace(/[\p{Emoji}\p{Emoji_Modifier}\p{Emoji_Component}\p{Emoji_Modifier_Base}\p{Emoji_Presentation}]/gu, '').trim();
};

export const toKebabCase = (input: string): string => {
  // First remove emojis
  const withoutEmojis = removeEmojis(input);
  
  return withoutEmojis
    .trim()
    .toLowerCase()
    .normalize('NFD') // Normalize to decomposed form
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics (accents)
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .replace(/[^\w-]+/g, "") // Remove non-word characters except dashes
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing dashes
};

// Convert to kebab-case for URLs (strips emojis and accents)
export const toKebabCaseForUrl = (input: string): string => {
  return toKebabCase(input);
};
