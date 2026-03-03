import { useColorMode } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchMainReadme } from "../../../helpers/fetching-helpers";
import { IPage } from "../../../shared/interfaces/page.interface";
import { DocPage, Loading } from "../../../components/elements";

export const Home: React.FC = () => {
  const [pages, setPages] = useState<IPage[]>([]);
  const [loading, setLoading] = useState(true);
  // Access current color mode
  const { colorMode } = useColorMode();

  useEffect(() => {
    const loadPages = async () => {
      const data = await fetchMainReadme(colorMode);
      setPages(data);
      setLoading(false);
    };

    loadPages();
  }, [colorMode]);

  if (loading) {
    return <Loading />; // Temporary loading UI
  }

  return <DocPage page={pages[0]} />;
};
