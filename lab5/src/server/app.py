from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

app.config["JWT_SECRET_KEY"] = "super-secret"
jwt = JWTManager(app)

users_db = {
    "test": {
        "username": "test",
        "password_hash": generate_password_hash("test")
    }
}


@app.route('/login', methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    user = users_db.get(username)

    if not user or not check_password_hash(user["password_hash"], password):
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=username)
    return jsonify(token=access_token)


@app.route('/register', methods=["POST"])
def register():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    if username in users_db:
        return jsonify({"msg": "Username already exists"}), 400

    password_hash = generate_password_hash(password)
    users_db[username] = {"username": username, "password_hash": password_hash}

    access_token = create_access_token(identity=username)
    return jsonify(token=access_token)


@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


if __name__ == '__main__':
    app.run()
