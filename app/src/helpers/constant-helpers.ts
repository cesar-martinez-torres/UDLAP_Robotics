const GITHUB_OWNER = process.env.REACT_APP_GITHUB_OWNER || 'cesar-martinez-torres';
const GITHUB_REPO = process.env.REACT_APP_GITHUB_REPO || 'UDLAP_Robotics';

export const GITHUB_CONTENT_URL = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents`;
