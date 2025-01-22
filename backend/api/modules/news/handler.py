import logging 
from api.utils.news_analyzer import get_top_finance_news, get_top_company_news, get_relevant_news
from api.exceptions import CustomHttpError
from api.models.news import NewsArticle

logging.basicConfig(level=logging.INFO)
LOGGER = logging.getLogger(__name__)

    
def get_headlines(category='general', limit=10):
    """Get the top finance news headlines

    Args:
        category (str, optional): Defaults to 'general'.
        limit (int, optional): Defaults to 10.
    Return:
        list: List of NewsArticle
    """
    try:
        LOGGER.info(f"Fetching top finance news in category: {category}")
        news_articles = get_top_finance_news(category=category, limit=limit)
        return [NewsArticle(**article.model_dump()) for article in news_articles]
    
    except Exception as err:
        LOGGER.error(f"Error in getting headlines: {err}")
        raise CustomHttpError.generic_error_message()    
        
def get_news_feed(symbol, limit=10):
    """
    Get the top company-specific news feed.

    :param symbol: The company stock ticker symbol.
    :param limit: The number of top news articles to fetch. Defaults to 10.
    :return: list: List of NewsArticle
    """
    try:
        LOGGER.info(f"Fetching top company news for symbol: {symbol}")
        news_articles = get_top_company_news(symbol=symbol, limit=limit)
        return [NewsArticle(**article.model_dump()) for article in news_articles]
    except Exception as e:
        LOGGER.error(f"Error in get_news_feed: {e}")
        raise CustomHttpError.generic_error_message()
    
def get_portfolio_news(stocks, limit=10):
    """Get relevant news article for a list of stocks

    Args:
        stocks (str): Semicolon separated list of stock symbols
        limit (int, optional): The number of top news articles to fetch. Defaults to 10.
    
    Return: 
        list: List of NewsArticle
    """
    try:
        LOGGER.info(f"Fetching news for portfolio: {stocks} with limit: {limit} per stock")
        portfolio_news = get_relevant_news(stocks=stocks, limit=limit)
        if not portfolio_news:
            LOGGER.warning(f"No relevant news found for portfolio: {stocks}")
            return []
        return portfolio_news
    except Exception as err:
        LOGGER.error(f"Error in get_portfolio_news_feed: {err}")
        raise CustomHttpError.generic_error_message()