from random import randint, sample
from faker import Faker

from app import app
from models import db, User, Book, BookInList, List

titles = open("./data/Titles.txt", "r")
cover = open("./data/cover.txt", "r")
isbn = open("./data/ISBN.txt", "r")
ratings = open("./data/Ratings.txt", "r")
count = open("./data/rating_count.txt", "r")
description = open("./data/description.txt", "r")
dates = open("./data/publish_date.txt", "r")
subjects = open("./data/subjects.txt", "r")

if __name__ == '__main__':

    with app.app_context():
        COVERS = []
        RATINGS = []
        TITLES = []
        ISBN = []
        COUNT = []
        DESCRIPTION = []
        DATE = []
        SUBJECTS = []
        KEY = sample(range(9999), 99)

        for image in cover:
            COVERS.append(image.replace("\n",""))
        for rate in ratings:
            RATINGS.append(rate.replace("\n",""))
        for name in titles:
            TITLES.append(name.replace("\n",""))
        for num in isbn:
            ISBN.append(num.replace("\n",""))
        for n in count:
            COUNT.append(n.replace("\n",""))
        for words in description:
            DESCRIPTION.append(words.replace("\n",""))
        for date in dates:
            DATE.append(date.replace("\n",""))
        for subject in subjects:
            SUBJECTS.append(subject.replace("\n",""))

        print("Clearing db...")
        Book.query.delete()
        BookInList.query.delete()
        List.query.delete()

        print("Seeding Books...")
        books = []
        for i in range(99):
            book = Book(
                title = TITLES[i],
                key = f"OL{KEY[i]}",
                description = DESCRIPTION[i],
                language = "eng",
                isbn = ISBN[i],
                publish_date = DATE[i],
                rating = RATINGS[i],
                rating_count = COUNT[i],
                cover = COVERS[i],
                subjects = SUBJECTS[i]
            )
            books.append(book)
        db.session.add_all(books)
        db.session.commit()

        print("Seeding BookInList...")
        books_in_list = []
        bl1 = BookInList( book_id = 1, list_id = 1 )
        bl2 = BookInList( book_id = 9, list_id = 2)
        bl3 = BookInList( list_id = 1, book_id = 1)
        bl4 = BookInList( book_id = 3, list_id = 2)
        books_in_list.append(bl1)
        books_in_list.append(bl2)
        books_in_list.append(bl3)
        books_in_list.append(bl4)
        db.session.add_all(books_in_list)
        db.session.commit()

        print("Seeding List...")
        lists = []
        l1 = List(name = "Favorites", user_id = 1)
        l2 = List(name = "Dropped", user_id = 1)
        l3 = List(name = "Want to Read", user_id = 2)
        l4 = List(name = "Likes", user_id = 2)
        lists.append(l1)
        lists.append(l2)
        lists.append(l3)
        lists.append(l4)
        db.session.add_all(lists)
        db.session.commit()

        print("Done seeding!")