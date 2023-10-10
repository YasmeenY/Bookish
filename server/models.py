from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from config import db, bcrypt
from flask import abort
from sqlalchemy_serializer import SerializerMixin

# Models go here:
class User( db.Model, SerializerMixin ):
    __tablename__ = 'users'
    serialize_rules = ('-books_in_lists.user',)

    id = db.Column( db.Integer, primary_key=True )
    username = db.Column( db.String )
    email = db.Column( db.String, unique = True )
    password = db.Column( db.Text )
    image = db.Column( db.String, default="https://vdostavka.ru/wp-content/uploads/2019/05/no-avatar.png" )
    books_in_lists = db.relationship( "List", backref = "user" )

    def authenticate( self, password ):
        return bcrypt.check_password_hash(
            self.password, password.encode( 'utf-8' )
        )


class Book( db.Model, SerializerMixin ):
    __tablename__ = 'books'
    serialize_rules = ('-book_authors.book','-links.book',)

    id = db.Column( db.Integer, primary_key=True )
    title = db.Column( db.String )
    key = db.Column( db.String, unique = True  )
    description = db.Column( db.String, default=None )
    publisher = db.Column( db.String, default=None )
    language = db.Column( db.String, default=None )
    isbn = db.Column( db.String, default=None )
    publish_date  = db.Column( db.String, default=None )
    rating = db.Column( db.Integer, default=None )
    rating_count = db.Column( db.Integer, default=None )
    author = db.Column( db.String, default=None )
    cover = db.Column( db.String, default="https://islandpress.org/sites/default/files/default_book_cover_2015.jpg" )
    subjects = db.Column( db.String, default=None )

    book_authors = db.relationship( "BookAuthor", backref = "book")
    links = db.relationship( "BookLink", backref = "book" )


class Author( db.Model, SerializerMixin ):
    __tablename__ = 'authors'
    serialize_rules = ('-books.author',)

    id = db.Column( db.Integer, primary_key=True )
    name = db.Column( db.String )
    birth_date  = db.Column( db.String )
    bio = db.Column( db.String )
    work_count = db.Column( db.Integer )

    books = db.relationship( "BookAuthor", backref = "author")

class List( db.Model,SerializerMixin ):
    __tablename__ = 'lists'
    serialize_rules = ('-books.lists',)

    id = db.Column( db.Integer, primary_key=True )
    name = db.Column( db.String )
    user_id = db.Column( db.Integer, db.ForeignKey( 'users.id' ) )
    books = db.relationship( "BookInList", backref = "list")

class BookInList( db.Model, SerializerMixin ):
    __tablename__ = 'books_in_lists'
    serialize_rules = ('-book.books_in_lists','-user.books_in_lists','-list.books_in_lists')

    id = db.Column( db.Integer, primary_key=True )
    book_name = db.Column( db.String )
    book_cover = db.Column( db.String )
    book_id = db.Column( db.Integer, db.ForeignKey( 'books.id' ) )
    list_id = db.Column( db.Integer, db.ForeignKey( 'lists.id' ) )
    user_id = db.Column( db.Integer, db.ForeignKey( 'users.id' ) )

class BookAuthor( db.Model, SerializerMixin ):
    __tablename__ = 'book_authors'
    serialize_rules = ('-book.BookAuthor','-author.BookAuthor')

    id = db.Column( db.Integer, primary_key=True )
    book_id = db.Column( db.Integer, db.ForeignKey( 'books.id' ) )
    author_id = db.Column( db.Integer, db.ForeignKey( 'authors.id' ) )

class BookLink(db.Model, SerializerMixin ):
    __tablename__ = 'links'
    serialize_rules = ('-book.BookLink',)

    id = db.Column( db.Integer, primary_key=True )
    book_key = db.Column( db.Integer, db.ForeignKey( 'books.key' ) )
    name = db.Column( db.String )
    url = db.Column( db.String, unique = True )

    @validates( 'user_id' )
    def validate_user_id( self, key, user_id ):
        if isinstance( user_id, int ) and user_id > 0:
            return user_id
        else:
            abort( 422, "User id must be a number greater than 0." )