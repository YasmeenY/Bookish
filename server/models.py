from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from config import db, bcrypt
from sqlalchemy_serializer import SerializerMixin

# Models go here:
class User( db.Model, SerializerMixin ):
    __tablename__ = 'users'
    __table_args__ = {'extend_existing': True}

    id = db.Column( db.Integer, primary_key=True )
    username = db.Column( db.String )
    email = db.Column( db.String, unique = True )
    password = db.Column( db.Text )
    image = db.Column( db.String, default="https://vdostavka.ru/wp-content/uploads/2019/05/no-avatar.png" )
    lists = db.relationship( "List", backref = "user" )

    def authenticate( self, password ):
        return bcrypt.check_password_hash(
            self.password, password.encode( 'utf-8' )
        )


class Book( db.Model, SerializerMixin ):
    __tablename__ = 'books'
    __table_args__ = {'extend_existing': True}

    id = db.Column( db.Integer, primary_key=True )
    title = db.Column( db.String )
    description = db.Column( db.String )
    publisher = db.Column( db.String )
    language = db.Column( db.String )
    isbn = db.Column( db.String )
    publish_date  = db.Column( db.String )
    rating = db.Column( db.Integer )
    rating_count = db.Column( db.Integer )
    author = db.Column( db.String )
    cover = db.Column( db.String, default="https://islandpress.org/sites/default/files/default_book_cover_2015.jpg" )
    subjects = db.Column( db.String )

    book_authors = db.relationship( "BookAuthor", backref = "book")
    authors = association_proxy("book-authors", "author")
    links = db.relationship( "BookLink", backref = "book" )


class Author( db.Model, SerializerMixin ):
    __tablename__ = 'authors'
    __table_args__ = {'extend_existing': True}

    id = db.Column( db.Integer, primary_key=True )
    name = db.Column( db.String )
    birth_date  = db.Column( db.String )
    bio = db.Column( db.String )
    work_count = db.Column( db.Integer )

    book_authors = db.relationship( "BookAuthor", backref = "author")
    books = association_proxy("book-authors", "book")

class List( db.Model, SerializerMixin ):
    __tablename__ = 'lists'
    __table_args__ = {'extend_existing': True}

    id = db.Column( db.Integer, primary_key=True )
    name = db.Column( db.String )
    user_id = db.Column( db.Integer, db.ForeignKey( 'users.id' ) )
    books = db.relationship( "BookInList", backref = "list")

class BookInList( db.Model, SerializerMixin ):
    __tablename__ = 'books-in-lists'
    __table_args__ = {'extend_existing': True}

    id = db.Column( db.Integer, primary_key=True )
    book_id = db.Column( db.Integer, db.ForeignKey( 'books.id' ) )
    list_id = db.Column( db.Integer, db.ForeignKey( 'lists.id' ) )
    user_id = db.Column( db.Integer, db.ForeignKey( 'users.id' ) )
    book = db.relationship("Book", backref= "books-in-lists")

class BookAuthor( db.Model, SerializerMixin ):
    __tablename__ = 'book-authors'
    __table_args__ = {'extend_existing': True}

    id = db.Column( db.Integer, primary_key=True )
    book_id = db.Column( db.Integer, db.ForeignKey( 'books.id' ) )
    author_id = db.Column( db.Integer, db.ForeignKey( 'authors.id' ) )

class BookLink(db.Model, SerializerMixin ):
    __tablename__ = 'links'
    __table_args__ = {'extend_existing': True}

    id = db.Column( db.Integer, primary_key=True )
    book_id = db.Column( db.Integer, db.ForeignKey( 'books.id' ) )
    name = db.Column( db.String )
    url = db.Column( db.String )