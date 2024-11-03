from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import validates, relationship
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from marshmallow import Schema, fields, post_load
from config import db, bcrypt

# Models:

class User( db.Model):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(Text, nullable=False)
    image = db.Column(String, default="https://vdostavka.ru/wp-content/uploads/2019/05/no-avatar.png" )
    created_at = Column(DateTime, default=db.func.current_timestamp())
    updated_at = Column(DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    lists = db.relationship("List", backref="user")

    def authenticate(self, password):
        return bcrypt.check_password_hash(self.password, password)
    
    @validates('password')
    def validate_password(self, key, password):
        # Example validation for password strength
        if len(password) < 8:
            raise ValueError("Password must be at least 8 characters long.")
        return password


class Book( db.Model):
    __tablename__ = 'books'

    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    key = Column(String, unique=True, nullable=False)
    description = Column(Text, default=None)
    publisher = Column(String, default=None)
    language = Column(String, default=None)
    isbn = Column(String, default=None)
    publish_date = Column(String, default=None)  # Consider changing to Date
    rating = Column(Integer, default=None)
    rating_count = Column(Integer, default=None)
    cover = Column(String, default="https://islandpress.org/sites/default/files/default_book_cover_2015.jpg")
    subjects = Column(String, default=None)

    book_in_lists = relationship("BookInList", backref="book")

class List(db.Model):
    __tablename__ = 'lists'
    
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'))
    created_at = Column(DateTime, default=db.func.current_timestamp())
    updated_at = Column(DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    books = relationship("BookInList", backref="list")

class BookInList(db.Model):
    __tablename__ = 'books_in_lists'
    
    id = Column(Integer, primary_key=True)
    book_id = Column(Integer, ForeignKey('books.id'), nullable=False)
    list_id = Column(Integer, ForeignKey('lists.id'), nullable=False)

    @validates('book_id')
    def validate_book_id(self, key, book_id):
        if not isinstance(book_id, int) or book_id <= 0:
            raise ValueError("Book ID must be a positive integer.")
        return book_id

    @validates('list_id')
    def validate_list_id(self, key, list_id):
        if not isinstance(list_id, int) or list_id <= 0:
            raise ValueError("List ID must be a positive integer.")
        return list_id
    

# Serialization Schemas

class UserSchema(Schema):
    id = fields.Int()
    username = fields.Str()
    email = fields.Str()
    image = fields.Str()
    lists = fields.List(fields.Nested('ListSchema', exclude=('user',)))

    @post_load
    def make_user(self, data, **kwargs):
        return User(**data)

class BookSchema(Schema):
    id = fields.Int()
    title = fields.Str()
    key = fields.Str()
    description = fields.Str()
    publisher = fields.Str()
    language = fields.Str()
    isbn = fields.Str()
    publish_date = fields.Str()
    rating = fields.Int()
    rating_count = fields.Int()
    cover = fields.Str()
    subjects = fields.Str()

    @post_load
    def make_book(self, data, **kwargs):
        return Book(**data)

class ListSchema(Schema):
    id = fields.Int()
    name = fields.Str()
    user_id = fields.Int()
    books = fields.List(fields.Nested('BookInListSchema'))

    @post_load
    def make_list(self, data, **kwargs):
        return List(**data)

class BookInListSchema(Schema):
    id = fields.Int()
    book_id = fields.Int()
    list_id = fields.Int()

    @post_load
    def make_book_in_list(self, data, **kwargs):
        return BookInList(**data)