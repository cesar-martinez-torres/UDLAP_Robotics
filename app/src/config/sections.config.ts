export interface ISectionConfig {
  key: string;
  displayName: string;
  path: string;
}

export const SECTIONS: ISectionConfig[] = [
  {
    key: 'tutorials',
    displayName: 'Tutoriales',
    path: 'tutorials'
  },
  {
    key: 'projects',
    displayName: 'Proyectos',
    path: 'projects'
  },
  {
    key: 'research',
    displayName: 'Investigación',
    path: 'research'
  }
];

export const getSectionByKey = (key: string): ISectionConfig | undefined => {
  return SECTIONS.find(section => section.key === key);
};

export const getSectionByPath = (path: string): ISectionConfig | undefined => {
  return SECTIONS.find(section => section.path === path);
};
