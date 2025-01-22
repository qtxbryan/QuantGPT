from api.models.portfolio import Portfolio
from api.extensions import mongo
from typing import List, Optional, Dict
import logging 
from api.utils.portfolio_analyzer import PortfolioAnalyzer

logging.basicConfig(level=logging.INFO)
LOGGER=logging.getLogger(__name__)

user_information_collection = mongo.db.user_information

def get_portfolios(user_id: str) -> List[Portfolio]:
    """
    Fetch all portfolios 
    """
    # fetch the user information
    user_information = user_information_collection.find_one({"user_id": user_id})
    if user_information and "portfolios" in user_information:
        return [Portfolio(**portfolio) for portfolio in user_information["portfolios"]]
    
    LOGGER.info(f"No portfolios found for user: {user_id}")
    return []

def get_portfolio(user_id: str, p_name: str) -> Optional[Portfolio]:
    """
    Fetch a specific portfolio
    """
    try:
        # fetch the user information
        user_information = user_information_collection.find_one({"user_id": user_id})
        
        if not user_information:
            LOGGER.error(f"User {user_id} not found in user_information collection")
            return None
        
        # Search portfolio by name 
        portfolios = user_information.get('portfolios', [])
        for portfolio_data in portfolios:
            if portfolio_data.get('portfolio_name') == p_name:
                return Portfolio(**portfolio_data)
        
        LOGGER.info(f"Portfolio {p_name} not found for user {user_id}")
        return None
    except Exception as err:
        LOGGER.error(f'Error retrieving portfolio {p_name} for user {user_id}: {err}')
        raise
    
def add_portfolio(user_id: str, new_portfolio: Portfolio) -> Portfolio:
    """
    Add a new portfolio to a user's portfolio list
    """
    try:
        user_information = user_information_collection.find_one({"user_id": user_id})
        
        if not user_information:
            LOGGER.error(f"User {user_id} not found in user_information collection")
            return None
        
        
        # fetch existing portfolios
        portfolios = user_information.get('portfolios', [])
        # add new validated portfolio to the list
        portfolios.append(new_portfolio.model_dump())
        # update the user information collection
        user_information_collection.update_one(
            {'user_id': user_id},
            {'$set': {'portfolios': portfolios}}
        )
        LOGGER.info(f'Portfolio added for user_id: {user_id}')
        
        return new_portfolio
        
    except Exception as err:
        LOGGER.error(f'Error validating or adding portfolio: {err}')
        raise

def delete_portfolio(user_id:str, portfolio_name: str) -> bool:
    """
    Delete a specific portfolio for a user 
    """
    try:
        user_information = user_information_collection.find_one({"user_id": user_id})
        
        if not user_information:
            LOGGER.error(f'User {user_id} not found in user_information collection')
            return False 
        
        # filter out the portfolio with matching name 
        portfolios = user_information.get('portfolios', [])
        updated_portfolios = [
            p for p in portfolios if p.get('portfolio_name') != portfolio_name
        ]
        
        if len(portfolios) == len(updated_portfolios):
            LOGGER.info(f'Portfolio {portfolio_name} not found for user {user_id}')
            return False
        
        user_information_collection.update_one(
            {'user_id': user_id},
            {'$set': {'portfolios': updated_portfolios}}
        )
        LOGGER.info(f'Portfolio {portfolio_name} deleted for user {user_id}')
        return True 
    except Exception as err:
        LOGGER.error(f'Error deleting portfolio {portfolio_name} for user {user_id}: {err}')
        raise
    
def update_portfolio(user_id: str, portfolio_name: str, data: dict) -> Optional[Portfolio]:
    """
    Update a specific portfolio for a user 
    """
    try:
        user_information = user_information_collection.find_one({"user_id": user_id})
        
        if not user_information:
            LOGGER.error(f'User {user_id} not found in user_information collection')
            return None 
        
        # filter out the portfolio with matching name 
        portfolios = user_information.get('portfolios', [])
        for portfolio in portfolios:
            if portfolio.get('portfolio_name') == portfolio_name:
                # Update the portfolio with the provided data
                portfolio.update({k: v for k, v in data.items() if v is not None})
                break
            else:
                LOGGER.info(f'Portfolio {portfolio_name} not found for user {user_id}')
                return None
        
        user_information_collection.update_one(
            {'user_id': user_id},
            {'$set': {'portfolios': portfolios}}
        )
            
        LOGGER.info(f'Portfolio {portfolio_name} updated for user {user_id}')
        return Portfolio(**portfolio)
    
    except Exception as err:
        LOGGER.error(f'Error updating portfolio {portfolio_name} for user {user_id}: {err}')
        raise

def get_constituent_table(stocks: str, weights: str, start_date:str, end_date: str, initialInvestment: float) -> Dict:
    """
    Get the constituent table for given portfolio
    """
    try:
        portfolio_evaluator = PortfolioAnalyzer(
            stocks, weights, start_date, end_date, initialInvestment
        )
        
        timeseries_dict = {
            'value': portfolio_evaluator.get_correct_format_portfolio_timeseries(),
        }
        
        return timeseries_dict
    
    except Exception as err:
        LOGGER.error(f'Error generating constituent table: {err}')
        raise

def get_portfolio_metrics(stocks: str, weights: str, start_date:str, end_date:str, initialInvestment: float) -> Dict:
    """
    Get the portfolio metrics
    """
    try:
        portfolio_evaluator = PortfolioAnalyzer(
            stocks, weights, start_date, end_date, initialInvestment
        )
        metrics = portfolio_evaluator.calculate_metrics()
        return metrics
    except Exception as err:
        LOGGER.error(f'Error calculating portfolio metrics: {err}')
        raise

def get_return_timeseries(stocks: str, weights: str, start_date:str, end_date:str, initialInvestment: float, interval: str) -> Dict:
    """
    Get the return timeseries for the portfolio
    """
    try:
        portfolio_evaluator = PortfolioAnalyzer(
            stocks, weights, start_date, end_date, initialInvestment
        )
        return_timeseries = portfolio_evaluator.analyse_returns_timeseries(interval)
        return return_timeseries
    except Exception as err:
        LOGGER.error(f'Error calculating return timeseries: {err}')
        raise