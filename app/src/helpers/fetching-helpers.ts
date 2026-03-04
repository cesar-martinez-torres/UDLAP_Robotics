import { IGitHubContent } from "../shared/interfaces/github.interface";
import { IPage, ISectionGroup } from "../shared/interfaces/page.interface";
import { GITHUB_CONTENT_URL } from "./constant-helpers";
import { parseMarkdownToChakra } from "./md-jsx-parser";
import { SECTIONS } from "../config/sections.config";

export const fetchAllSections = async (
  colorMode?: "light" | "dark"
): Promise<ISectionGroup[]> => {
  const sectionGroups: ISectionGroup[] = [];
  
  for (const section of SECTIONS) {
    try {
      const pages = await fetchSectionContents(section.path, section.key, colorMode);
      sectionGroups.push({
        sectionKey: section.key,
        displayName: section.displayName,
        pages
      });
    } catch (e) {
      console.error(`Failed to fetch section ${section.key}:`, e);
      sectionGroups.push({
        sectionKey: section.key,
        displayName: section.displayName,
        pages: []
      });
    }
  }
  
  return sectionGroups;
};

export const fetchSectionContents = async (
  sectionPath: string,
  sectionKey: string,
  colorMode?: "light" | "dark"
): Promise<IPage[]> => {
  const contents: IPage[] = [];
  try {
    const sectionResponse = await fetch(`${GITHUB_CONTENT_URL}/${sectionPath}`);
    if (!sectionResponse.ok) {
      throw new Error(`Failed to fetch ${sectionPath} directory contents`);
    }
    const items = await sectionResponse.json();
    const interpretedItems = items as IGitHubContent[];
    
    const itemDirectories = interpretedItems.filter(
      (item) => item.type === "dir"
    );
    
    const itemPromises = itemDirectories.map(async (item) => {
      try {
        const itemResponse = await fetch(
          `${GITHUB_CONTENT_URL}/${item.path}`
        );
        if (!itemResponse.ok) {
          throw new Error(
            `Failed to fetch ${GITHUB_CONTENT_URL}/${item.path} contents`
          );
        }
        const itemContents = await itemResponse.json();
        
        const interpretedReadmeContent = itemContents.find(
          (content: IGitHubContent) =>
            content.name.includes("README.md") &&
            content.type.includes("file")
        ) as IGitHubContent;
        
        if (interpretedReadmeContent?.download_url) {
          const readmeFile = await fetch(
            interpretedReadmeContent.download_url
          );
          const readmeText = await readmeFile.text();
          const parsedReadme = parseMarkdownToChakra(readmeText, colorMode);
          
          return {
            title: parsedReadme.title,
            displayTitle: parsedReadme.displayTitle,
            content: parsedReadme.content,
            id: item.name,
            sections: parsedReadme.sections,
            sectionKey
          } as IPage;
        }
      } catch (e) {
        console.error(
          `There was an issue reading README.md for ${item.name}`,
          e
        );
      }
      return null;
    });
    
    const results = await Promise.all(itemPromises);
    const validResults = results.filter((result): result is IPage => result !== null);
    contents.push(...validResults);
  } catch (e) {
    console.error(`fetchSectionContents for ${sectionPath}:`, e);
  }
  return contents;
};

// Legacy function for backward compatibility
export const fetchProjectsContents = async (
  colorMode?: "light" | "dark"
): Promise<IPage[]> => {
  return fetchSectionContents('projects', 'projects', colorMode);
};

export const fetchMainReadme = async (
  colorMode?: "light" | "dark"
): Promise<IPage[]> => {
  const contents: IPage[] = [];
  try {
    const repoResponse = await fetch(`${GITHUB_CONTENT_URL}/`);
    if (!repoResponse.ok) {
      throw new Error("Failed to fetch directory contents");
    }
    const repoContent = await repoResponse.json();
    const interpretedRepoContent = repoContent as IGitHubContent[];
    const interpretedRepoReadmeContent = interpretedRepoContent.find(
      (projectContent: IGitHubContent) =>
        projectContent.name.includes("README.md") &&
        projectContent.type.includes("file")
    ) as IGitHubContent;
    if (interpretedRepoReadmeContent.download_url) {
      const projectReadmeFile = await fetch(
        interpretedRepoReadmeContent.download_url
      );
      const readmeText = await projectReadmeFile.text();
      const parsedReadme = parseMarkdownToChakra(readmeText, colorMode);
      contents.push({
        title: parsedReadme.title,
        displayTitle: parsedReadme.displayTitle,
        content: parsedReadme.content,
        id: interpretedRepoReadmeContent.name,
        sections: parsedReadme.sections,
      });
    }
  } catch (e) {
    console.error("fetchProjectsContents:", e);
  }
  return contents;
};
