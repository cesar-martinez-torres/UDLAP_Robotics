import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { IPage } from "../shared/interfaces/page.interface";
import { fetchProjectsContents } from "../helpers/fetching-helpers";

interface IProjectsContext {
  projects: IPage[];
  loading: boolean;
}

const ProjectsContext = createContext<IProjectsContext | undefined>(undefined);

export const ProjectsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<IPage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      const data = await fetchProjectsContents();
      setProjects(data);
      setLoading(false);
    };
    loadProjects();
  }, []);

  return (
    <ProjectsContext.Provider value={{ projects, loading }}>
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
