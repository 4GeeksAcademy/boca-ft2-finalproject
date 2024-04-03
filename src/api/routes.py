"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

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
    new_user = User(email=sent_user['email'], username=sent_user['username'], password=sent_user['password'], first_name=sent_user['first_name'], last_name=sent_user['last_name'], postal_code=sent_user['postal_code'], dob=sent_user['dob'])
    db.session.add(new_user)
    db.session.commit()
    get_new_user = User.query.filter_by(username=sent_user['username'], password=sent_user['password']).first()
    if get_new_user:
        to_send = get_new_user.serialize()
        return jsonify(to_send), 200
    else:
        return 'UNKNOWN ERROR', 400
    
@api.route('/login', methods=['POST'])
#protected
def handle_get_user():
    sent_info = request.json
    get_user = User.query.filter_by(username=sent_info['username'], password=sent_info['password'])
    if get_user:
        return_user = get_user.serialize()
        return jsonify(return_user), 200
    else:
        return 'USER NOT FOUND PLEASE SIGN UP', 403
    
@api.route('/deleteuser/<uid>', methods=['DELETE'])
def handle_delete_user(uid):
    get_user_to_delete = User.query.filter_by(uid=uid).first()
    db.session.delete(get_user_to_delete)
    db.session.commit()
    return jsonify('User has been deleted.'), 200

#@api.route('/updateprofile', methods=['PUT'])
#def handle_update_profile():
#    sent_info = request.json
#    current_user = User.query.filter_by(uid=sent_info['uid']).first()
# I've put this on backlog for now, I believe once we have the front end profile page set up and know what we're displaying, we'll know what we can update.

@api.route('/changepassword', methods=['PUT'])
def handle_change_password():
    sent_info = request.json
    get_user = User.query.filter_by(uid=sent_info['uid']).first()
    if get_user.password == sent_info['password']:
        get_user.password = sent_info['newpassword']
        return 'Password Updated', 200
    else: 
        return 'Incorrect Password', 401
