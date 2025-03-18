interface IGitHubContentLink {
  /**
   * URL to the content itself on the API.
   */
  self: string;
  /**
   * URL to the content on the Git repository.
   */
  git: string;
  /**
   * URL to the content on GitHub in the browser.
   */
  html: string;
}

export interface IGitHubContent {
  /**
   * The name of the content (e.g., "bb8").
   */
  name: string;
  /**
   * The relative path of the content within the repository (e.g., "projects/bb8").
   */
  path: string;
  /**
   * The SHA (commit hash) of the content, identifying the commit in Git history.
   */
  sha: string;
  /**
   * The size of the content (in bytes), here it is 0 as it’s likely a directory.
   */
  size: number;
  /**
   * The URL to the content on the GitHub API.
   */
  url: string;
  /**
   * The URL to view the content on GitHub in the browser.
   */
  html_url: string;
  /**
   * The Git URL to the content, used for git operations like fetching or cloning.
   */
  git_url: string;
  /**
   * The download URL for the content (null in this case as it’s a directory).
   */
  download_url: string | null;
  /**
   * The type of content (e.g., "file" or "dir" indicating it's a directory).
   */
  type: string;
  /**
   * The `_links` object that contains URLs for self, git, and HTML views.
   */
  _links: IGitHubContentLink;
}
