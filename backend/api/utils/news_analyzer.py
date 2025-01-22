import finnhub
import logging
from config import Config
from datetime import datetime, timedelta
from api.models.news import NewsArticle
from api.exceptions import CustomHttpError
from nltk.sentiment.vader import SentimentIntensityAnalyzer

logging.basicConfig(level=logging.INFO)
LOGGER = logging.getLogger(__name__)

finnhub_client = finnhub.Client(api_key=Config.FINNHUB_API_KEY)
sentiment_analyzer = SentimentIntensityAnalyzer()

def unix_to_iso8601(timestamp):
    """
    Convert a Unix timestamp to ISO 8601 string.

    :param timestamp: Unix timestamp (int)
    :return: ISO 8601 formatted string
    """
    if not isinstance(timestamp, int):
        return ""
    return datetime.fromtimestamp(timestamp).isoformat()
    
def analyze_sentiment(description):
    """Analyse the sentiment of the news description (summary)

    Args:
        description (str): News article description
    Return:
        str: Sentiment of the news article
    """
    if not description:
        return "Neutral" # Default if no description
    sentiment_scores = sentiment_analyzer.polarity_scores(description)
    compound_score = sentiment_scores['compound']
    
    if compound_score > 0.05:
        return "Positive"
    elif compound_score < -0.05:
        return "Negative"
    else:
        return "Neutral"

def get_top_finance_news(category='general', limit=10):
    """Fetch Top finance news from finnhubb

    Args:
        category (str, optional): Category of news to fetch. Defaults to 'general'.
        limit (int, optional): No. of tops news to fetch. Defaults to 10.
    Return:
        list: List of NewsArticle
    """
    try:
        LOGGER.info(f"Fetching top finance news in category: {category}")
        finance_news = finnhub_client.general_news(category=category)
        if not finance_news:
            return []
        
        news_articles = [
            NewsArticle(
                title=article.get('headline', ''),
                source=article.get('source', ''),
                date=unix_to_iso8601(article.get('datetime', '')),
                description=article.get('summary', ''),
                url=article.get('url', ''),
                sentiment=analyze_sentiment(article.get('summary', ''))
            )
            for article in finance_news[:limit]
        ]
        
        LOGGER.info(f"Fetched {len(news_articles)} top finance news articles")
        return news_articles
    
    except Exception as err:
        LOGGER.error(f"Error fetching top finance news: {err}")
        raise CustomHttpError.generic_error_message()
    
def get_top_company_news(symbol, limit=10):
    """Fetch top company news for a given symbol

    Args:
        symbol (str): stock ticker
        limit (int, optional): No. of top news to fetch. Defaults to 10.
    Return:
        list: List of NewsArticle
    """
    current_time = datetime.now()
    start_time = current_time - timedelta(days=7) # fetch news from the past 7 days
    start_date = start_time.strftime('%Y-%m-%d')
    end_date = current_time.strftime('%Y-%m-%d')
    
    try:
        LOGGER.info(f"Fetching top company news for {symbol} from {start_date} to {end_date}")
        company_news = finnhub_client.company_news(symbol=symbol, _from=start_date, to=end_date)
        if not company_news:
            return []
        
        news_articles = [
            NewsArticle(
                title=article.get('headline', ''),
                source=article.get('source', ''),
                date=unix_to_iso8601(article.get('datetime', '')),
                description=article.get('summary', ''),
                url=article.get('url', ''),
                sentiment=analyze_sentiment(article.get('summary', ''))
            )
            for article in company_news[:limit]
        ]
        
        news_articles.sort(key=lambda x: x.date, reverse=True)
        LOGGER.info(f"Fetched {len(news_articles)} top company news articles for {symbol}")
        return news_articles
    except Exception as err:
        LOGGER.error(f"Error fetching top company news for {symbol}: {err}")
        raise CustomHttpError.generic_error_message()

def get_relevant_news(stocks, limit=10):
    """Get relevant news for a list of stocks

    Args:
        stocks (_type_): _description_
        limit (int, optional): _description_. Defaults to 10.

    Returns:
        _type_: List of NewsArticle
    """
    try:
        news_list = []
        for ticker in stocks:
            news_list+= get_top_company_news(ticker, limit)
            
        return news_list
    
    except Exception as err:
        LOGGER.error(f"Error fetching news for portfolio: {err}")
        raise CustomHttpError.generic_error_message()


def get_daily_news(symbol):
    current_time = datetime.now()
    start_time = current_time - timedelta(days=1)
    start_date = start_time.strftime('%Y-%m-%d')
    end_date = current_time.strftime('%Y-%m-%d')
    
    try:
        LOGGER.info(f"Fetching news for {symbol} from {start_date} to {end_date}")
        latest_news = finnhub_client.company_news(symbol=symbol, _from=start_date, to=end_date)
        if len(latest_news) == 0:
            return []
        
        news_articles = [
            NewsArticle(
                title=article.get('headline', ''),
                source=article.get('source', ''),
                date=article.get('datetime', ''),
                description=article.get('summary', ''),
                url=article.get('url', ''),
                langchain_evaluation="Pending Evaluation"
            )
            for article in latest_news
        ]
        # sort it by date time, newest one first
        news_articles.sort(key=lambda x: x['time'], reverse=True)
        LOGGER.info(f"Fetched {len(news_articles)} news articles for {symbol}")
    
    except Exception as e:
        LOGGER.error(f"Error fetching news for {symbol}: {e}")
        raise CustomHttpError.generic_error_message()
    
def get_latest_news(symbol): 
    current_time = datetime.now()
    start_time = current_time - timedelta(hours=12)
    start_date = start_time.strftime('%Y-%m-%d')
    end_date = current_time.strftime('%Y-%m-%d')
    
    try: 
        latest_news = finnhub_client.company_news(symbol=symbol, _from=start_date, to=end_date)
        if len(latest_news) == 0:
            return []
        
        news_articles = [
            NewsArticle(
                title=article.get('headline', ''),
                source=article.get('source', ''),
                date=article.get('datetime', ''),
                description=article.get('summary', ''),
                url=article.get('url', ''),
                langchain_evaluation="Pending Evaluation"
            )
            for article in latest_news
        ]
        # sort it by date time, newest one first
        news_articles.sort(key=lambda x: x['time'], reverse=True)
        LOGGER.info(f"Fetched {len(news_articles)} news articles for {symbol}")
        
    except Exception as e:
        LOGGER.error(f"Error fetching news for {symbol}: {e}")
        raise CustomHttpError.generic_error_message()
        
        