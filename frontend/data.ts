export const HOLDINGS_MOCK = [
  {
    ticker: "AAPL",
    holdingValue: 10000,
    initialInvestment: 8000,
    change1D: 2.5,
    change1M: 5.2,
    changeYTD: 15.3,
    changeOverall: 25.0,
  },
  {
    ticker: "GOOGL",
    holdingValue: 15000,
    initialInvestment: 12000,
    change1D: -1.2,
    change1M: 3.8,
    changeYTD: 10.5,
    changeOverall: 25.0,
  },
  {
    ticker: "MSFT",
    holdingValue: 12000,
    initialInvestment: 10000,
    change1D: 1.8,
    change1M: 4.5,
    changeYTD: 12.7,
    changeOverall: 20.0,
  },
];

export const HOLDINGS_CHART_MOCK = {
  AAPL: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Stock Price",
        data: [150, 155, 160, 165, 170, 175],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  },
  GOOGL: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Stock Price",
        data: [2800, 2850, 2900, 2950, 3000, 3050],
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
    ],
  },
  MSFT: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Stock Price",
        data: [300, 310, 320, 330, 340, 350],
        borderColor: "rgb(53, 162, 235)",
        tension: 0.1,
      },
    ],
  },
};

export const NEWS_DATA_MOCK = [
  {
    title: "IYW: Tech Stocks Due For A Breather",
    source: "SeekingAlpha",
    date: "2025-01-22T18:06:45",
    description:
      "IYWâs technical outlook shows negative momentum divergence, suggesting a possible test of the 200-day moving average. Click here to read why IYW ETF is a Hold.",
    url: "https://finnhub.io/api/news?id=c9054fc68fcfea700ed8d5a71d8d92eec901506895d2b6d1110347392788317e",
    sentiment: "Negative",
  },
  {
    title:
      "Apple Miami Worldcenter opens Friday, January 24, in downtown Miami",
    source: "Finnhub",
    date: "2025-01-22T17:09:03",
    description:
      "The new store offers customers the full lineup of products and features an industry-leading environmental store design...",
    url: "https://finnhub.io/api/news?id=694d30002912bbfd7d33c3e9fe53eddaa9ecf9501aef7055bd0e7a97ad861bcf",
    sentiment: "Neutral",
  },
  {
    title: "Harding Loevner Global Equity Q4 2024 Report",
    source: "SeekingAlpha",
    date: "2025-01-22T17:00:00",
    description:
      "The Global Equity composite fell 0.86% gross of fees in the fourth quarter, in line with the 0.89% decline of the MSCI ACWI Index.",
    url: "https://finnhub.io/api/news?id=88aa6dca33bf2b79b4dd6455ec870b2218dedbf9c6e71a1765d4f728ad2465b7",
    sentiment: "Negative",
  },
];

export const TIME_SERIES_MOCK = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Portfolio Value",
      data: [1200, 1500, 1700, 1400, 1800, 2000],
      borderColor: "#7dd1e7",
      backgroundColor: "rgba(125, 209, 231, 0.3)",
    },
    {
      label: "Invested Amount",
      data: [1000, 1300, 1600, 1200, 1700, 1900],
      borderColor: "#fbbf24",
      backgroundColor: "rgba(251, 191, 36, 0.3)",
    },
  ],
};

export const CHART_DATA_MOCK = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Total Value",
      data: [
        50000, 51000, 52000, 54000, 53000, 55000, 56000, 57000, 58000, 58144.8,
      ],
      borderColor: "#7dd1e7",
      backgroundColor: "rgba(125, 209, 231, 0.1)",
    },
    {
      label: "Invested Capital",
      data: [
        50000, 50500, 51000, 51500, 52000, 52500, 53000, 53500, 54000, 54500,
      ],
      borderColor: "#a8d897",
      backgroundColor: "rgba(168, 216, 151, 0.1)",
    },
  ],
};

export const PORTFOLIO_DATA_MOCK = [
  {
    id: "1",
    name: "Tech Growth Portfolio",
    value: 25000.0,
    change: 15.3,
    composition: "AAPL 40%, GOOGL 30%, MSFT 30%",
  },
  {
    id: "2",
    name: "Dividend Income",
    value: 18000.0,
    change: 5.7,
    composition: "JNJ 25%, PG 25%, KO 25%, VZ 25%",
  },
  {
    id: "3",
    name: "Green Energy",
    value: 15144.8,
    change: -2.1,
    composition: "TSLA 40%, ENPH 30%, SEDG 30%",
  },
];

export const PORTFOLIO_PERFORMANCE_MOCK = {
  labels: [
    "Dec 2020",
    "Jan 2021",
    "Feb 2021",
    "Mar 2021",
    "Apr 2021",
    "May 2021",
    "Jun 2021",
  ],
  datasets: [
    {
      label: "Portfolio",
      data: [100, 120, 115, 125, 110, 130, 125],
      borderColor: "#7dd1e7",
      backgroundColor: "rgba(125, 209, 231, 0.1)",
      tension: 0.4,
    },
    {
      label: "S&P 500",
      data: [100, 110, 108, 115, 105, 120, 115],
      borderColor: "#a8d897",
      backgroundColor: "rgba(168, 216, 151, 0.1)",
      tension: 0.4,
    },
  ],
};

export const PORTFOLIO_METRICS_MOCK = [
  { title: "Annualized Return", value: "15.1%" },
  { title: "Cumulative Return", value: "16.9%" },
  { title: "Max Drawdown", value: "5.2%" },
  { title: "Sharpe Ratio", value: "1.13" },
  { title: "Sortino Ratio", value: "1.37" },
  { title: "Volatility", value: "18.2%" },
  { title: "Beta", value: "0.90" },
  { title: "Correlation to S&P 500", value: "0.85" },
  { title: "Alpha", value: "1.8%" },
  { title: "Treynor Ratio", value: "1.25" },
];

export const PORTFOLIO_ALLOCATIONS_MOCK = [
  { name: "US Stocks", percentage: 45 },
  { name: "International Stocks", percentage: 25 },
  { name: "US Bonds", percentage: 15 },
  { name: "International Bonds", percentage: 10 },
  { name: "Commodities", percentage: 3 },
  { name: "Real Estate", percentage: 2 },
];

export const PORTFOLIO_ASSETS_MOCK = [
  { name: "Apple Inc.", allocation: 10, value: 20000 },
  { name: "Microsoft Corp.", allocation: 8, value: 16000 },
  { name: "Amazon.com Inc.", allocation: 7, value: 14000 },
  { name: "Alphabet Inc.", allocation: 5, value: 10000 },
  { name: "Meta Platforms Inc.", allocation: 4, value: 8000 },
];

export const PORTFOLIO_MOVERS = [
  { asset: "Apple Inc.", price: 200, change: -20, changePercent: -1 },
  { asset: "Microsoft Corp.", price: 160, change: 5, changePercent: 3 },
  { asset: "Amazon.com Inc.", price: 140, change: 10, changePercent: 7 },
  { asset: "Alphabet Inc.", price: 100, change: -5, changePercent: -4 },
  { asset: "Meta Platforms Inc.", price: 80, change: -3, changePercent: -2 },
];

export const ASSETS_MOCK = [
  {
    icon: "/placeholder.svg",
    title: "Global Equity",
    ticker: "VT",
    description: "Vanguard Total World Stock ETF",
    price: 98.45,
    change: 1.23,
  },
  {
    icon: "/placeholder.svg",
    title: "US Equity",
    ticker: "VTSAX",
    description: "Vanguard Total Stock Market Index Fund",
    price: 105.67,
    change: -0.45,
  },
  {
    icon: "/placeholder.svg",
    title: "Real Estate",
    ticker: "VNQ",
    description: "Vanguard Real Estate Index Fund",
    price: 82.31,
    change: 0.78,
  },
  {
    icon: "/placeholder.svg",
    title: "International Equity",
    ticker: "VEA",
    description: "Vanguard FTSE Developed Markets ETF",
    price: 47.89,
    change: -0.32,
  },
  {
    icon: "/placeholder.svg",
    title: "Emerging Markets Equity",
    ticker: "VWO",
    description: "Vanguard FTSE Emerging Markets ETF",
    price: 41.23,
    change: 1.56,
  },
  {
    icon: "/placeholder.svg",
    title: "Clean Energy",
    ticker: "ICLN",
    description: "iShares Global Clean Energy ETF",
    price: 18.75,
    change: 2.14,
  },
];
