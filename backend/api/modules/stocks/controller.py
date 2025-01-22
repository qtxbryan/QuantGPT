import logging 
from flask import jsonify 
from flask_restx import Namespace, Resource, fields, reqparse 
from flask_jwt_extended import jwt_required, get_jwt_identity
from api.exceptions import CustomHttpError
from api.modules.stocks.handler import get_stock_analysis, get_stock_time_series

logging.basicConfig(level=logging.INFO)
LOGGER = logging.getLogger(__name__)

ns = Namespace('stock', description='Stocks related operations')

@ns.route('/<string:ticker>')
class StocksResource(Resource):
    def get(self, ticker):
        """Get stock data
        """
        response_data = dict()
        
        try: 
            # get the stock data here 
            stock_analysis = get_stock_analysis(ticker)
            if stock_analysis:
                response_data['message'] = 'Stock data retrieved successfully'
                response_data['status_code'] = 200
                response_data['data'] = stock_analysis.model_dump()
            else:
                response_data['message'] = 'No stock data found'
                response_data['status_code'] = 404
            
        except Exception as err:
            LOGGER.error(f"Error getting stock data: {err}")
            raise CustomHttpError.generic_error_message()
        
        return response_data, response_data['status_code']
        
        
@ns.route('/stock_time_series/<string:ticker>/<string:start_date_str>/<string:freq>')
class StockTimeSeriesResource(Resource):
    def get(self, ticker, start_date_str, freq):
        """Get stock price time series data
        """
        response_data = dict()
        
        try: 
            # get the stock time series data here 
            stock_analysis_list = get_stock_time_series(ticker, start_date_str, freq)
            if stock_analysis_list:
                response_data['message'] = 'Stock time series retrieved'
                response_data['status_code'] = 200
                # Convert datetime.date to string in the 'dates' field
                for entry in stock_analysis_list:
                    entry['dates'] = [date.isoformat() for date in entry['dates']]
                    
                response_data['data'] = stock_analysis_list
            else:
                response_data['message'] = 'No stock time series data found'
                response_data['status_code'] = 404
                
        except Exception as err:
            LOGGER.error(f"Error getting stock time series data: {err}")
            raise CustomHttpError.generic_error_message()
        
        return response_data, response_data['status_code']
            