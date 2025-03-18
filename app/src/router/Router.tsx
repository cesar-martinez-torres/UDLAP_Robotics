import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout, DocPage, Loading } from "../components/elements";
import { Home } from "./pages/Home";
import { fetchProjectsContents } from "../helpers/fetching-helpers";
import { IPage } from "../shared/interfaces/page.interface";
import { useColorMode } from "@chakra-ui/react";

export const Router: React.FC = () => {
  const [pages, setPages] = useState<IPage[]>([]);
  const [loading, setLoading] = useState(true);
  // Access current color mode
  const { colorMode } = useColorMode();

  useEffect(() => {
    const loadPages = async () => {
      const data = await fetchProjectsContents(colorMode);
      setPages(data);
      setLoading(false);
    };

    loadPages();
  }, [colorMode]);

  if (loading) {
    return <Loading />; // Temporary loading UI
  }

  return (
    <BrowserRouter basename="/">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs/:id" element={<DocPage pages={pages} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
