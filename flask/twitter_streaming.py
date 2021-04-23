
import tweepy
import json
from dateutil import parser
import time
import os
import subprocess
import re
from sp_caller import SpotifyAPI
import mysql.connector
from mysql.connector import errorcode



def get_track_id(urls):
    if(len(urls))>0:
        track_id = re.findall('(?<=track\/)[^.?]*',urls)
        if track_id:
            return track_id[0]
        return False
    else:
        return False

def connect_and_insert(timestamp,sp_url,track_id,artist,track_name):
        with open('mysql_config.json') as f:
            data = json.load(f)
            user=data["user"]
            password=data["password"]
            host=data["host"]
            database=data["database"]

        cnx = mysql.connector.connect(user=user, password=password,host=host,database=database)
        cursor = cnx.cursor()
        add_tweets = ("INSERT INTO Tweets "
                    "(tweetstamp, spotifyurls, trackid, artist,track_name)"
                    "VALUES (CURRENT_TIMESTAMP(), %(spotifyurls)s, %(trackid)s, %(artist)s, %(trackname)s)")


        data_tweets={
            'spotifyurls':sp_url,
            'trackid': track_id,
            'artist': artist,
            'trackname': track_name
        }
        cursor.execute(add_tweets, data_tweets)
        cnx.commit()
        cursor.close()
        
        cnx.close()

class StreamListener(tweepy.StreamListener):

    # This is a class provided by tweepy to access the Twitter Streaming API.
    
    def on_connect(self):
        print('Successfully connected to Twitter API.')

    def on_error(self, status_code):
        if status_code != 200:
            print('An error has occurred')
            return False  # disconnects the stream

    def on_data(self, raw_data):
        Spotify = SpotifyAPI()
        sp_url=[]
        try:
            time.sleep(1)
            data_json = json.loads(raw_data)
            timestamp=data_json["timestamp_ms"]
            urls=data_json["entities"]["urls"]
            
            for i in urls:
                sp_url.append(i['expanded_url'])
            
            track_ids=[]
            if sp_url:
                for i in sp_url:
                    track_ids.append(get_track_id(i))
                    if len(track_ids)!=0:
                        #spotify api call
                        for j in track_ids:
                            if j is not False:
                                artist,track_name=Spotify.get_track_information(i)
                                if artist is not False:
                                    if track_name is not False:
                                        print("sql call")
                                        connect_and_insert(timestamp,i,j,artist,track_name)
                

        except Exception as error:
            print('ERROR: {}'.format(error))

    
    


if __name__== '__main__':

	# # #Allow user input
	# track = []
	# while True:

	# 	input1  = input("what do you want to collect tweets on?: ")
	# 	track.append(input1)

	# 	input2 = input("Do you wish to enter another word? y/n ")
	# 	if input2 == 'n' or input2 == 'N':
	# 		break
	
	# print("You want to search for {}".format(track))
	# print("Initialising Connection to Twitter API....")
	# time.sleep(2)

	# authentification so we can access twitter
    
    with open('api_keys.json', 'r') as file:
        api_keys = json.loads(file.read())
    
 
    

    with open('search.json', 'r') as file:
        search = json.loads(file.read())

    auth = tweepy.OAuthHandler(api_keys['consumer_key'], api_keys['consumer_secret'])
    auth.set_access_token(api_keys['access_token'], api_keys['access_token_secret'])

    listener = StreamListener(api=tweepy.API(wait_on_rate_limit=True))
    streamer = tweepy.Stream(auth=auth, listener=listener)

    print('Streaming...')
    st=time.time()
    end=time.time()+20
    while time.time()<end:
        if search['words']:
            print('Search terms: {}'.format(search['words']))
            print('Languagues: {}'.format(search['languages']))
            streamer.filter(track=search['words'], languages = search['languages'],locations=[])
        else:
            print('Your list of search terms is empty.')

    print("streaming ends")
    streamer.disconnect()