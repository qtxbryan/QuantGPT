import logging 
from flask import request
from flask_restx import Namespace, Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from api.constants import RouteConstants
from api.exceptions import CustomHttpError
from api.modules.portfolio.handler import (get_portfolios, 
                                           add_portfolio, 
                                           get_portfolio,
                                           delete_portfolio,
                                           update_portfolio,
                                           get_constituent_table,
                                           get_portfolio_metrics,
                                           get_return_timeseries)
from api.models.portfolio import Portfolio
from api.utils.pydantic_utils import pydantic_to_restx_model

logging.basicConfig(level=logging.INFO)
LOGGER=logging.getLogger(__name__)

ns = Namespace('portfolio', description='Portfolio related operations')

portfolio_model = pydantic_to_restx_model(ns, 'Portfolio', Portfolio)

@ns.route('/')
class PortfolioListResource(Resource):
    @jwt_required()
    def get(self):
        """
        Get all portfolios for specific user 
        """
        response_data = dict()
        try:    
            user_id = get_jwt_identity()
            portfolios = get_portfolios(user_id)
            
            if portfolios:
                response_data['message'] = 'Portfolio retrieved successfully'
                response_data['status_code'] = 200
                response_data['data'] = [portfolio.model_dump() for portfolio in portfolios]

            else:
                response_data['message'] = 'No portfolios found for this user.'
                response_data['status_code'] = 404
                
        except Exception as err:
            LOGGER.error(f"Error retrieving portfolios: {err}")
            raise CustomHttpError.generic_error_message()
        
        return response_data, response_data['status_code']        

    @jwt_required()
    @ns.expect(portfolio_model, validate=False)
    def post(self):
        """
        Add a new portfolio for specific user
        """
        response_data = dict()
        try:
            user_id = get_jwt_identity()
            data = request.get_json()
            
            # validate input with portfolio model
            portfolio = Portfolio(**data)
            new_portfolio = add_portfolio(user_id, portfolio)
            
            if new_portfolio:
                response_data['message'] = 'Portfolio added successfully'
                response_data['status_code'] = 200
                response_data['data'] = new_portfolio.model_dump()
            else:
                response_data['message'] = 'Error adding portfolio'
                response_data['status_code'] = 500
                
        except Exception as err:
            LOGGER.error(f"Error adding portfolio: {err}")
            raise CustomHttpError.generic_error_message()
        
        return response_data, response_data['status_code']
            
@ns.route('/<string:p_name>')
class PortfolioResource(Resource):
    @jwt_required()
    def get(self, p_name):
        """
        Get specific portfolio for specific user
        """
        response_data = dict()
        try:
            user_id = get_jwt_identity()
            portfolio = get_portfolio(user_id, p_name)
            
            if portfolio:
                response_data['message'] = 'Portfolio retrieved successfully'
                response_data['status_code'] = 200
                response_data['data'] = portfolio.model_dump()
            
            else:
                response_data['message'] = 'Portfolio not found'
                response_data['status_code'] = 404
            
        except Exception as err:
            LOGGER.error(f"Error retrieving portfolio: {err}")
            raise CustomHttpError.generic_error_message()
        
        return response_data, response_data['status_code']
    
    @jwt_required()
    def delete(self, p_name):
        """
        Delete specific portfolio for specific user
        """
        response_data = dict()
        try: 
            user_id = get_jwt_identity()
            is_deleted = delete_portfolio(user_id, p_name)
            
            if is_deleted:
                response_data['message'] = f'Portfolio {p_name} deleted successfully'
                response_data['status_code'] = 200
            else:
                response_data['message'] = f'Portfolio {p_name} not found'
                response_data['status_code'] = 404
            
        except Exception as err:
            LOGGER.error(f"Error deleting portfolio {p_name}: {err}")
            raise CustomHttpError.generic_error_message()
        
        return response_data, response_data['status_code']
        
    @jwt_required()
    def put(self, p_name):
        """
        Update specific portfolio for specific user
        """
        response_data = ()
        try:
            user_id = get_jwt_identity()
            data = request.get_json()
            
            updated_portfolio = update_portfolio(user_id, p_name, data)
            
            if updated_portfolio:
                response_data['message'] = f'Portfolio {p_name} updated successfully'
                response_data['status_code'] = 200
                response_data['data'] = updated_portfolio.model_dump()
            else:
                response_data['message'] = f'Portfolio {p_name} not found'
                response_data['status_code'] = 404
        
        except Exception as err:
            LOGGER.error(f"Error updating portfolio {p_name}: {err}")
            raise CustomHttpError.generic_error_message()
        
        return response_data, response_data['status_code']
        
@ns.route('/<string:analysis_type>/<string:tickers>/<string:weights>/<string:start_date>/<string:end_date>/<string:initial_investment>')
class PortfolioAnalysisResource(Resource):
    def get(self, analysis_type, tickers, weights, start_date, end_date, initial_investment):
        """
        Perform analysis on the portfolio based on the analysis type
        """
        LOGGER.info(f"Performing {analysis_type} analysis for tickers: {tickers}, weights: {weights}, "
                    f"start: {start_date}, end: {end_date}, initial: {initial_investment}")
        
        # Compare passed in analysis_type with key in RouteConstants.ANALYSIS_METHODS
        method_name = RouteConstants.ANALYSIS_METHODS.get(analysis_type)
        if not method_name:
            raise CustomHttpError(
                message=f"Invalid analysis type {analysis_type}",
                status_code=404,
                error_type='InvalidAnalysisType'
            )
        
        # Checks if current class PortfolioAnalysisResource has the methods defined in RouteConstants.ANALYSIS_METHODS    
        if hasattr(self, method_name):
            return getattr(self, method_name)(tickers, weights, start_date, end_date, initial_investment)
        else:
            raise CustomHttpError(
                message=f"Method {method_name} not implemented",
                status_code=500,
                error_type='MethodNotImplemented'
            )
            
    def get_return_time_series(self, tickers, weights, start_date, end_date, initial_investment):
        """
        Get portfolio return time series data
        """
        response_data = dict()
        try:
            stocks = tickers.split(";")
            weights = weights.split(";")
            
            portfolio_ts = get_return_timeseries(stocks, weights, start_date, end_date, initial_investment, interval='M')
            response_data['message'] = 'Portfolio time series retrieved successfully'
            response_data['status_code'] = 200
            response_data['data'] = portfolio_ts
        except Exception as err:
            LOGGER.error(f"Error retrieving portfolio time series: {err}")
            raise CustomHttpError.generic_error_message()
        
        return response_data, response_data['status_code']
    def get_time_series(self, tickers, weights, start_date, end_date, initial_investment):
        """
        Get portfolio time series data
        """
        
        
    def get_metrics(self, tickers, weights, start_date, end_date, initial_investment):
        """
        Get portfolio metrics data
        """
        response_data = dict()
        try:
            stocks = tickers.split(";")
            weights = weights.split(";")
            
            portfolio_metrics = get_portfolio_metrics(stocks, weights, start_date, end_date, initial_investment) 
            response_data['message'] = 'Constituent table retrieved successfully'
            response_data['status_code'] = 200
            response_data['data'] = portfolio_metrics
        
        except Exception as err:
            LOGGER.error(f"Error retrieving portfolio metrics: {err}")
            raise CustomHttpError.generic_error_message()
        
        return response_data, response_data['status_code']
        
    
    def get_asset_exposure(self, tickers, weights, start_date, end_date, initial_investment):
        """
        Get portfolio assets exposure data
        """
    
    def get_sector_exposure(self, tickers, weights, start_date, end_date, initial_investment):
        """
        Get portfolio sector exposure data
        """
    
    def get_constituent(self, tickers, weights, start_date, end_date, initial_investment):
        """
        Get portfolio constituent data
        """
        
    def get_max_drawdown_ts(self, tickers, weights, start_date, end_date, initial_investment):
        """
        Get portfolio max dropdown time series data
        """
    
    def get_allocation_drift_ts(self, tickers, weights, start_date, end_date, initial_investment):
        """
        Get portfolio allocation drift time series data
        """
    
    def get_top_movers(self, tickers, weights, start_date, end_date, initial_investment):
        """
        Get portfolio top movers data
        """
        
    def get_sector_ts(self, tickers, weights, start_date, end_date, initial_investment):
        """
        Get portfolio sector time series data
        """
    
    def get_drift_sector_ts(self, tickers, weights, start_date, end_date, initial_investment):
        """
        Get portfolio drift sector time series data
        """
    
    def get_sector_box_chart(self, tickers, weights, start_date, end_date, initial_investment):
        """
        Get portfolio sector box chart data
        """
    
    def get_sector_metrics(self, tickers, weights, start_date, end_date, initial_investment):
        """
        Get portfolio sector metrics data
        """

    def get_constituent_table(self, tickers:str, weights:str, start_date:str, end_date:str, initial_investment:float):
        """
        Get portfolio constituent table data
        """
        response_data = dict()
        try:
            stocks = tickers.split(";")
            weights = weights.split(";")
            
            constituent_table = get_constituent_table(stocks, weights, start_date, end_date, initial_investment)
            response_data['message'] = 'Constituent table retrieved successfully'
            response_data['status_code'] = 200
            response_data['data'] = constituent_table
        except Exception as err:
            LOGGER.error(f"Error retrieving constituent table: {err}")
            raise CustomHttpError.generic_error_message()
        
        return response_data, response_data['status_code']
        
    def get_portfolio_summary(self, tickers, weights, start_date, end_date, initial_investment):
        """
        Get portfolio summary data
        """
        
    def get_portfolio_recommendation(self, tickers, weights, start_date, end_date, initial_investment):
        """
        Get portfolio recommendation data
        """

@ns.route('/recommended_allocation/<string:lastPart>')
class RecommendedAllocationResource(Resource):
    def get(self, lastPart):
        """
        Get recommended allocation for the simulated portfolio
        """