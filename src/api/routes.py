"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.models import db, User, Producto, Tipo_prod, Favorito, Pedido, Carrito
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
#importamos Message() de flask_mail
from flask_mail import Message 
#importamos ramdom y string para generar una clave aleatoria nueva
import random
import string


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
    
    user = User(email=request_body["email"],password=request_body["password"],nombre=request_body["nombre"],apellido=request_body["apellidos"])

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
    # print(producto.serialize())
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
        db.session.commit()
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

@api.route('/carrito/<int:user_id>', methods=['GET'])
def get_carrito(user_id):
    carrito = db.session.query(Carrito.cantidad,Producto.id,Producto.nombre,Producto.precio,Producto.url_img).join(Producto).filter(Carrito.id_user==user_id).all()
    data = []
    for item in carrito:
        producto = {
            "id":item[1],
            "nombre":item[2],
            "precio":item[3],
            "cantidad":item[0],
            "img":item[4],
            "total":int(item[3])*int(item[0])
        }
        data.append(producto)
    response_body = jsonify({
        "msg": "ok - carrito",
        "carrito" : data
    })
    return response_body, 200

@api.route('/carrito/<int:user_id>', methods=['POST'])
def add_to_carrito(user_id):
    request_body = request.get_json(force=True)
    inCarrito = Carrito.query.filter_by(id_user=user_id,id_prod=request_body["producto"]).first()
    print(inCarrito)
    if inCarrito is None:
        newCarritoItem = Carrito(id_user = user_id,id_prod=request_body["producto"],cantidad=request_body["cantidad"])
        print(newCarritoItem)
        db.session.add(newCarritoItem)
        db.session.commit()
        return jsonify({"msg": "ok - Added To carrito"})
    elif inCarrito is not None:
        inCarrito.cantidad += int(request_body["cantidad"])
        db.session.commit()
        return jsonify({"msg":"ok - Carrito updated",
                        "cantidad":inCarrito.cantidad})
    
    return jsonify({"msg":"Error desconocido"}),200

@api.route('/carrito/<int:user_id>/<int:prod_id>', methods=['DELETE'])
def delete_from_carrito(user_id,prod_id):
    item = Carrito.query.filter_by(id_user=user_id,id_prod=prod_id).first()
    if item is None:
        return jsonify({"msg":"No econtrado en el carrito"}),200
    else:
        db.session.delete(item)
        db.session.commit()
        return jsonify({"msg":"ok - Eliminado del carrito"}),200
    
@api.route('/carrito/<int:user_id>/<int:prod_id>', methods=['PUT'])
def update_from_carrito(user_id,prod_id):
    request_body = request.get_json(force=True)
    item = Carrito.query.filter_by(id_user=user_id,id_prod=prod_id).first()
    if item is None:
        return jsonify({"msg":"No econtrado en el carrito"}),200
    else:
        item.cantidad = request_body["cantidad"]
        db.session.commit()
        return jsonify({"msg":"ok - Carrito actualizado","cantidad":request_body["cantidad"]}),200

#RECUPERACION CONTRASEÑA OLVIDADA 
@api.route("/forgotpassword", methods=["POST"])
def forgotpassword():
    recover_email = request.json['email']
    recover_password = ''.join(random.choice(string.ascii_uppercase + string.digits) for x in range(8)) #clave aleatoria nueva
    
    if not recover_email:
        return jsonify({"msg": "Debe ingresar el correo"}), 401
	#busco si el correo existe en mi base de datos
    user = User.query.filter_by(email=recover_email).first()
    if recover_email != user.email:
        return jsonify({"msg": "El correo ingresado no existe en nuestros registros"}), 400
    #si existe guardo la nueva contraseña aleatoria
    user.password = recover_password
    db.session.commit()
	#luego se la envio al usuario por correo para que pueda ingresar
    msg = Message("Hi", recipients=[recover_email])
    msg.html = f"""<h1>Su nueva contraseña es: {recover_password}</h1>"""
    current_app.mail.send(msg)
    return jsonify({"msg": "Su nueva clave ha sido enviada al correo electrónico ingresado"}), 200

#ENVIAR MENSAJE A TIENDA
@api.route("/enviarmensaje", methods=["POST"])
def enviarmensaje():
    data = request.json
    msg = Message("Nuevo mensaje", recipients=["info@amarta.com"])
    msg.html = f"""<h1>Contacto de: {data["nombre"]} {data["apellido"]} {data["email"]}</h1> <p>Mensaje: {data["mensaje"]}</p>"""
    current_app.mail.send(msg)
    return jsonify({"msg": "Mensaje enviado correctamente"}), 200
    