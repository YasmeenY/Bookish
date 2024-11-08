"""enhanced models

Revision ID: 4b31c26ee61c
Revises: c674d696ac42
Create Date: 2024-11-03 17:28:40.405955

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4b31c26ee61c'
down_revision = 'c674d696ac42'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('books_in_lists')
    op.drop_table('books')
    op.drop_table('lists')
    op.drop_table('users')
    op.drop_table('links')
    op.drop_table('book_authors')
    op.drop_table('authors')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('authors',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('name', sa.VARCHAR(), nullable=True),
    sa.Column('birth_date', sa.VARCHAR(), nullable=True),
    sa.Column('bio', sa.VARCHAR(), nullable=True),
    sa.Column('work_count', sa.INTEGER(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('book_authors',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('book_id', sa.INTEGER(), nullable=True),
    sa.Column('author_id', sa.INTEGER(), nullable=True),
    sa.ForeignKeyConstraint(['author_id'], ['authors.id'], name='fk_book_authors_author_id_authors'),
    sa.ForeignKeyConstraint(['book_id'], ['books.id'], name='fk_book_authors_book_id_books'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('links',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('book_key', sa.INTEGER(), nullable=True),
    sa.Column('name', sa.VARCHAR(), nullable=True),
    sa.Column('url', sa.VARCHAR(), nullable=True),
    sa.ForeignKeyConstraint(['book_key'], ['books.key'], name='fk_links_book_key_books'),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('url')
    )
    op.create_table('users',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('username', sa.VARCHAR(), nullable=True),
    sa.Column('email', sa.VARCHAR(), nullable=True),
    sa.Column('password', sa.TEXT(), nullable=True),
    sa.Column('image', sa.VARCHAR(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('lists',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('name', sa.VARCHAR(), nullable=True),
    sa.Column('user_id', sa.INTEGER(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='fk_lists_user_id_users'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('books',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('title', sa.VARCHAR(), nullable=True),
    sa.Column('key', sa.VARCHAR(), nullable=True),
    sa.Column('description', sa.VARCHAR(), nullable=True),
    sa.Column('publisher', sa.VARCHAR(), nullable=True),
    sa.Column('language', sa.VARCHAR(), nullable=True),
    sa.Column('isbn', sa.VARCHAR(), nullable=True),
    sa.Column('publish_date', sa.VARCHAR(), nullable=True),
    sa.Column('rating', sa.INTEGER(), nullable=True),
    sa.Column('rating_count', sa.INTEGER(), nullable=True),
    sa.Column('author', sa.VARCHAR(), nullable=True),
    sa.Column('cover', sa.VARCHAR(), nullable=True),
    sa.Column('subjects', sa.VARCHAR(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('key')
    )
    op.create_table('books_in_lists',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('book_name', sa.VARCHAR(), nullable=True),
    sa.Column('book_cover', sa.VARCHAR(), nullable=True),
    sa.Column('book_id', sa.INTEGER(), nullable=True),
    sa.Column('list_id', sa.INTEGER(), nullable=True),
    sa.Column('user_id', sa.INTEGER(), nullable=True),
    sa.ForeignKeyConstraint(['book_id'], ['books.id'], name='fk_books_in_lists_book_id_books'),
    sa.ForeignKeyConstraint(['list_id'], ['lists.id'], name='fk_books_in_lists_list_id_lists'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='fk_books_in_lists_user_id_users'),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###
