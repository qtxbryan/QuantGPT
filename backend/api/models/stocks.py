from pydantic import BaseModel 
from typing import List, Dict, Union

class StockAnalysis(BaseModel):
    ticker: str
    company_name: str
    live_price: float
    full_yfinance_data: dict
    # company_news: List[Dict[str, Union[str, float]]]
    # stock_performance: Dict[str, float]
    
    class Config:
        schema_extra = {
            'example': {
                'ticker': 'MSFT',
                'company_name': 'Microsoft Corporation',
                'live_price': 200.0,
                'live_volume': 1000000,
                'company_news': [{'title': 'Microsoft beats earnings expectations',}, 
                                 {'title': 'Microsoft acquires new company'}, 
                                 {'title': 'Microsoft releases new product'}],
                'full_yfinance_data': {
                    'industry': 'Consumer Electronics',
                    'sector': 'Technology',
                    'website': 'www.microsoft.com',
                    'full_time_employees': 100000,
                    'Previous Close': 199.91,
                    'Day Low': 199.15,
                    'Day High': 200.0,
                    '52 Week Low': 130.78,
                    '52 Week High': 203.59,
                    'Trailing P/E Ratio': 37.0,
                    'Forward P/E Ratio': 30.0,
                    'Volume': 1000000,
                    'Market Cap': 1500000000,
                }
            }
        }
    
    class Settings:
        name = 'stocks_analysis_data'