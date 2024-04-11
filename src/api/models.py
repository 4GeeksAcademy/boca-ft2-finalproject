from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    uid = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    postal_code = db.Column(db.String(120), nullable=False)
    dob = db.Column(db.String(120), nullable=False)
    first_name = db.Column(db.String(120))
    last_name = db.Column(db.String(120))
    about_me = db.Column(db.String(120))
    prof_pic_url = db.Column(db.String(250))
    user_playlist = db.relationship('Playlist', backref='user', lazy=True)
    user_post = db.relationship('Post', backref='user', lazy=True)
    user_comment = db.relationship('Comment', backref='user', lazy=True)
    user_event = db.relationship('Event', backref='user', lazy=True)
    user_top_genre = db.relationship('TrackGenre', backref='user', lazy=True)
    top_songs = db.relationship('TrackTopSongs', backref='user', lazy=True)
    top_artists = db.relationship('TrackTopArtists', backref='user', lazy=True)



    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "uid": self.uid,
            "email": self.email,
            "username": self.username,
            "postal_code": self.postal_code,
            "dob": self.dob,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "about_me": self.about_me,
            "prof_pic_url": self.prof_pic_url
            # do not serialize the password, its a security breach
        }
    
class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.Integer, db.ForeignKey(User.uid))
    event_id = db.Column(db.Integer)
    date = db.Column(db.String(120))
    #user_associated = db.relationship('UserPage', backref='event', lazy=True) // Figure out Many-To-Many
    #attended_with = db.Column(db.String(120)) / Invite Feature

    def serialize(self):
        return {
            "id": self.id,
            "uid": self.uid,
            "event_id": self.event_id,
            "date": self.date
        }

class Playlist(db.Model):
    pid = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.Integer, db.ForeignKey(User.uid))
    playlist_name = db.Column(db.String(120), nullable=False)
    top_three = db.Column(db.String(120), nullable=True)

    def serialize(self):
        return {
            "pid": self.pid,
            "uid": self.uid,
            "playlist_name": self.playlist_name,
            "top_three": self.top_three
        }

class PlaylistSongs(db.Model):
    psid = db.Column(db.Integer, primary_key=True)
    pid = db.Column(db.Integer, db.ForeignKey(Playlist.pid))
    song_id = db.Column(db.String(250))
    #many-to-many so users can add other users playlists
    
    def serialize(self):
        return {
            "psid": self.psid,
            "pid": self.pid,
            "song_id": self.song_id
        }
#class Follower(db.Model):
#    id = db.Column(db.Integer, primary_key=True)
#    uid = db.Column(db.Integer, db.ForeignKey(User.uid))
#    follower_id = db.Column(db.Integer, db.ForeignKey(User.uid))

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.Integer, db.ForeignKey(User.uid))
    content = db.Column(db.String(250))
    likes = db.Column(db.Integer)

    def serialize(self):
        return {
            "id": self.id,
            "uid": self.uid,
            "content": self.content,
            "likes": self.likes
        }

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


class TrackGenre(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.Integer, db.ForeignKey(User.uid))
    genre = db.Column(db.String(250))
    count = db.Column(db.Integer, default=0)

    def track_genre(genre, uid):
        for genre in genre:
            genre_obj = TrackGenre.query.filter_by(uid=uid, genre=genre).first()
            if genre_obj:
                genre_obj.count += 1
            else: 
                genre_obj = TrackGenre(uid=uid, genre=genre, count=1)
                db.session.add(genre_obj)
            db.session.commit()

    def serialize(self): 
        return {
            "id": self.id,
            "uid": self.uid,
            "genre": self.genre,
            "count": self.count
        }
    
class TrackTopSongs(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.Integer, db.ForeignKey(User.uid))
    song_id = db.Column(db.String(250))
    count = db.Column(db.Integer, default=0)

    def track_top_songs(song_id, uid):
            top_songs = TrackTopSongs.query.filter_by(uid=uid, song_id=song_id).first()
            if top_songs:
                top_songs.count += 1
            else: 
                top_songs = TrackTopSongs(uid=uid, song_id=song_id, count=1)
                db.session.add(top_songs)
            db.session.commit()

    def serialize(self): 
        return {
            "id": self.id,
            "uid": self.uid,
            "song_id": self.song_id,
            "count": self.count
        }
class TrackTopArtists(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.Integer, db.ForeignKey(User.uid))
    artist_id = db.Column(db.String(250))
    count = db.Column(db.Integer, default=0)

    def track_top_artists(artist_id, uid):
            top_artists = TrackTopArtists.query.filter_by(uid=uid, artist_id=artist_id).first()
            if top_artists:
                top_artists.count += 1
            else: 
                top_artists = TrackTopArtists(uid=uid, artist_id=artist_id, count=1)
                db.session.add(top_artists)
            db.session.commit()

    def serialize(self): 
        return {
            "id": self.id,
            "uid": self.uid,
            "artist_id": self.artist_id,
            "count": self.count
        }