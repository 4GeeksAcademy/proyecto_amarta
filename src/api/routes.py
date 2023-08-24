"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Producto, Tipo_prod, Favorito, Pedido, Carrito
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




@api.route("/favoritos/<int:user_id>/<int:prod_id>",methods = ["POST"])
def add_favorite(user_id,prod_id):
    fav = Favorito.query.filter_by(id_user=user_id,id_prod=prod_id).first()
    if fav is None:
        new_fav = Favorito(id_user = user_id,id_prod = prod_id)
        db.session.add(new_fav)
        db.session.commit()
        return jsonify({"msg":"ok - new favorite"}),200
    elif fav is not None:
        db.session.delete(fav)
        return jsonify({"msg":"ok - favorite deleted"}),200

@api.route("/favoritos/<int:user_id>",methods = ["GET"])
def get_favorites(user_id):
    favs = Producto.query.join(Favorito).filter(Favorito.id_user == user_id).all()
    data = [fav.serialize() for fav in favs]
    response_body = jsonify({
        "msg":"ok - all favs",
        "favoritos" : data
    })
    response_body.headers.add('Access-Control-Allow-Origin', '*')
    return response_body,200

@api.route('/api/carrito/<int:user_id>', methods=['GET'])
def get_carrito(user_id):
    user = User.query.get(user_id)
    if user is None:
        return jsonify({"msg": "Usuario no encontrado"}), 404
    
    carrito = user.carritos
    carrito_data = []
    for producto in carrito:
        carrito_data.append(producto.serialize())
    
    return jsonify({"msg": "OK - Productos en el carrito", "carrito": carrito_data}), 200

@api.route('/api/carrito/<int:user_id>', methods=['POST'])
def add_to_carrito(user_id):
    user = User.query.get(user_id)
    # producto = Producto.query.get(prod_id)
    
    if user is None:
        return jsonify({"msg": "Usuario o producto no encontrado"}), 404
    
    carrito_item = Carrito.query.filter_by(user_id=user_id, prod_id=prod_id).first()
    if carrito_item:
        carrito_item.cantidad += cantidad
    else:
        carrito_item = Carrito(user_id=user_id, prod_id=prod_id, cantidad=cantidad)
        db.session.add(carrito_item)
    
    db.session.commit()
    return jsonify({"msg": "OK - Producto añadido al carrito"}), 200

@api.route('/api/carrito/<int:user_id>/<int:prod_id>', methods=['DELETE'])
def remove_from_carrito(user_id, prod_id):
    user = User.query.get(user_id)
    producto = Producto.query.get(prod_id)
    
    if user is None or producto is None:
        return jsonify({"msg": "Usuario o producto no encontrado"}), 404
    
    carrito_item = Carrito.query.filter_by(user_id=user_id, prod_id=prod_id).first()
    if carrito_item:
        db.session.delete(carrito_item)
        db.session.commit()
        return jsonify({"msg": "OK - Producto eliminado del carrito"}), 200
    else:
        return jsonify({"msg": "Producto no encontrado en el carrito"}), 404