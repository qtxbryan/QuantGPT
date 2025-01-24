export interface Asset {
  icon: string;
  title: string;
  ticker: string;
  percentage: number;
}

export interface CompositionFormProps {
  availableAssets: Array<{
    icon: string;
    title: string;
    ticker: string;
  }>;
}
