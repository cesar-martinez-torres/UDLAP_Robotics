import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout, DocPage, Loading } from "../components/elements";
import { Home } from "./pages/Home";
import { useProjects } from "../context/projects-context";

export const Router: React.FC = () => {
  const { projects, loading } = useProjects();

  if (loading) {
    return <Loading />;
  }

  return (
    <BrowserRouter basename="/UDLAP_Robotics">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs/:id" element={<DocPage pages={projects} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
