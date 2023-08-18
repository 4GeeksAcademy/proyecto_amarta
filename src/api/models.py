from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    nombre = db.Column(db.String)
    apellido = db.Column(db.String)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "nombre":self.nombre,
            "apellido":self.apellido
            # do not serialize the password, its a security breach
        }

class Producto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100))
    descripcion = db.Column(db.String(250))
    propiedades = db.Column(db.String(250))
    ingredientes_tec = db.Column(db.String(250))
    ingredientes_prin = db.Column(db.String(250))
    metodo_utilizacion = db.Column(db.String(250))
    tamanyo = db.Column(db.Integer)
    medicion = db.Column(db.String(5))
    precio = db.Column(db.Integer)
    id_tipo = db.Column(db.Integer,db.ForeignKey('tipo_prod.id'))

    def __repr__(self):
        return f'<producto: {self.nombre}>'
    
    def serialize(self):
        return{
            "id_producto": self.id,
            "nombre":self.nombre,
            "descripcion":self.descripcion,
            "propiedes":self.propiedades,
            "ingredientes tecnicos":self.ingredientes_tec,
            "ingredientes principales":self.ingredientes_prin,
            "metodo utilizacion":self.metodo_utilizacion,
            "tamaño":self.tamanyo + self.medicion,
            "precio":self.precio
        }

class Tipo_prod(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100))
    productos = db.relationship('Producto',backref='tipo_prod',lazy=True)

    def __repr__(self):
        return f'<tipo: {self.nombre}>'
    
    def serialize(self):
        return{
            "id_tipo": self.id,
            "nombre":self.nombre,
        }
    
class Favorito(db.Model):
    id_user = db.Column(db.Integer,db.ForeignKey('user.id'),primary_key=True)
    id_prod = db.Column(db.Integer,db.ForeignKey('producto.id'),primary_key=True)

    def __repr__(self):
        return f'<id_user: {self.id_user} <-> id_prod: {self.id_prod}'
    
    def serialize(self):
        return{
            "id_user":self.id_user,
            "id_prod":self.id_prod
        }

class Pedido(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    id_user = db.Column(db.Integer,db.ForeignKey('user.id'),nullable=False)
    id_prod = db.Column(db.Integer,db.ForeignKey('producto.id'),primary_key=True)
    cantidad = db.Column(db.Integer)

    def __repr__(self):
        return f'<id_pedido: {self.id}, id_user: {self.id_user}, id_prod: {self.id_prod}, cantidad: {self.cantidad}'
    
    def serialize(self):
        return{
            "id":self.id,
            "id_user":self.id_user,
            "id_prod":self.id_prod,
            "cantidad":self.cantidad
        }

carrito_prods = db.Table('carrito_prods',
                    db.Column('id_carrito',db.Integer,db.ForeignKey('carrito.id'),primary_key=True),
                    db.Column('id_producto',db.Integer,db.ForeignKey('producto.id'),primary_key=True),)

class Carrito(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    id_user = db.Column(db.Integer,db.ForeignKey('user.id'))
    prods = db.relationship('Producto',secondary=carrito_prods,lazy='subquery',
                            backref = db.backref('carritos',lazy=True))
    