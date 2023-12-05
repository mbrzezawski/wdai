from models import db, Person
from schemas import PersonSchema
from flask import jsonify, request
from app import app

@app.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'Hello, World!'})

@app.route('/example')
def example():
    data = {'key': 'value'}
    return jsonify(data)

@app.route('/<nazwa>')
def some_func(nazwa):
    nazwa = request.args.get("nazwa")
    # Endpoint logic here
    return jsonify({'nazwa': nazwa})
