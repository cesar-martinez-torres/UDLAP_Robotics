import { JSX } from "react";

export interface IMarkdownParserResult {
  title: string;
  sections: string[];
  content: JSX.Element | JSX.Element[] | React.ReactNode;
}
