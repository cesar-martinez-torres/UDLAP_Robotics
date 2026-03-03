import { JSX } from "react";

export interface ISection {
  display: string;
  clean: string;
}

export interface IMarkdownParserResult {
  title: string;
  displayTitle: string;
  sections: ISection[];
  content: JSX.Element | JSX.Element[] | React.ReactNode;
}
