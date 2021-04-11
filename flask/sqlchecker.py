import mysql.connector
import json

with open('mysql_config.json') as f:
            data = json.load(f)
            user=data["user"]
            password=data["password"]
            host=data["host"]
            database=data["database"]

cnx = mysql.connector.connect(user=user, password=password,host=host,database=database)
cursor = cnx.cursor()
sql="select artist, track_name, count(trackid) from Tweets group by trackid order by count(trackid) desc ;"
sql2="select artist, count(artist) from Tweets group by artist order by count(artist) desc ;"

cursor.execute(sql)
res=cursor.fetchall()
twitter_trending_tracks=[]
for i in res :
    track_det={}
    track_det["track_artist"]=i[0]
    track_det["track_name"]=i[1]
    track_det["track_trend"]=i[2]
    twitter_trending_tracks.append(track_det)

    

cursor.close()

cursor1=cnx.cursor()
cursor1.execute(sql2)
res1=cursor1.fetchall()

twitter_trending_artists=[]
for i in res1:
    art_det={}
    art_det["artist_name"]=i[0]
    art_det["artist_trend"]=i[1]
    twitter_trending_artists.append(art_det)


print(twitter_trending_artists,twitter_trending_tracks)

cursor1.close()
cnx.close()