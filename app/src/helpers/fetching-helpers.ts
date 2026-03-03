import { IGitHubContent } from "../shared/interfaces/github.interface";
import { IPage } from "../shared/interfaces/page.interface";
import { GITHUB_CONTENT_URL } from "./constant-helpers";
import { parseMarkdownToChakra } from "./md-jsx-parser";

export const fetchProjectsContents = async (
  colorMode?: "light" | "dark"
): Promise<IPage[]> => {
  const contents: IPage[] = [];
  try {
    const projectsResponse = await fetch(`${GITHUB_CONTENT_URL}/projects`);
    if (!projectsResponse.ok) {
      throw new Error("Failed to fetch projects directory contents");
    }
    const projects = await projectsResponse.json();
    const interpretedProjects = projects as IGitHubContent[];
    
    // Filter out non-directory items (like .DS_Store)
    const projectDirectories = interpretedProjects.filter(
      (project) => project.type === "dir"
    );
    
    // Parallelize API calls with Promise.all
    const projectPromises = projectDirectories.map(async (project) => {
      try {
        const projectResponse = await fetch(
          `${GITHUB_CONTENT_URL}/${project.path}`
        );
        if (!projectResponse.ok) {
          throw new Error(
            `Failed to fetch ${GITHUB_CONTENT_URL}/${project.path} contents`
          );
        }
        const projectContents = await projectResponse.json();
        
        const interpretedProjectReadmeContent = projectContents.find(
          (projectContent: IGitHubContent) =>
            projectContent.name.includes("README.md") &&
            projectContent.type.includes("file")
        ) as IGitHubContent;
        
        if (interpretedProjectReadmeContent?.download_url) {
          const projectReadmeFile = await fetch(
            interpretedProjectReadmeContent.download_url
          );
          const readmeText = await projectReadmeFile.text();
          const parsedReadme = parseMarkdownToChakra(readmeText, colorMode);
          
          return {
            title: parsedReadme.title,
            displayTitle: parsedReadme.displayTitle,
            content: parsedReadme.content,
            id: project.name,
            sections: parsedReadme.sections,
          };
        }
      } catch (e) {
        console.error(
          `There was an issue reading README.md for ${project.name}`,
          e
        );
      }
      return null;
    });
    
    const results = await Promise.all(projectPromises);
    contents.push(...results.filter((result): result is IPage => result !== null));
  } catch (e) {
    console.error("fetchProjectsContents:", e);
  }
  return contents;
};

export const fetchMainReadme = async (
  colorMode?: "light" | "dark"
): Promise<IPage[]> => {
  // Create output variable
  const contents: IPage[] = [];
  try {
    // Fetch github-repo/projects content
    const repoResponse = await fetch(`${GITHUB_CONTENT_URL}/`);
    if (!repoResponse.ok) {
      throw new Error("Failed to fetch directory contents");
    }
    const repoContent = await repoResponse.json();
    // Interpret the retrieved data
    const interpretedRepoContent = repoContent as IGitHubContent[];
    const interpretedRepoReadmeContent = interpretedRepoContent.find(
      (projectContent: IGitHubContent) =>
        projectContent.name.includes("README.md") &&
        projectContent.type.includes("file")
    ) as IGitHubContent;
    // If the `download_url` exists proceed
    if (interpretedRepoReadmeContent.download_url) {
      // Download the `README.md` actual file
      const projectReadmeFile = await fetch(
        interpretedRepoReadmeContent.download_url
      );
      // Convert to string
      const readmeText = await projectReadmeFile.text();
      // Parse string
      const parsedReadme = parseMarkdownToChakra(readmeText, colorMode);
      // Store in the output
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
