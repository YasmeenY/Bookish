from flask import make_response, jsonify, request, session

# Local imports
from config import app, db, api, Resource, bcrypt
from models import db, User, List, BookInList, Book, BookLink
from sqlalchemy import func


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

        if not user:
            return {"error": "user doesn't exist"}, 404

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
        "user_id": list.user_id
    }
def book_in_list_to_dict( bl ):
    return {
        "id": bl.id,
        "book_id": bl.book_id,
        "list_id": bl.list_id,
        "name": bl.book_name,
        "cover": bl.book_cover
    }
def link_to_dict( link ):
    return {
        "id": link.id,
        "book_key": link.book_key,
        "name": link.name,
    }
def book_to_dict( book ):
    return {
        "id": book.id,
        "title": book.title,
        "key": book.key,
        "description": book.description,
        "language": book.language,
        "isbn": book.isbn,
        "publisher": book.publisher,
        "publish_date": book.publish_date,
        "rating": book.rating,
        "author": book.author,
        "cover": book.cover,
        "subjects": book.subjects,
        "rating_count": book.rating_count
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
                user_dict["lists"][i]["books"]= [book_in_list_to_dict(r) for r in BookInList.query.filter(BookInList.list_id == user_list[i].id).all()]
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
                setattr( user, attr, user_data[attr] )
            db.session.add( user )
            db.session.commit()
            user_dict =  user_to_dict( user )
            user_dict["lists"] = [list_to_dict(r) for r in user_list]
            for i in range(len(user_list)):
                user_dict["lists"][i]["books"]= [book_in_list_to_dict(r) for r in BookInList.query.filter(BookInList.list_id == user_list[i].id).all()]
            return make_response( jsonify( user_dict ), 200 )
    else:
        return make_response( "User not found.", 404 )
    
@app.route("/users/lists", methods=["GET", "POST"])
def lists():
    if request.method == "GET":
        lists = [list_to_dict( list ) for list in List.query.all()]
        return make_response( jsonify( lists ), 200)
    if request.method == "POST":
        name = request.get_json()[ 'name' ]
        user_id = request.get_json()[ 'user_id' ]
        new_list = List(
            name = name,
            user_id = user_id
        )
        db.session.add( new_list )
        db.session.commit()
        return make_response( jsonify( list_to_dict( new_list ) ), 201 )

@app.route( '/users/lists/<int:id>', methods=[ "GET", "DELETE" ])
def lists_by_id(id):
    list = List.query.filter( List.id == id ).first()
    if list:
        if request.method == "GET":
            list_dict = list_to_dict(list)
            list_dict["books"]= [book_in_list_to_dict(r) for r in BookInList.query.filter(BookInList.list_id == id).all()]
            return make_response( jsonify( list_dict ), 200 )

        elif request.method == "DELETE":
            List.query.filter_by( id = id ).delete()
            BookInList.query.filter_by( list_id = id ).delete()
            db.session.delete( list )
            db.session.commit()
            return make_response("", 204)

    else:
        return make_response( "List not found.", 404 )

@app.route( '/booksInLists', methods=[ "POST" ])
def Books_in_List():
    if request.method == "POST":
        book_id = request.get_json()[ 'book_id' ]
        list_id = request.get_json()[ 'list_id' ]
        user_id = request.get_json()[ 'user_id' ]
        book_cover = request.get_json()[ 'book_cover' ]
        book_name = request.get_json()[ 'book_name' ]

        new_book_in_list = BookInList(
            book_id = book_id,
            list_id = list_id,
            user_id = user_id,
            book_cover = book_cover,
            book_name = book_name
        )
        db.session.add( new_book_in_list )
        db.session.commit()
        return make_response( jsonify( book_in_list_to_dict( new_book_in_list ) ), 201 )

@app.route( '/booksInLists/<int:id>', methods=[ "DELETE" ])
def Books_in_List_by_id(id):
    if request.method == "DELETE":
        book = BookInList.query.filter_by( id = id ).first()
        db.session.delete( book )
        db.session.commit()
        return "", 204
@app.route( '/books', methods=[ "GET", "POST" ])
def Books():
    if request.method == "GET":
        books = [book_to_dict( book ) for book in Book.query.all()]
        return make_response( jsonify( books ), 200)

    if request.method == "POST":
        new_Book = Book(
            title = request.get_json()[ 'title' ],
            key = request.get_json()[ 'key' ],
            description = request.get_json()[ 'description' ],
            publisher = request.get_json()[ 'publisher' ],
            language = request.get_json()[ 'language' ],
            isbn = request.get_json()[ 'isbn' ],
            publish_date = request.get_json()[ 'publish_date' ],
            rating = request.get_json()[ 'rating' ],
            rating_count = request.get_json()[ 'rating_count' ],
            author = request.get_json()[ 'author' ],
            cover = request.get_json()[ 'cover' ],
            subjects = request.get_json()[ 'subjects' ]
        )

        db.session.add( new_Book )
        db.session.commit()
        return make_response( jsonify( book_to_dict( new_Book ) ), 201)

@app.route( '/books/<int:key>', methods=[ "GET" ])
def Books_by_id(key):
    book = Book.query.filter( Book.key == key ).first()
    if book:
        if request.method == "GET":
            book_dict = book_to_dict(book)
            return make_response( jsonify( book_dict ), 200 )
        return "", 204

@app.route( '/books/random', methods=[ "GET" ])
def random_books():
    if request.method == "GET":
        books = [book_to_dict( book ) for book in Book.query.order_by(func.random()).limit(10).all()]
        return make_response( jsonify( books ), 200)

@app.route( '/books/<string:key>', methods=[ "GET" ])
def get_book_by_key(key):
    if request.method == "GET":
        book = Book.query.filter(Book.key == key).first()
        book_dict = book_to_dict(book)
        return make_response( jsonify( book_dict ), 200)
    
@app.route( '/links', methods=[ "POST" ])
def post_link():
    if request.method == "POST":
        name = request.get_json()[ 'name' ]
        book_key = request.get_json()[ 'book_key' ]
        url = request.get_json()[ 'url' ]

        new_link = BookLink(
            name = name,
            book_key = book_key,
            url = url
        )
        db.session.add( new_link )
        db.session.commit()
        return make_response( jsonify( link_to_dict(new_link) ), 201)

@app.route( '/books/links/<int:key>', methods=["GET"])
def get_add_links(key):
    if request.method == "GET":
        links = BookLink.query.filter(BookLink.book_key == key).all()
        link_dict = [link_to_dict(l) for l in links]
        return make_response( jsonify( link_dict ), 200)


if __name__ == '__main__':
    app.run(port=5555, debug=True)