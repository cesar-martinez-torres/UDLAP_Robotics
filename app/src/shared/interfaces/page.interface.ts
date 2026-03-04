import { JSX } from "react";

export interface ISection {
  display: string;
  clean: string;
}

export interface IPage {
  id: string;
  title: string;
  displayTitle: string;
  content: JSX.Element | JSX.Element[] | React.ReactNode;
  sections: ISection[];
  sectionKey?: string;
}

export interface ISectionGroup {
  sectionKey: string;
  displayName: string;
  pages: IPage[];
}
