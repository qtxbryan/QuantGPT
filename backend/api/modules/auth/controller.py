from flask import request
from flask_restx import Namespace, Resource, fields
from api.modules.auth.service import AuthService
from api.models.auth import AuthModel
from flask_jwt_extended import jwt_required, get_jwt_identity


ns = Namespace('auth', description='Authentication related operations')

# Swagger models
auth_model = ns.model('Login', {
    'email': fields.String(required=True, description='User email'),
    'password': fields.String(required=True, description='User password'),
})


@ns.route('/register')
class RegisterResource(Resource):
    @ns.expect(auth_model, validate=True)
    def post(self):
        """
        Register a new user.
        """
        try:
            data = request.get_json()

            # Validate data
            register_data = AuthModel(**data)

            # Call the AuthService to create the user and save information
            response, status_code = AuthService.register_user(
                register_data.email, register_data.password)

            return response, status_code

        except Exception as e:
            return {
                'status_code': 400,
                'response_type': 'error',
                'description': "Invalid data",
                'error': str(e),
            }, 400


@ns.route('/login')
class LoginResource(Resource):
    @ns.expect(auth_model, validate=True)
    def post(self):
        """
        Login and return a JWT token.
        """
        try:
            data = request.get_json()

            # Validate with AuthModel
            login_data = AuthModel(**data)

            # Call the AuthService to authenticate the user
            response, status_code = AuthService.login_user(
                login_data.email,
                login_data.password
            )

            return response, status_code  # Return as a dictionary, no jsonify
        except Exception as e:
            return {
                "status_code": 400,
                "response_type": "error",
                "description": "Invalid data",
                "error": str(e),
            }, 400


@ns.route('/user')
class UserResource(Resource):
    @jwt_required()
    def get(self):
        """
        Get logged in user email
        """
        try:
            user_id = get_jwt_identity()

            user = AuthService.find_user_by_id(user_id)
            print(f"User found in database: {user}")

            if not user:
                return {
                    'status_code': 404,
                    'response_type': 'error',
                    'description': 'User not found',
                }

            return {"email": user["email"]}, 200
        except Exception as e:
            return {
                'status_code': 500,
                'response_type': 'error',
                'description': 'Server error',
                'error': str(e),
            }, 500
