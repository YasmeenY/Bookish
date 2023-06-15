from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt

# Models go here:
class User( db.Model):
    __tablename__ = 'users'
    __table_args__ = {'extend_existing': True}

    id = db.Column( db.Integer, primary_key=True )
    username = db.Column( db.String )
    email = db.Column( db.String, unique = True )
    password = db.Column( db.String( 30 ) )
    image = db.Column( db.String, default="https://vdostavka.ru/wp-content/uploads/2019/05/no-avatar.png" )

class Books( db.Model):
    __tablename__ = 'books'
    __table_args__ = {'extend_existing': True}

    id = db.Column( db.Integer, primary_key=True )
    title = db.Column( db.String )
    description = db.Column( db.String )
    publisher = db.Column( db.String )
    language = db.Column( db.String )
    isbn = db.Column( db.String )
    excerpts = db.Column( db.String )
    preview_url = db.Column( db.String )
    publish_date  = db.Column( db.Date )
    open_library_id = db.Column( db.String )
    cover = db.Column( db.String, default="https://islandpress.org/sites/default/files/default_book_cover_2015.jpg" )

class Authors( db.Model ):
    __tablename__ = 'authors'
    __table_args__ = {'extend_existing': True}

    id = db.Column( db.Integer, primary_key=True )
    name = db.Column( db.String, unique = True )
    birth_date  = db.Column( db.Date )
    bio = db.Column( db.String )
    work_count = db.Column( db.Integer )