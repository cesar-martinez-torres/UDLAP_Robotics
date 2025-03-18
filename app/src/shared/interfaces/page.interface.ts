import { JSX } from "react";

export interface IPage {
  id: string;
  title: string;
  content: JSX.Element | JSX.Element[] | React.ReactNode;
  sections: string[];
}
