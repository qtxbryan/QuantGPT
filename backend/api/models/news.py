from pydantic import BaseModel

class NewsArticle(BaseModel):
    title: str
    source: str 
    date: str 
    description: str 
    url: str
    sentiment: str 
    
    class Config: 
        schema_extra = {
            'example': {
                'title': 'Microsoft beats earnings expectations',
                'source': 'CNBC',
                'date': '2021-12-12T12:00:00',
                'description': 'Microsoft beats earnings expectations for the quarter',
                'url': 'www.cnbc.com/microsoft-beats-earnings',
                'sentiment': 'Positive'
                }
        }
        
    class Setting:
        name = 'news_feed_data'