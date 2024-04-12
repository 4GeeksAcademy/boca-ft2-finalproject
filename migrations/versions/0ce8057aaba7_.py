"""empty message

<<<<<<<< HEAD:migrations/versions/0ce8057aaba7_.py
Revision ID: 0ce8057aaba7
Revises: 
Create Date: 2024-04-11 16:30:06.959890
========
Revision ID: 272168a74f2f
Revises: 
Create Date: 2024-04-11 15:38:58.091304
>>>>>>>> 1896470f9efef9a0307a62715ff51e80dd3c0ba3:migrations/versions/272168a74f2f_.py

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
<<<<<<<< HEAD:migrations/versions/0ce8057aaba7_.py
revision = '0ce8057aaba7'
========
revision = '272168a74f2f'
>>>>>>>> 1896470f9efef9a0307a62715ff51e80dd3c0ba3:migrations/versions/272168a74f2f_.py
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('uid', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('username', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.Column('postal_code', sa.String(length=120), nullable=False),
    sa.Column('dob', sa.String(length=120), nullable=False),
    sa.PrimaryKeyConstraint('uid'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('event',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('uid', sa.Integer(), nullable=True),
    sa.Column('event_id', sa.Integer(), nullable=True),
    sa.Column('date', sa.String(length=120), nullable=True),
    sa.ForeignKeyConstraint(['uid'], ['user.uid'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('inbox',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('message', sa.Text(), nullable=True),
    sa.Column('sender_id', sa.Integer(), nullable=True),
    sa.Column('recieved_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['recieved_id'], ['user.uid'], ),
    sa.ForeignKeyConstraint(['sender_id'], ['user.uid'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('playlist',
    sa.Column('pid', sa.Integer(), nullable=False),
    sa.Column('uid', sa.Integer(), nullable=True),
    sa.Column('playlist_name', sa.String(length=120), nullable=False),
    sa.Column('top_three', sa.String(length=120), nullable=True),
    sa.ForeignKeyConstraint(['uid'], ['user.uid'], ),
    sa.PrimaryKeyConstraint('pid')
    )
    op.create_table('post',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('uid', sa.Integer(), nullable=True),
    sa.Column('content', sa.String(length=250), nullable=True),
    sa.Column('likes', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['uid'], ['user.uid'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('track_genre',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('uid', sa.Integer(), nullable=True),
    sa.Column('genre', sa.String(length=250), nullable=True),
    sa.Column('count', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['uid'], ['user.uid'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('track_top_songs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('uid', sa.Integer(), nullable=True),
    sa.Column('song_id', sa.String(length=250), nullable=True),
    sa.Column('count', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['uid'], ['user.uid'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user_page',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('uid', sa.Integer(), nullable=True),
    sa.Column('first_name', sa.String(length=250), nullable=True),
    sa.Column('last_name', sa.String(length=250), nullable=True),
    sa.Column('about_me', sa.String(length=250), nullable=True),
    sa.Column('prof_pic_url', sa.String(length=250), nullable=True),
    sa.Column('top_artists', sa.String(length=250), nullable=True),
    sa.Column('top_genres', sa.String(length=250), nullable=True),
    sa.ForeignKeyConstraint(['uid'], ['user.uid'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('comment',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('uid', sa.Integer(), nullable=True),
    sa.Column('comment_text', sa.String(length=250), nullable=True),
    sa.Column('postid', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['postid'], ['post.id'], ),
    sa.ForeignKeyConstraint(['uid'], ['user.uid'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('playlist_songs',
    sa.Column('psid', sa.Integer(), nullable=False),
    sa.Column('pid', sa.Integer(), nullable=True),
    sa.Column('song_id', sa.String(length=250), nullable=True),
    sa.ForeignKeyConstraint(['pid'], ['playlist.pid'], ),
    sa.PrimaryKeyConstraint('psid')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('playlist_songs')
    op.drop_table('comment')
    op.drop_table('user_page')
    op.drop_table('track_top_songs')
    op.drop_table('track_genre')
    op.drop_table('post')
    op.drop_table('playlist')
    op.drop_table('inbox')
    op.drop_table('event')
    op.drop_table('user')
    # ### end Alembic commands ###
