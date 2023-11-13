"""revision

Revision ID: c674d696ac42
Revises: 8cc122065a9b
Create Date: 2023-11-13 18:04:27.113105

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c674d696ac42'
down_revision = '8cc122065a9b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('book_authors',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('book_id', sa.Integer(), nullable=True),
    sa.Column('author_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['author_id'], ['authors.id'], name=op.f('fk_book_authors_author_id_authors')),
    sa.ForeignKeyConstraint(['book_id'], ['books.id'], name=op.f('fk_book_authors_book_id_books')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('books_in_lists',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('book_name', sa.String(), nullable=True),
    sa.Column('book_cover', sa.String(), nullable=True),
    sa.Column('book_id', sa.Integer(), nullable=True),
    sa.Column('list_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['book_id'], ['books.id'], name=op.f('fk_books_in_lists_book_id_books')),
    sa.ForeignKeyConstraint(['list_id'], ['lists.id'], name=op.f('fk_books_in_lists_list_id_lists')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_books_in_lists_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('books-in-lists')
    op.drop_table('book-authors')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('book-authors',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('book_id', sa.INTEGER(), nullable=True),
    sa.Column('author_id', sa.INTEGER(), nullable=True),
    sa.ForeignKeyConstraint(['author_id'], ['authors.id'], ),
    sa.ForeignKeyConstraint(['book_id'], ['books.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('books-in-lists',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('book_name', sa.VARCHAR(), nullable=True),
    sa.Column('book_cover', sa.VARCHAR(), nullable=True),
    sa.Column('book_id', sa.INTEGER(), nullable=True),
    sa.Column('list_id', sa.INTEGER(), nullable=True),
    sa.Column('user_id', sa.INTEGER(), nullable=True),
    sa.ForeignKeyConstraint(['book_id'], ['books.id'], ),
    sa.ForeignKeyConstraint(['list_id'], ['lists.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('books_in_lists')
    op.drop_table('book_authors')
    # ### end Alembic commands ###