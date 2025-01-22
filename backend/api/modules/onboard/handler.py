from api.extensions import mongo 

def add_user_information(user_id, onboarding_data):
    """
    Save user information into user_information collection.
    """
    user_information_collection = mongo.db.user_information 
    
    existing = user_information_collection.find_one({"user_id": user_id})
    
    if existing:
        user_information_collection.update_one(
            {"user_id": user_id},
            {"$set": onboarding_data}
        )
        return {"message": "User information updated successfully"}, 200
    else:
        onboarding_data["user_id"] = user_id
        user_information_collection.insert_one(onboarding_data)
        return {"message": "User information added successfully"}, 201
