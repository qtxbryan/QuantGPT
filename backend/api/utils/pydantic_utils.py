from flask_restx import fields

def pydantic_to_restx_model(api, name, schema):
    """
    Convert a Pydantic model schema to a Flask-RESTx model, including support for nested objects and arrays.
    """
    flask_fields = {}
    properties = schema.schema()['properties']

    for field_name, field_props in properties.items():
        field_type = field_props.get('type')
        if field_type == 'string':
            flask_fields[field_name] = fields.String(description=field_props.get('description'))
        elif field_type == 'integer':
            flask_fields[field_name] = fields.Integer(description=field_props.get('description'))
        elif field_type == 'array':
            # Handle arrays (assuming arrays of strings for simplicity)
            if 'items' in field_props and field_props['items'].get('type') == 'string':
                flask_fields[field_name] = fields.List(fields.String, description=field_props.get('description'))
            elif 'items' in field_props and field_props['items'].get('type') == 'integer':
                flask_fields[field_name] = fields.List(fields.Integer, description=field_props.get('description'))
            else:
                flask_fields[field_name] = fields.List(fields.Raw, description=field_props.get('description'))
        elif field_type == 'object':
            # Handle nested objects
            nested_name = f"{name}_{field_name}"
            nested_schema = field_props.get('properties', {})
            flask_fields[field_name] = fields.Nested(
                pydantic_to_restx_model(api, nested_name, schema.__annotations__[field_name])
            )
        else:
            flask_fields[field_name] = fields.Raw(description=field_props.get('description'))

    return api.model(name, flask_fields)
