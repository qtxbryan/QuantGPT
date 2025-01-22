from api.models.stocks import StockAnalysis
from api.utils.stock_analyzer import StockAnalyzer

def get_stock_analysis(ticker: str) -> StockAnalysis:
    try:
        stock_obj: StockAnalyzer = StockAnalyzer(ticker)
    
    except:
        return None
    
    if stock_obj:
        stock_analysis = StockAnalysis(
            ticker=ticker,
            company_name=stock_obj.company_name,
            live_price=stock_obj.get_current_price(),
            full_yfinance_data=stock_obj.get_asset_info(),
            company_news=None, 
            stock_performance=None
        )
        return stock_analysis

    return None

def get_stock_fundamental_analysis(ticker: str):
    try:
        stock_obj: StockAnalyzer = StockAnalyzer(ticker)
    except:
        return None
    
    if stock_obj:
        return stock_obj.get_yf_fundamentals_for_analysis()
    
    return None

# TODO get technical analysis 



def get_stock_time_series(ticker: str, start_date_str:str, freq:str):
    try:
        stock_obj: StockAnalyzer = StockAnalyzer(ticker)
    except:
        return None
    
    if stock_obj:
        stock_analysis = stock_obj.get_stock_price_timeseries(start_date_str=start_date_str, freq=freq)
        
        return stock_analysis

    return None
