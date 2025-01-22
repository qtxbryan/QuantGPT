import yfinance as yf
import numpy as np
import pandas as pd
from api.utils.stock_analyzer import StockAnalyzer
from api.utils.news_analyzer import get_top_company_news

class PortfolioAnalyzer:
    def __init__(self, stocks, weights, start_date, end_date, initial_investment):
        self.stocks = stocks
        self.weights = [float(w) for w in weights]
        self.start_date = start_date
        self.end_date = end_date
        self.initial_investment = float(initial_investment)
        self.data = yf.download(self.stocks, start=self.start_date, end=self.end_date)['Adj Close']
        self.portfolio_metrics = None
        
    def download_data(self, convert_data=True):
        data = yf.download(self.stocks, start=self.start_date, end=self.end_date)['Adj Close']
        data.index = [str(x.date()) for x in data.index]
        if convert_data:
            return self.convert_date(data)
        else:
            return data
    
    # TODO NEED CHANGE OUT THE METRICS
    def calculate_metrics(self):
        # Calculate daily returns
        returns = self.data.pct_change().dropna()

        # Calculate portfolio value over time
        portfolio_value = self.initial_investment * np.cumprod(1 + np.dot(returns, self.weights))

        # Calculate portfolio returns
        portfolio_returns = (portfolio_value[-1] / portfolio_value[0]) - 1

        # Calculate the number of years
        num_years = len(returns) / 252 if len(returns) > 252 else 1  # Adjust 252 to the appropriate number of trading days in a year

        # Calculate annualized portfolio returns
        annualized_portfolio_returns = (1 + portfolio_returns) ** (1 / num_years) - 1

        # Calculate portfolio volatility (standard deviation of daily returns)
        portfolio_volatility = np.std(np.dot(returns, self.weights))

        # Calculate annualized portfolio volatility
        annualized_portfolio_volatility = portfolio_volatility * np.sqrt(252)  # Annualize daily volatility

        # Calculate the Sharpe ratio
        risk_free_rate = 0.0  # Adjust as needed
        sharpe_ratio = (annualized_portfolio_returns - risk_free_rate) / annualized_portfolio_volatility

        # Calculate maximum drawdown
        cumulative_returns = portfolio_value / self.initial_investment
        peak_idx = np.argmax(np.maximum.accumulate(cumulative_returns) - cumulative_returns)
        trough_idx = np.argmax(cumulative_returns[:peak_idx])
        max_drawdown = cumulative_returns[peak_idx] - cumulative_returns[trough_idx]

        # Calculate the Calmar ratio (assuming a risk-free rate of 0%)
        calmar_ratio = portfolio_returns / max_drawdown

        # Calculate the Sortino ratio (assuming a target return of 0%)
        target_return = 0.0
        downside_returns = np.minimum(returns - target_return, 0)
        downside_volatility = np.std(np.dot(downside_returns, self.weights))
        sortino_ratio = (portfolio_returns - target_return) / downside_volatility

        # Calculate Treynor ratio
        beta = np.cov(returns, rowvar=False)[0, 1]
        treynor_ratio = (portfolio_returns - risk_free_rate) / beta
        
        self.portfolio_metrics = {
            "Initial Investment": self.initial_investment,
            "Final Portfolio Value": portfolio_value[-1],
            "Portfolio Returns": portfolio_returns,
            "Annualized Portfolio Returns": annualized_portfolio_returns,
            "Portfolio Volatility": portfolio_volatility,
            "Annualized Portfolio Volatility": annualized_portfolio_volatility,
            "Sharpe Ratio": sharpe_ratio,
            "Max Drawdown": max_drawdown,
            "Calmar Ratio": calmar_ratio,
        }
        
        # Round the metrics to 2 decimal places
        for key, value in self.portfolio_metrics.items():
            if isinstance(value, (int, float)):
                self.portfolio_metrics[key] = round(value, 2)

        return self.portfolio_metrics
    
    """Qualittative summary"""
    def get_portfolio_summary(self):
        metrics = self.calculate_metrics()
        
        company_news = []
        
        for x in self.stocks:
            company_news += get_top_company_news(symbol=x, limit=3)
        
        # get sector exposure 
        
        # get sector metrics 
        
        # prepare template for prompt 
        template = f"""
        
        """
        
    
    def get_portfolio_timeseries(self):
        initial_value = {}
        for i, x in enumerate(self.stocks):
            initial_value[x] = [self.initial_investment * self.weights[i]]
        
        returns = self.data.pct_change().dropna()
        dates_list = [str(x.date()) for x in returns.cumsum().index]
        constitutents_breakdown = pd.DataFrame((np.array(returns.cumsum()) + 1)* np.array(pd.DataFrame(initial_value)), index = dates_list, columns = returns.cumsum().columns)
        constitutents_breakdown['Portfolio Value'] = constitutents_breakdown[constitutents_breakdown.columns].sum(axis = 1)
        return constitutents_breakdown
    
    def get_correct_format_portfolio_timeseries(self):
        constituents_breakdown = self.get_portfolio_timeseries()
        ts_list = []
        for x in constituents_breakdown.columns:
            data_dict = {
                'dates': list(constituents_breakdown[x].index),
                'values': [round(y,2) for y in list(constituents_breakdown[x].values)],
                'ticker': x
            }
            ts_list.append(data_dict)
        
        return ts_list
    
    def analyse_returns_timeseries(self, interval='M'):
        portfolio_ts = self.get_portfolio_timeseries()
        df = portfolio_ts.reset_index()
        df['index'] = pd.to_datetime(df['index'])
        df = df.set_index('index')
        df = df.resample(interval).last().pct_change().dropna()
        ts_list = []
        data_dict = {'dates':[str(x.date()) for x in list(df['Portfolio Value'].index)], \
        'values':[round(x*100,2) for x in list(df['Portfolio Value'].values)],
        }
        ts_list.append(data_dict)
        return ts_list