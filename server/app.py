from flask import make_response, jsonify, request, session

# Local imports
from config import app, db, api, Resource
from models import db, User


@app.route("/")
def howdy():
    return "Howdy partner!"

if __name__ == '__main__':
    app.run(port=5555, debug=True)