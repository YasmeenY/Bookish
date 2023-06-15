from random import randint, choice as rc

from faker import Faker

from app import app
from models import db, User, Book, BookInList, List

if __name__ == '__main__':

    with app.app_context():
        print("Clearing db...")
        User.query.delete()
        Book.query.delete()
        BookInList.query.delete()
        List.query.delete()

        print("Seeding Books...")
        books = []
        b1 = Book(title = "hello")
        b2 = Book(title = "may")
        b3 = Book(title = "day")
        books.append(b1)
        books.append(b2)
        books.append(b3)
        db.session.add_all(books)
        db.session.commit()
        

        print("Seeding BookInList...")
        books_in_list = []
        bl1 = BookInList(book_id = 1, list_id = 1, user_id = 1)
        bl2 = BookInList(book_id = 1, list_id = 2, user_id = 1)
        bl3 = BookInList(book_id = 1, list_id = 1, user_id = 1)
        bl4 = BookInList(book_id = 3, list_id = 2, user_id = 1)
        books_in_list.append(bl1)
        books_in_list.append(bl2)
        books_in_list.append(bl3)
        books_in_list.append(bl4)
        db.session.add_all(books_in_list)
        db.session.commit()

        print("Seeding List...")
        lists = []
        l1 = List(name = "list1", user_id = 1)
        l2 = List(name = "list2", user_id = 1)
        lists.append(l1)
        lists.append(l2)
        db.session.add_all(lists)
        db.session.commit()

        print("Done seeding!")