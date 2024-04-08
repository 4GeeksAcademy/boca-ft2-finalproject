"""empty message

Revision ID: c5571713b833
Revises: 77b402c8c296
Create Date: 2024-04-08 15:20:19.702351

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c5571713b833'
down_revision = '77b402c8c296'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('playlist_songs', schema=None) as batch_op:
        batch_op.alter_column('song_id',
               existing_type=sa.INTEGER(),
               type_=sa.String(length=250),
               existing_nullable=True)
        batch_op.drop_column('song_genre')
        batch_op.drop_column('song_name')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('playlist_songs', schema=None) as batch_op:
        batch_op.add_column(sa.Column('song_name', sa.VARCHAR(length=120), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('song_genre', sa.VARCHAR(length=120), autoincrement=False, nullable=True))
        batch_op.alter_column('song_id',
               existing_type=sa.String(length=250),
               type_=sa.INTEGER(),
               existing_nullable=True)

    # ### end Alembic commands ###