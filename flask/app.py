import json
from flask import Flask, request, redirect, g, render_template,jsonify,make_response
import mysql.connector
import requests
from urllib.parse import quote
from pymongo import MongoClient
from werkzeug.datastructures import Headers
from flask_cors import CORS
from user_recommendation import user_rc,artist_rc




# Authentication Steps, paramaters, and responses are defined at https://developer.spotify.com/web-api/authorization-guide/
# Visit this url to see all the steps, parameters, and expected response.


app = Flask(__name__)
CORS(app,allow_headers="*")
#session secret key
app.secret_key = 'checkers'

#  Client Keys
CLIENT_ID = "7bc9b3a4d3e0450d8027dd99bd1e03a5"
CLIENT_SECRET = "fb0f3b9d65bc40b692564bcc0dd579f8"

# Spotify URLS
SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize"
SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token"
SPOTIFY_API_BASE_URL = "https://api.spotify.com"
API_VERSION = "v1"
SPOTIFY_API_URL = "{}/{}".format(SPOTIFY_API_BASE_URL, API_VERSION)

# Server-side Parameters
CLIENT_SIDE_URL = "http://127.0.0.1"
PORT = 8080
REDIRECT_URI = "{}:{}/callback/".format(CLIENT_SIDE_URL, PORT)
SCOPE = "playlist-modify-public playlist-modify-private user-read-recently-played user-top-read user-read-currently-playing"
STATE = ""
SHOW_DIALOG_bool = True
SHOW_DIALOG_str = str(SHOW_DIALOG_bool).lower()

auth_query_parameters = {
    "response_type": "code",
    "redirect_uri": REDIRECT_URI,
    "scope": SCOPE,
    # "state": STATE,
    # "show_dialog": SHOW_DIALOG_str,
    "client_id": CLIENT_ID
}
#Database

client = MongoClient("mongodb+srv://alias:password#123@cluster0.b7d2i.mongodb.net/Spotifpy?retryWrites=true&w=majority")
db= client.get_database('Spotipfy')
#Mysql databse

with open('mysql_config.json') as f:
            data = json.load(f)
            user=data["user"]
            password=data["password"]
            host=data["host"]
            database=data["database"]

# spotify endpoints
USER_PROFILE_ENDPOINT = "{}/{}".format(SPOTIFY_API_URL, 'me')
USER_PLAYLISTS_ENDPOINT = "{}/{}".format(USER_PROFILE_ENDPOINT, 'playlists')
USER_TOP_ARTISTS_AND_TRACKS_ENDPOINT = "{}/{}".format(
    USER_PROFILE_ENDPOINT, 'top')  # /<type>
USER_RECENTLY_PLAYED_ENDPOINT = "{}/{}/{}".format(USER_PROFILE_ENDPOINT,
                                                  'player', 'recently-played')
BROWSE_FEATURED_PLAYLISTS = "{}/{}/{}".format(SPOTIFY_API_URL, 'browse',
                                              'featured-playlists')
USER_CURRENTLY_PLAYED_ENDPOINT="{}/{}/{}".format(USER_PROFILE_ENDPOINT,
                                                  'player', 'currently-playing')
SEARCH_ENDPOINT = "{}/{}".format(SPOTIFY_API_URL, 'search')
session={}
authhead=""


@app.route('/',methods=['POST','GET'])
def index():

    return auth()
        

@app.route("/auth",methods=['POST','GET'])
def auth():
    # Auth Step 1: Authorization
    url_args = "&".join(["{}={}".format(key, quote(val)) for key, val in auth_query_parameters.items()])
    auth_url = "{}/?{}".format(SPOTIFY_AUTH_URL, url_args)
    return redirect(auth_url)


@app.route("/callback/")
def callback():
    global users
    global session
    global authhead
    data={}
    data['all_data']={}
    # Auth Step 4: Requests refresh and access tokens
    auth_token = request.args['code']
    code_payload = {
        "grant_type": "authorization_code",
        "code": str(auth_token),
        "redirect_uri": REDIRECT_URI,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
    }
    post_request = requests.post(SPOTIFY_TOKEN_URL, data=code_payload)

    # Auth Step 5: Tokens are Returned to Application
    response_data = json.loads(post_request.text)
    access_token = response_data["access_token"]

    refresh_token = response_data["refresh_token"]
    token_type = response_data["token_type"]
    expires_in = response_data["expires_in"]

    # Auth Step 6: Use the access token to access Spotify API
    authorization_header = {"Authorization": "Bearer {}".format(access_token)}
    authhead = authorization_header
    #user profile endpoint
    user_profile_api_endpoint = "{}/me".format(SPOTIFY_API_URL)
    profile_response = requests.get(user_profile_api_endpoint, headers=authorization_header)
    profile_data = json.loads(profile_response.text)
    data['Name']=profile_data['display_name']
    data['all_data']['user_data']=profile_data
    session["user"]=profile_data['display_name']
    print(session["user"])
    #playlists endpoint
    playlist_api_endpoint = "{}/playlists".format(profile_data["href"])
    playlists_response = requests.get(playlist_api_endpoint, headers=authorization_header)
    playlist_data = json.loads(playlists_response.text)
    data['all_data']['usersplaylist']=playlist_data
    #top artists endpoint


    url = "{}/{type}?time_range={tm}&limit={li}&offset=0".format(USER_TOP_ARTISTS_AND_TRACKS_ENDPOINT, type='artists',tm='long_term',li=50)
    top_a_resp = requests.get(url, headers=authorization_header)
    top_artists=json.loads(top_a_resp.text)
    data['all_data']['top_artists']=top_artists

    # tracks endpoint 
    url = "{}/{type}?time_range={tm}&limit={li}&offset=0".format(USER_TOP_ARTISTS_AND_TRACKS_ENDPOINT, type='tracks',tm='long_term',li=50)
    top_t_resp = requests.get(url, headers=authorization_header)
    top_tracks=json.loads(top_t_resp.text)
    data['all_data']['top_tracks']=top_tracks
    #recently playing endpoint
    url = USER_RECENTLY_PLAYED_ENDPOINT+'?limit=50'
    recent_resp = requests.get(url, headers=authorization_header)
    recent_tracks=json.loads(recent_resp.text)
    data['all_data']['recent_tracks']=recent_tracks

    #loding data to mongo


    #current playing track endpoint
    # url= USER_CURRENTLY_PLAYED_ENDPOINT
    # current_resp=requests.get(url,headers=authorization_header)
    # if current_resp.text is None:
    #     current_track={"track":0}
    # else:
    #     current_track=json.loads(current_resp.text)


    users=db.users
    if len(list(users.find({'Name':data['Name']})))==1:
        print('{}User Already there'.format(data['Name']))
        users.update({'Name':data['Name']},{'$set':{'all_data':data['all_data']}})
    else:
        users.update_one(data,{'$set':data},upsert=True)
    return redirect("http://localhost:3000/Home")

@app.route("/api/profile",methods=['GET','POST'])
def profile():
    
    users=db.users
    documents = users.find({"Name":session['user']})
    response = []
    for document in documents:
        document['_id'] = str(document['_id'])
        response.append(document['all_data']['user_data'])

    res=make_response(jsonify(response))
    # res.headers.add("Access-Control-Allow-Origin", "*")
    # res.headers.add('Access-Control-Allow-Headers', "*")
    # res.headers.add('Access-Control-Allow-Methods', "*")

    return res

@app.route("/api/playlists")
def playlists():
    users=db.users
    documents = users.find({"Name":session['user']})
    playlists = []
    for document in documents:
        document['_id'] = str(document['_id'])
        playlists_items=document['all_data']['usersplaylist']["items"]
    
    for i in playlists_items:
         playlists.append(i['name'])

    return jsonify(playlists)

@app.route("/api/tracks")
def tracks():
    users=db.users
    documents = users.find({"Name":session['user']})
    track_names = []
    track_popularity=[]
    track_albums=[]
    for document in documents:
        document['_id'] = str(document['_id'])
        track_items=document['all_data']['top_tracks']['items']
    
    for i in track_items:
        track_names.append(i['name'])
        track_popularity.append(i['popularity'])
        track_albums.append(i['album']['name'])
    return jsonify(track_names,track_popularity,track_albums)

@app.route("/api/trending_tracks")
def trending_tracks():
    cnx = mysql.connector.connect(user=user, password=password,host=host,database=database)
    cursor = cnx.cursor()
    sql="select artist, track_name, count(trackid) from Tweets group by trackid order by count(trackid) desc limit 20;"
    cursor.execute(sql)
    res=cursor.fetchall()
    twitter_trending_tracks=[]
    for i in res :
        track_det={}
        track_det["track_artist"]=i[0]
        track_det["track_name"]=i[1]
        track_det["track_trend"]=i[2]
        twitter_trending_tracks.append(track_det)
    
    return jsonify(twitter_trending_tracks)

@app.route("/api/trending_artists")
def trending_artists():
    cnx = mysql.connector.connect(user=user, password=password,host=host,database=database)
    cursor1 = cnx.cursor()
    sql2="select artist, count(artist) from Tweets group by artist order by count(artist) desc limit 30;"

    cursor1.execute(sql2)
    res1=cursor1.fetchall()

    twitter_trending_artists=[]
    for i in res1:
        art_det={}
        art_det["artist_name"]=i[0]
        art_det["artist_trend"]=i[1]
        twitter_trending_artists.append(art_det)
    
    return jsonify(twitter_trending_artists)


@app.route("/api/search",methods=['GET','POST'])
def search():
    if request.method=='POST':
        sk=request.json
        print(sk)
        search_type=sk["type"]
        if search_type not in ['artist', 'track', 'album', 'playlist']:
            print('invalid type')
            return None
        myparams = {'type': search_type}
        myparams['q'] = sk["search"]
        myparams['limit']=1
        print(myparams)
        resp = requests.get(SEARCH_ENDPOINT, params=myparams,headers=authhead)
        print(jsonify(resp.text))
        return jsonify(resp.text)

@app.route("/api/userrecomm")
def userrecomm():
    global session
    users=db.users
    names=user_rc(session['user'])
    r_no_users=[item for sublist in names for item in sublist]
    recommended_users=list(set(r_no_users))

    response = []
    for i in recommended_users:
        documents = users.find({"Name":i})
        for document in documents:
            document['_id'] = str(document['_id'])
            response.append(document['all_data']['user_data'])
    return jsonify(response)

@app.route("/api/artistrecomm")
def artistrecomm():
    global session
    rg,ra=artist_rc(session['user'])
    recommended_a=[]
    for k,v in ra.items():
        reca={}
        reca["artist_name"]=k
        reca["popularity"]=v
        recommended_a.append(reca)
    recommended_artists=recommended_a[-10:]
    recommended_genres=rg[-10:]
    return jsonify(recommended_artists[::-1],recommended_genres[::-1])



@app.route('/api/logout')
def logout():
    session["logout"]=True
    return redirect("http://localhost:3000/")



if __name__ == "__main__":
    app.run(debug=True, port=PORT)