import { ReactNode } from "react";

export interface Tab {
  label: ReactNode;
  href: string;
}

export interface HeaderProps {
  headerTabs?: Tab[];
  title?: string;
}

export interface CardProps {
  image: string;
  title: string;
  description: string;
  date: string;
  source: string;
  index: number;
}
