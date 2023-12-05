from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///demo.sqlite"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)
ma = Marshmallow(app)

class Person(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    surname = db.Column(db.String)
    job = db.Column(db.String)

class PersonSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Person
        include_relationships = True  # Dodaj, jeśli masz związki między tabelami


with app.app_context():
    db.create_all()

    person1 = Person(name='John', surname='Doe', job='Developer')
    person2 = Person(name='Jane', surname='Doe', job='Designer')

    db.session.add_all([person1, person2])
    db.session.commit()

@app.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'Hello, World!'})

@app.route('/example')
def example():
    # Pobierz dane z bazy danych
    people = Person.query.all()

    # Przygotuj dane do odpowiedzi JSON
    person_schema = PersonSchema(many=True)
    result = person_schema.dump(people)

    return jsonify(result)

@app.route('/<nazwa>')
def some_func(nazwa):
    nazwa = request.args.get("nazwa")
    # Endpoint logic here
    return jsonify({'nazwa': nazwa})

if __name__ == '__main__':
    app.run()