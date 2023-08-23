"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Producto, Tipo_prod
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


api= Blueprint('api', __name__)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

    
@api.route("/signup", methods=["POST"])
def signup():  
    request_body = request.get_json(force=True)
    email = request.json.get("email", None)
    
    #creacion de un registro en la tabla de user 
    if "nombre" not in request_body:
        return jsonify({"msg": "You have to put your name"}), 404
    
    if "apellidos" not in request_body:
        return jsonify({"msg": "You have to put your surnames"}), 404
    
    if "email" not in request_body:
        return jsonify({"msg": "You have to put an email"}), 404
    
    email_query = User.query.filter_by(email=request_body["email"]).first()
    
    if email_query != None:
        return jsonify({"msg": "User already exists"}), 400
        
    if "password" not in request_body:
        return jsonify({"msg": "You have to put a password"}), 404
    
    user = User(email=request_body["email"],password=request_body["password"],nombre=request_body["nombre"],apellidos=request_body["apellidos"],)

    db.session.add(user)
    db.session.commit()

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    
    user = User.query.filter_by(email=email).first()
    
    if user is None:
        return jsonify({"msg": "User doesn't exist"}), 404
    
    if email != user.email or password != user.password:
        return jsonify({"msg": "Bad username or password"}), 401
    
    access_token = create_access_token(identity=email)
    response = jsonify({"access_token":access_token, "user": user.serialize() })
    
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response, 200

@api.route("/private", methods=["GET"])
@jwt_required()
def get_profile():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    
    return jsonify(user.serialize()), 200

@api.route("/catalogo", methods=["GET"])
def get_products():
    productos = Producto.query.all()
    data = [producto.serialize() for producto in productos]
    return jsonify(data), 200

@api.route("/tipo_producto", methods=["GET"])
def get_tipo_producto():
    tipo_producto = Tipo_prod.query.all()
    data = [tipo.serialize() for tipo in tipo_producto]
    return jsonify(data), 200

@api.route("/producto/<int:id_producto>", methods=["GET"])
def get_une_product(id_producto):
    producto = Producto.query.filter_by(id = id_producto).first()
    print(producto.serialize())
    response_body = {
        "msg": "ok",
        "data": producto.serialize()
    }

    return jsonify(response_body), 200


    
    