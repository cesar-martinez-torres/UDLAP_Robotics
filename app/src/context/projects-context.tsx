import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { IPage, ISectionGroup } from "../shared/interfaces/page.interface";
import { fetchAllSections } from "../helpers/fetching-helpers";

interface IProjectsContext {
  sections: ISectionGroup[];
  loading: boolean;
  getAllPages: () => IPage[];
}

const ProjectsContext = createContext<IProjectsContext | undefined>(undefined);

export const ProjectsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sections, setSections] = useState<ISectionGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSections = async () => {
      const data = await fetchAllSections();
      setSections(data);
      setLoading(false);
    };
    loadSections();
  }, []);

  const getAllPages = () => {
    return sections.flatMap(section => section.pages);
  };

  return (
    <ProjectsContext.Provider value={{ sections, loading, getAllPages }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error("useProjects must be used within ProjectsProvider");
  }
  return context;
};
