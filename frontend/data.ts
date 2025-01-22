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
