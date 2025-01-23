import { Tab } from "./types";
import {
  BarChart,
  PieChart,
  Settings,
  Newspaper,
  ChartArea,
  ChartCandlestick,
  Handshake,
  Bot,
} from "lucide-react";

export const SIDEBAR_LINKS = [
  {
    icon: BarChart,
    label: "Summary",
    href: "/",
  },
  {
    icon: PieChart,
    label: "Portfolios",
    href: "/portfolios",
  },
  {
    icon: Newspaper,
    label: "News",
    href: "/news",
    badge: "10",
  },
  {
    icon: ChartArea,
    label: "Analysis",
    href: "/appointment",
  },
  {
    icon: ChartCandlestick,
    label: "Assets",
    href: "/analytics",
  },
  {
    icon: Handshake,
    label: "Discussion Forum",
    href: "/forum",
  },
  {
    icon: Bot,
    label: "Chatbot",
    href: "/chat",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/settings",
  },
];
export const HEADER_TABS: Tab[] = [
  {
    label: "Overview",
    href: "/",
  },
  {
    label: "Analysis",
    href: "/analysis",
  },
];

export const ACCORDION_TABS = [
  "AI Analysis",
  "Technical Analysis",
  "Fundamental Analysis",
];

export const NEWS_TABS: Tab[] = [
  { label: "Trending", href: "/news" },
  { label: "Latest", href: "/news/latest" },
  { label: "Top", href: "/news/top" },
];

export const PORTFOLIO_TABS: Tab[] = [
  { label: "Overview", href: "#overview" },
  { label: "Assets", href: "#assets" },
  { label: "Projections", href: "#projections" },
];

export const TIME_PERIODS = ["1d", "7d", "30d", "6m", "12m", "max"];
