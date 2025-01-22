import logging 
from flask_restx import Namespace, Resource
from api.exceptions import CustomHttpError
from api.modules.news.handler import get_headlines, get_news_feed, get_portfolio_news

logging.basicConfig(level=logging.INFO)
LOGGER = logging.getLogger(__name__)

ns = Namespace('news', description='News related operations')

@ns.route('/<string:ticker>/<int:limit>')
class NewsResource(Resource):
    def get(self, ticker, limit):
        """
        Get count number of news articles for specific ticker 
        """
        response_data = dict()
        try:
            news_feed = get_news_feed(symbol=ticker, limit=limit)
            if news_feed:
                response_data['message'] = 'News feed retreived successfully'
                response_data['status_code'] = 200 
                response_data['data'] = [news.model_dump() for news in news_feed]
            else:
                response_data['message'] = f'No news found for symbol : {ticker}'
                response_data['status_code'] = 404
                
        except Exception as err:
            LOGGER.error(f'Error getting news data: {err}')
            raise CustomHttpError.generic_error_message()
    
        return response_data, response_data['status_code']
        

@ns.route('/headlines/<string:category>/<int:limit>')
class HeadlinesResource(Resource):
    def get(self, category, limit):
        """
        Get count number of news headlines for specific category 
        """
        response_data = dict()
        try:
            headlines = get_headlines(category=category, limit=limit)
            if headlines:
                response_data['message'] = 'Headlines retrieved successfully'
                response_data['status_code'] = 200
                response_data['data'] = [headline.model_dump() for headline in headlines]
            else:
                response_data['message'] = 'No headlines found'
                response_data['status_code'] = 404
        except Exception as err:
            LOGGER.error(f'Error retrieving headlines: {err}')
            raise CustomHttpError.generic_error_message()
        
        return response_data, response_data['status_code']
        

@ns.route('/portfolio/<string:stocks>/<int:limit>')
class PortfolioRelatedNewsResource(Resource):
    def get(self, stocks, limit):
        """
        Get count number of news articles for specific stocks in portfolio 
        Input: 
            stocks: AAPL;MSFT;GOOGL
            limit: 3
        """
        # AAPL;MSFT;GOOGL
        stocks = stocks.split(';')
        response_data = dict()
        try:
            news_list = get_portfolio_news(stocks, limit)
            if news_list:
                response_data['message'] = 'News articles retrieved successfully'
                response_data['status_code'] = 200
                response_data['data'] = [news.model_dump() for news in news_list]
            else:
                response_data['message'] = 'No news articles found'
                response_data['status_code'] = 404
        except Exception as err:
            LOGGER.error(f'Error retrieving news articles: {err}')
            raise CustomHttpError.generic_error_message()
        
        return response_data, response_data['status_code'] 
        
@ns.route('/evaluate_news')
class NewsEvaluationResource(Resource):
    def get(self):
        """
        Evaluate news articles for sentiment analysis
        """


