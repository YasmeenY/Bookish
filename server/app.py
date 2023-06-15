from flask import make_response, jsonify, request, session
from flask_bcrypt import Bcrypt

# Local imports
from config import app, db, api, Resource, bcrypt
from models import db, User, List, BookInList


@app.route("/")
def Home():
    return "Home Route"

class ClearSession( Resource ):
    
    def delete( self ):

        session[ 'page_views' ] = None
        session[ 'user_id' ] = None

        return {}, 204

class Signup( Resource ):
    
    def post( self ):

        try:
            username = request.get_json()[ 'username' ]
            email = request.get_json()[ 'email' ]
            password = request.get_json()[ 'password' ]
        except KeyError:
            return { "error": "Missing a required field in the form." }, 400
        
        user_exists = User.query.filter_by(email=email).first() is not None
        
        if user_exists:
            return jsonify({"error": "User already exists"}, 409)
        
        hashed_password = bcrypt.generate_password_hash(password.encode( 'utf-8' ))
        new_user = User(
            username = username,
            email = email,
            password = hashed_password
        )
        db.session.add( new_user )
        db.session.commit()

        session[ 'user_id' ] = new_user.id
        
        return user_to_dict( new_user ), 201

class Login( Resource ):

    def post( self ):
        try:
            username = request.get_json()[ 'username' ]
            password = request.get_json()[ 'password' ]
        except TypeError:
            return { "error": "Missing 'username' or 'password'." }, 400
        
        user = User.query.filter( User.username == username ).first()

        if user.authenticate( password ):
            session[ 'user_id' ] = user.id
            return user_to_dict( user ), 200

        else:
            return { "error": "Members Only Content, Unauthorized Access!"}, 401
        
class Logout( Resource ):

    def delete( self ):
        session[ 'user_id' ] = None
        return {}, 204

class CheckSession( Resource ):

    def get( self ):
        if session.get( 'user_id' ):
            user = User.query.filter( User.id == session[ 'user_id' ]).first()
            return user_to_dict( user ), 200
        else:
            return {}, 204

api.add_resource( Signup, '/signup', endpoint = 'signup' )
api.add_resource( Login, '/login', endpoint='login' )
api.add_resource( Logout, '/logout', endpoint='logout' )
api.add_resource( CheckSession, '/check_session', endpoint='check_session' )

def user_to_dict( user ):
    return {
        "id": user.id,
        "username": user.username,
        "password": user.password.decode( 'utf-8' ),
        "email": user.email,
        "image": user.image
    }
def list_to_dict( list ):
    return {
        "id": list.id,
        "name": list.name,
    }
def book_in_list_to_dict( bl ):
    return {
        "id": bl.id,
        "book_id": bl.book_id,
        "list_id": bl.list_id
    }

@app.route("/users", methods=["GET"])
def users():
    if request.method == "GET":
        users = [user_to_dict( user ) for user in User.query.all()]
        return make_response( jsonify( users ), 200)

@app.route( '/users/<int:id>', methods=[ "GET", "DELETE", "PATCH" ] )
def users_by_id(id):

    user = User.query.filter( User.id == id ).first()
    user_list = List.query.filter( List.user_id == id ).all()
    if user:
        if request.method == "GET":
            user_dict =  user_to_dict( user)
            user_dict["lists"] = [list_to_dict(r) for r in user_list]
            for i in range(len(user_list)):
                user_dict["lists"][i]["books"]= [book_in_list_to_dict(r) for r in BookInList.query.filter(BookInList.list_id == i).all()]
            return make_response( jsonify( user_dict ), 200 )
        
        elif request.method == "DELETE":
            List.query.filter_by( user_id = id ).delete()
            BookInList.query.filter_by( user_id = id ).delete()
            db.session.delete( user )
            db.session.commit()
            return make_response("", 204)

        elif request.method == "PATCH":
            user_data = request.get_json()
            for attr in user_data:
                setattr(user, attr, user_data[attr])
            db.session.add(user)
            db.session.commit()
            user_dict =  user_to_dict( user)
            user_dict["lists"] = [list_to_dict(r) for r in user_list]
            for i in range(len(user_list)):
                user_dict["lists"][i]["books"]= [book_in_list_to_dict(r) for r in BookInList.query.filter(BookInList.list_id == i).all()]
            return make_response( jsonify( user_dict ), 200 )
    else:
        return make_response( "User not found.", 404 )


if __name__ == '__main__':
    app.run(port=5555, debug=True)