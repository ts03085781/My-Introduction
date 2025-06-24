export interface PortfolioItem {
  id: number;
  title: string;
  image: string;
  description: string;
  tags: string[];
  github: string;
  demo: string;
}

export type PortfolioItems = PortfolioItem[];
