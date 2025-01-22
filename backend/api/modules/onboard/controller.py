from flask import request
from flask_restx import Namespace, Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from api.models.user import User
from api.modules.onboard.handler import add_user_information
from api.utils.pydantic_utils import pydantic_to_restx_model

ns = Namespace('onboard', description='User onboarding operations')

user_model = pydantic_to_restx_model(ns, 'User', User)

@ns.route('/')
class OnboardResource(Resource):
    @jwt_required()
    @ns.expect(user_model, validate=True)
    def post(self):
        """
        Onboard a user by adding detailed information (creates record in `user_information` collection).
        """
        try:
            # get user id from JWT
            user_id = get_jwt_identity()
            
            # validate
            data = request.get_json()
            onboarding_data = User(**data)

            # Call the OnboardService to save user details
            response, status_code = add_user_information(
                user_id, 
                onboarding_data.model_dump()
            )

            return response, status_code
        except Exception as e:
            return {
                "status_code": 400,
                "response_type": "error",
                "description": "Invalid data",
                "error": str(e),
            }, 400
