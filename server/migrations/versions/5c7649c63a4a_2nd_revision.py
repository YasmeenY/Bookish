"""2nd revision

Revision ID: 5c7649c63a4a
Revises: 9debf0482cfd
Create Date: 2023-06-15 08:11:21.931916

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5c7649c63a4a'
down_revision = '9debf0482cfd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('authors',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('birth_date', sa.Date(), nullable=True),
    sa.Column('bio', sa.String(), nullable=True),
    sa.Column('work_count', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('title', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('description', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('publisher', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('language', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('isbn', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('excerpts', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('preview_url', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('publish_date', sa.Date(), nullable=True))
        batch_op.add_column(sa.Column('open_library_id', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('cover', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('cover')
        batch_op.drop_column('open_library_id')
        batch_op.drop_column('publish_date')
        batch_op.drop_column('preview_url')
        batch_op.drop_column('excerpts')
        batch_op.drop_column('isbn')
        batch_op.drop_column('language')
        batch_op.drop_column('publisher')
        batch_op.drop_column('description')
        batch_op.drop_column('title')

    op.drop_table('authors')
    # ### end Alembic commands ###
