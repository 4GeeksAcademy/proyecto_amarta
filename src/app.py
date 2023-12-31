"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import JWTManager
#from models import Person
#IMPORTAR LA FUNCION Mail() de flask_mail
from flask_mail import Mail
import stripe

stripe_keys = {
    "secret_key": os.environ["STRIPE_SECRET_KEY"],
    "publishable_key": os.environ["STRIPE_PUBLISHABLE_KEY"],
}

stripe.api_key = stripe_keys["secret_key"]

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type = True)
db.init_app(app)

# Allow CORS requests to this API
CORS(app)
app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
jwt = JWTManager(app)

#CONFIGURACION EMAIL EXTERNO 
mail_settings = {
    "MAIL_SERVER": 'sandbox.smtp.mailtrap.io',
    "MAIL_PORT":  2525,
    "MAIL_USE_TLS": True,
    "MAIL_USE_SSL": False,
    "MAIL_USERNAME":  '41eb55eaca7f2a', #ACA COLOQUEN EL CORREO DE LA APP DEL ALUMN
    "MAIL_PASSWORD": '9cbef140a6b7fe', #PASSWORD DEL CORREO DE LA APP DEL ALUMNO
    "MAIL_DEFAULT_SENDER": 'sandbox.smtp.mailtrap.io'
}


app.config.update(mail_settings)
mail = Mail(app)
#agregan mail a la app y se va llamar en routes.py como current_app
app.mail= mail
#FIN CONFIGURACION EMAIL


# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0 # avoid cache memory
    return response

@app.route('/config',methods = ['GET'])
def get_publishable_key():
    stripe_config = {"publicKey": stripe_keys["publishable_key"]}
    return jsonify(stripe_config)

@app.route('/payment',methods = ['POST'])
def stripe_payment():
    request_body = request.get_json(force=True)
    base_url = os.getenv('FRONTEND_URL')
    data = []
   
    for item in request_body["carrito"]:
       
        data.append({
            "price":item["id_precio"],
            "quantity":item["cantidad"],

        })
    checkout_session = stripe.checkout.Session.create(
        success_url=base_url+"/payment_ok",
        cancel_url = base_url+"/payment_canceled",
        payment_method_types=["card"],
        mode="payment",
        line_items=data
    )
    
    return jsonify({"sessionId":checkout_session["id"]}),200


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
