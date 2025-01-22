import yfinance as yf
import numpy as np
from datetime import date, timedelta
import pandas as pd
import ta
import logging 
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from api.utils.news_analyzer import get_latest_news

logging.basicConfig(level=logging.INFO)
LOGGER = logging.getLogger(__name__)

class StockAnalyzer: 
    def __init__(self, ticker: str):
        self.asset_name = ticker
        self.asset = self._get_asset(ticker)
        self.asset_info = self.asset.info
        self.company_name = self.asset_info['shortName']
        self.etf = 'fundFamily' in self.asset_info.keys()
        
    def _get_asset(self, ticker: str):
        try:
            res = yf.Ticker(ticker)
            info = res.info
        except Exception as e:
            raise ValueError(
                f"Failed to fetch data for ticker {ticker}. Error: {str(e)}"
            )

        return res

    def get_current_price(self):
        if self.etf:
            return self.asset_info['open']
        else:
            return self.asset_info['currentPrice']
    
    def get_asset_info(self):
        return self.asset_info
    
    def get_stock_performance(self, days):
        """Get Stock price change in percentage

        Args:
            days (_type_): _description_
        """
        
        past_date = date.today() - timedelta(days)
        ticker_data = yf.Ticker(self.asset_name)
        # price data from start til latest trading day
        history = ticker_data.history(start=past_date)
        
        old_price = history.iloc[0]['Close']
        current_price = history.iloc[-1]['Close']
        
        percent_change = ((current_price - old_price) / old_price) * 100
        return percent_change
    
    def preprocess_fundamental_data(self, raw_data):
        processed_data = {}
        
        for key, value in raw_data.items():
            if value is not None:
                if isinstance(value, (int, float)):
                    # format numeric values with commas 
                    processed_data[key] = "{:,}".format(value)
                else:
                    processed_data[key] = value
        
        return processed_data  
    
    def get_yf_fundamentals_for_analysis(self):
        fundamental_data = self.asset_info
        
        if self.etf:
            market_data = {
                'Total Assets': fundamental_data.get('totalAssets'),
                '52-Week Low': fundamental_data.get('fiftyTwoWeekLow'),
                '52-Week High': fundamental_data.get('fiftyTwoWeekHigh'),
                '50-Day Average': fundamental_data.get('fiftyDayAverage'),
                '200-Day Average': fundamental_data.get('twoHundredDayAverage'),
                'NAV Price': fundamental_data.get('navPrice'),
                'Currency': fundamental_data.get('currency'),
                'Category': fundamental_data.get('category'),
                'YTD Return': fundamental_data.get('ytdReturn'),
                'Fund Family': fundamental_data.get('fundFamily'),
                'Fund Inception Date': fundamental_data.get('fundInceptionDate'),
                'Legal Type': fundamental_data.get('legalType'),
            }
        else: 
            market_data = {
                'Average Volume': fundamental_data.get('averageVolume'),
                'Market Cap': fundamental_data.get('marketCap'),
                'Trailing PE': fundamental_data.get('trailingPE'),
                'Forward PE': fundamental_data.get('forwardPE'),
                'Beta': fundamental_data.get('beta'),
                '52-Week Low': fundamental_data.get('fiftyTwoWeekLow'),
                '52-Week High': fundamental_data.get('fiftyTwoWeekHigh'),
                'Dividend Yield': fundamental_data.get('dividendYield'),
                'Dividend Rate': fundamental_data.get('dividendRate'),
                'Profit Margins': fundamental_data.get('profitMargins'),
                'Operating Margins': fundamental_data.get('operatingMargins'),
                'Gross Margins': fundamental_data.get('grossMargins'),
                'EBITDA': fundamental_data.get('ebitda'),
                'Revenue': fundamental_data.get('revenue'),
                'Revenue Per Share': fundamental_data.get('revenuePerShare'),
                'Gross Profits': fundamental_data.get('grossProfits'),
                'Total Cash': fundamental_data.get('totalCash'),
                'Total Debt': fundamental_data.get('totalDebt'),
                'Current Ratio': fundamental_data.get('currentRatio'),
                'Quick Ratio': fundamental_data.get('quickRatio'),
                'Total Revenue': fundamental_data.get('totalRevenue'),
                'Debt to Equity': fundamental_data.get('debtToEquity'),
                'Return on Assets': fundamental_data.get('returnOnAssets'),
                'Return on Equity': fundamental_data.get('returnOnEquity'),
                'Operating Cash Flow': fundamental_data.get('operatingCashflow'),
                'Free Cash Flow': fundamental_data.get('freeCashflow')
            }
        
        market_data = {key: value for key, value in market_data.items() if value is not None}
        
        return self.preprocess_fundamental_data(market_data)
    
    
    def get_stock_price_timeseries(self, start_date_str, freq):
        """Get Stock Price Time Series Data

        Args:
            start_date_str (_type_): _description_
            freq (_type_): _description_
        """
        end_date = date.today()
        end_date_str = "{}-{}-{}".format(end_date.year, end_date.month, end_date.day)
        
        data = yf.download(self.asset_name, start=start_date_str, end=end_date_str)[['Close']]
        LOGGER.info(f' Downloading asset data {self.asset_name} from {start_date_str} to {end_date_str}')
        
        if freq == 'M':
            data = data.resample('M').last()
        elif freq == 'YE':
            data = data.resample('YE').last()
            
        data = data.reset_index()
        data['Date'] = data['Date'].apply(lambda x: x.date())
        data.columns = ['Date', 'Close']
        
        return [{
            'dates': list(data['Date']),
            'values': [round(y,2) for y in list(data['Close'])],
            'name': self.asset_name
        }]
    
    # TODO need change out the technical indicators
    def get_technical_analysis(self, start_date):
        end_date = date.today()
        end_date_str = "{}-{}-{}".format(end_date.year, end_date.month, end_date.day)  
        data = yf.download(self.asset_name, start=start_date, end=end_date_str)
        
        # Add technical indicators)
        data.columns = [col[0] for col in data.columns]
        data = ta.add_all_ta_features(data, open="Open", high="High", low="Low", close="Close", volume="Volume", fillna=True)
        
        data.dropna(inplace=True)
        
        latest_values = data.iloc[-1]
        
        buy_signal = (
            (latest_values['trend_macd'] > latest_values['trend_macd_signal']) and
            (latest_values['momentum_rsi'] < 30) and
            (latest_values['momentum_stoch_rsi_k'] < 0.2) and
            (latest_values['trend_adx'] > 25) and
            (latest_values['trend_ema_fast'] > latest_values['trend_ema_slow']) and
            (latest_values['trend_sma_fast'] > latest_values['trend_sma_slow']) and
            (latest_values['volume_obv'] > latest_values['volume_obv_mean']) and
            (latest_values['volatility_bbh'] < latest_values['close']) and
            (latest_values['volatility_bbl'] > latest_values['close']) and
            (latest_values['volatility_bbp'] < 0.05) 
        )

        sell_signal = (
            (latest_values['trend_macd'] < latest_values['trend_macd_signal']) and
            (latest_values['momentum_rsi'] > 70) and
            (latest_values['momentum_stoch_rsi_k'] > 0.8) and
            (latest_values['trend_adx'] > 25) and
            (latest_values['trend_ema_fast'] < latest_values['trend_ema_slow']) and
            (latest_values['trend_sma_fast'] < latest_values['trend_sma_slow']) and
          
            (latest_values['volatility_bbh'] > latest_values['close']) and
            (latest_values['volatility_bbl'] < latest_values['close']) and
            (latest_values['volatility_bbp'] > 0.95) 
        )
        if (sell_signal and buy_signal) or (not buy_signal and not buy_signal):
            signal = 'Neutral'
        elif buy_signal and not sell_signal:
            signal = 'Buy'
        else:
            signal = 'Sell'
            
        # Construct dictionary with indicators and buy/sell signals
        technical_analysis = {
            'MACD': latest_values['trend_macd'],
            'MACD Signal': latest_values['trend_macd_signal'],
            'RSI': latest_values['momentum_rsi'],
            'Stoch RSI K': latest_values['momentum_stoch_rsi_k'],
            'ADX': latest_values['trend_adx'],
            'EMA Fast': latest_values['trend_ema_fast'],
            'EMA Slow': latest_values['trend_ema_slow'],
            'SMA Fast': latest_values['trend_sma_fast'],
            'SMA Slow': latest_values['trend_sma_slow'],
            'Volume OBV': latest_values['volume_obv'],
            # 'Volume OBV Mean': latest_values['volume_obv_mean'],
            'BBH': latest_values['volatility_bbh'],
            'BBL': latest_values['volatility_bbl'],
            'BBP': latest_values['volatility_bbp'],
            'Signal': signal,
            # 'Sell Signal': sell_signal
        }
        
        LOGGER.info(f'Technical analysis: {technical_analysis}')
        
        for key, value in technical_analysis.items():
            # check if value is a float, if so do rounding
            if isinstance(value, float):
                technical_analysis[key] = round(value, 2)
        
        return technical_analysis
    
    def stock_summary(self, start_date='2020-01-01'):
        fundamental_data = self.get_yf_fundamentals_for_analysis()
        technical_data = self.get_technical_analysis(start_date)
        
    def get_top_company_news(self):
        vader = SentimentIntensityAnalyzer()
        news = []
        
        
        