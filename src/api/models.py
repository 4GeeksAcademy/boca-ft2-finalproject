from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    uid = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    first_name = db.Column(db.String(120), nullable=False)
    last_name = db.Column(db.String(120), nullable=False)
    postal_code = db.Column(db.String(120), nullable=False)
    dob = db.Column(db.String(120), nullable=False)
    user_info = db.relationship('UserPage', backref='user', lazy=True)
    user_playlist = db.relationship('Playlist', backref='user', lazy=True)
    user_post = db.relationship('Post', backref='user', lazy=True)
    user_comment = db.relationship('Comment', backref='user', lazy=True)
    user_event = db.relationship('Event', backref='user', lazy=True)



    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "uid": self.uid,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "postal_code": self.postal_code,
            "dob": self.dob
            # do not serialize the password, its a security breach
        }
    
class UserPage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.Integer, db.ForeignKey(User.uid))
    top_songs = db.Column(db.String(250))
    top_artists = db.Column(db.String(250))
    top_genres = db.Column(db.String(250))
    attended_concerts = db.Column(db.String(250))
    upcoming_concerts = db.Column(db.String(250))
    about_me = db.Column(db.String(250))
    prof_pic_url = db.Column(db.String(250))

    def serialize(self):
        return {
            "id": self.id,
            "uid": self.uid,
            "top_songs": self.top_songs,
            "top_artists": self.top_artists,
            "top_genres": self.top_genres,
            "attended_concerts": self.attended_concerts,
            "upcoming_concerts": self.upcoming_concerts,
            "about_me": self.about_me,
            "prof_pic_url": self.prof_pic_url
        }
    
class Playlist(db.Model):
    pid = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.Integer, db.ForeignKey(User.uid))
    playlist_name = db.Column(db.String(120), nullable=False)
    top_three = db.Column(db.String(120), nullable=True)

class PlaylistSongs(db.Model):
    psid = db.Column(db.Integer, primary_key=True)
    pid = db.Column(db.Integer, db.ForeignKey(Playlist.pid))
    song_name = db.Column(db.String(120))
    song_genre = db.Column(db.String(120))
    song_id = db.Column(db.Integer)
    
#class Follower(db.Model):
#    id = db.Column(db.Integer, primary_key=True)
#    uid = db.Column(db.Integer, db.ForeignKey(User.uid))
#    follower_id = db.Column(db.Integer, db.ForeignKey(User.uid))

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.Integer, db.ForeignKey(User.uid))
    content = db.Column(db.String(250))
    likes = db.Column(db.Integer)

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.Integer, db.ForeignKey(User.uid))
    comment_text = db.Column(db.String(250))
    postid = db.Column(db.Integer, db.ForeignKey(Post.id))

class Inbox(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.Text)
    sender_id = db.Column(db.Integer, db.ForeignKey(User.uid))
    recieved_id = db.Column(db.Integer, db.ForeignKey(User.uid))

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.Integer, db.ForeignKey(User.uid))
    name = db.Column(db.String(120))
    artist = db.Column(db.String(120))
    venue = db.Column(db.String(120))
    location = db.Column(db.String(120))
    date = db.Column(db.String(120))
    img_url = db.Column(db.String(120))
    attended_with = db.Column(db.String(120))