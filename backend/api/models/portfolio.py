from pydantic import BaseModel, Field
from flask import Flask, request, jsonify 
from typing import List, Optional

class PortfolioTrades(BaseModel):
    trade_date: str
    instrument_code: str 
    qty: int
    price: float 
    transaction: str 
    
class Portfolio(BaseModel):
    portfolio_name: str 
    portfolio_trades: List[PortfolioTrades]
    
    class Config:
        json_schema_extra = {
            'example': {
                'portfolio_name': 'My Portfolio',
                'portfolio_trades': [
                    {
                        'trade_date': '2021-01-01',
                        'instrument_code': 'AAPL',
                        'qty': 100,
                        'price': 100.0,
                        'transaction': 'BUY'
                    }
                ]
            }
        }
    
class UpdatePortfolioModel(BaseModel):
    portfolio_name: Optional[str]
    portfolio_trades: Optional[List[PortfolioTrades]]
    
    class Config:
        json_schema_extra = {
            'example': {
                'portfolio_name': 'My Portfolio',
                'portfolio_trades': [
                    {
                        'trade_date': ['2021-01-01', '2021-01-02'],
                        'instrument_code': ['AAPL', 'GOOGL'],
                        'qty': [100,50],
                        'price': [90,100.0],
                        'transaction': ['BUY', 'BUY']
                    }
                ]
            }
        }