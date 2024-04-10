"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, TrackGenre, UserPage, Event, Playlist, PlaylistSongs, TrackTopSongs
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

@api.route('/createuser', methods=['POST'])
def handle_create_user():
    sent_user = request.json
    new_user = User(email=sent_user['email'], username=sent_user['username'], password=sent_user['password'], postal_code=sent_user['postal_code'], dob=sent_user['dob'])
    db.session.add(new_user)
    db.session.commit()
    get_new_user = User.query.filter_by(username=sent_user['username'], password=sent_user['password']).first()
    if get_new_user:
        to_send = get_new_user.serialize()
        return jsonify(to_send), 200
    else:
        return 'UNKNOWN ERROR', 400
    
@api.route('/login', methods=['POST'])
def handle_get_token():
    sent_info = request.json 
    username = sent_info['username']
    password = sent_info['password']
    exists = User.query.filter_by(username=username, password=password).first()
    if exists:
        if sent_info['password'] == exists.password:
            access_token = create_access_token(identity=username)
            return jsonify(access_token=access_token), 200
        else: 
            return jsonify({"msg": "Username or Password is incorrect."}), 401
    else: 
        return jsonify({"msg": "User does not exist, please sign up."}), 401

@api.route('/changepassword', methods=['PUT'])
def handle_change_password():
    sent_info = request.json
    get_user = User.query.filter_by(uid=sent_info['uid']).first()
    if get_user.password == sent_info['password']:
        get_user.password = sent_info['newpassword']
        return 'Password Updated', 200
    else: 
        return 'Incorrect Password', 401
    
@api.route('/getprofile/<uid>', methods=['GET'])
def handle_get_profile(uid):
    get_user = User.query.filter_by(uid=uid).first()
    if get_user:
        get_user_page = UserPage.query.filter_by(uid=uid).first()
        user_serial = get_user.serialize()
        userpage_serial = get_user_page.serialize()
        return jsonify(user_serial, userpage_serial), 200
    else:
        return jsonify('User does not exist'), 404

#Discover Endpoints
@api.route('/trackgenre', methods=['POST'])
def handle_track_genre():
    sent_info = request.json
    TrackGenre.track_genre(sent_info['genre'], sent_info['uid'])
    return jsonify('Tracked Genre'), 200

@api.route('/gettracked/<uid>', methods=['GET'])
def handle_get_tracked(uid):
    find_tracked = TrackGenre.query.filter_by(uid=uid)
    listed = list(map(lambda x: x.serialize(), find_tracked))
    return jsonify(listed), 200

@api.route('/topthreegenre/<uid>', methods=['GET'])
def handle_get_top_three(uid):
    current_user_top_three = TrackGenre.query.filter_by(uid=uid).order_by(TrackGenre.count.desc()).limit(3).all()
    listed = list(map(lambda x: x.serialize(), current_user_top_three))
    return jsonify(listed), 200

@api.route('/getothersgenres/<uid>', methods=['GET'])
def handle_get_others_top_three(uid):
    genres = TrackGenre.query.filter(TrackGenre.uid!=uid)
    listed = list(map(lambda x: x.serialize(), genres))
    return jsonify(listed), 200

@api.route('/findothers', methods=['POST'])
def handle_user_search():
    recieved = request.json
    search = "%{}%".format(recieved['search'])
    find_user_first = User.query.filter(User.first_name.ilike(search)).all()
    find_user_last = User.query.filter(User.last_name.ilike(search)).all()
    find_user_username = User.query.filter(User.username.ilike(search)).all()
    if find_user_first:
        list_users = list(map(lambda x: x.serialize(), find_user_first))
        return jsonify(list_users), 200
    elif find_user_last:
        list_users = list(map(lambda x: x.serialize(), find_user_last))
        return jsonify(list_users), 200
    elif find_user_username:
        list_users = list(map(lambda x: x.serialize(), find_user_username))
        return jsonify(list_users)
    else:
        return jsonify('User not found'), 404
    
@api.route('/trackupcomingconcerts', methods=['POST'])
def handle_track_concert():
    recieved = request.json
    new_event = Event(uid=recieved['uid'], event_id=recieved['event_id'], date=recieved['date'])
    db.session.add(new_event)
    db.session.commit()
    find_event = Event.query.filter_by(event_id=recieved['event_id']).first()
    serial = find_event.serialize()
    return jsonify(serial), 200
    
#Profile Page
@api.route('/tracksong', methods=['POST'])
def handle_track_song():
    sent_info = request.json
    TrackTopSongs.track_top_songs(sent_info['song_id'], sent_info['uid'])
    return jsonify('Tracked Song'), 200

