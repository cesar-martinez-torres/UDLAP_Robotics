import { IGitHubContent } from "../shared/interfaces/github.interface";
import { IPage } from "../shared/interfaces/page.interface";
import { GITHUB_CONTENT_URL } from "./constant-helpers";
import { parseMarkdownToChakra } from "./md-jsx-parser";

export const fetchProjectsContents = async (
  colorMode?: "light" | "dark"
): Promise<IPage[]> => {
  // Create output variable
  const contents: IPage[] = [];
  try {
    // Fetch github-repo/projects content
    const projectsResponse = await fetch(`${GITHUB_CONTENT_URL}/projects`);
    if (!projectsResponse.ok) {
      throw new Error("Failed to fetch projects directory contents");
    }
    const projects = await projectsResponse.json();
    // Interpret the retrieved data
    const interpretedProjects = projects as IGitHubContent[];
    // Iterate through each possible project
    for (let i = 0; i < interpretedProjects.length; i++) {
      try {
        // Retrieve the content for each individual project
        const projectResponse = await fetch(
          `${GITHUB_CONTENT_URL}/${interpretedProjects[i].path}`
        );
        if (!projectResponse.ok) {
          throw new Error(
            `Failed to fetch ${GITHUB_CONTENT_URL}/${interpretedProjects[i].path} contents`
          );
        }
        const projectContents = await projectResponse.json();
        // Filter the items containing `README.md` out of each project folder
        // and interpret
        const interpretedProjectReadmeContent = projectContents.find(
          (projectContent: IGitHubContent) =>
            projectContent.name.includes("README.md") &&
            projectContent.type.includes("file")
        ) as IGitHubContent;
        // If the `download_url` exists proceed
        if (interpretedProjectReadmeContent.download_url) {
          // Download the `README.md` actual file
          const projectReadmeFile = await fetch(
            interpretedProjectReadmeContent.download_url
          );
          // Convert to string
          const readmeText = await projectReadmeFile.text();
          // Parse string
          const parsedReadme = parseMarkdownToChakra(readmeText, colorMode);
          // Store in the output
          contents.push({
            title: parsedReadme.title,
            content: parsedReadme.content,
            id: interpretedProjects[i].name,
            sections: parsedReadme.sections,
          });
        }
      } catch (e) {
        console.error(
          `There was an issue reading README.md for ${interpretedProjects[i].name}`,
          e
        );
      }
    }
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
