from pymongo import MongoClient
import json
import pandas as pd
from pyspark.sql.types import DoubleType
from pyspark.sql import*
import pyspark.sql.functions as f
#import SparkContext and SparkConf
from pyspark import SparkContext, SparkConf
import regex as re


# conf = SparkConf().setMaster("local").setAppName("sparkproject")
# #start spark cluster 
# #if already started then get it else start it 
# sc = SparkContext.getOrCreate(conf=conf)
# #initialize SQLContext from spark cluster 
# sqlContext = SQLContext(sc)
def mongoget():
    with open('api_keys.json') as f:
        data = json.load(f)
        mongourl=data['mongourl']


    client = MongoClient(mongourl)
    db= client.get_database('Spotipfy')
    users=db.users
    documents = users.find()
    ud=[]
    for document in documents:
        u=document['all_data']['user_data']['display_name']
        trackdata=document['all_data']['recent_tracks']['items']


        for i in trackdata:
            tdata={}
            tdata['Trackname']=i['track']['name']
            tdata['Artist']=i['track']['artists'][0]['name']
            tdata['id']=i['track']['id']
            tdata['User']=u
            ud.append(tdata)
    return ud

def user_rc(check):
    conf = SparkConf().setMaster("local").setAppName("sparkproject")
#start spark cluster 
#if already started then get it else start it 
    #sc = SparkContext.getOrCreate(conf=conf)
    spark1 = SparkSession.builder.getOrCreate() 
    #udf=pd.DataFrame.from_dict(ud)
    ud=mongoget()
# A JSON dataset is pointed to by path.
    tempdf=pd.DataFrame.from_dict(ud)
    udf=spark1.createDataFrame(tempdf)
    udf_grouped = udf.groupBy("id").agg(f.collect_set(f.col("User")).alias("name"))#agg(f.collect_set(f.col("User")).alias("name"))
    udf_joined = udf_grouped.join(udf, "id", "outer")
    udf_distinct = udf_joined.distinct()
    udf_names=udf_distinct.groupBy('name').count()
    my_list = udf_names.select(f.collect_list('name')).first()[0]
    names=[]
    for i in my_list:
        if len(i)>1:
            if check in i:
                ind=i.index(check)
                names.append(i[:ind]+i[ind+1:])
    spark1.stop()
    return names

def artist_rc(check):
    spark = SparkSession.builder.getOrCreate() 
    #udf=pd.DataFrame.from_dict(ud)
    ud=mongoget()
    tempdf=pd.DataFrame.from_dict(ud)
    udf=spark.createDataFrame(tempdf)
    df_g= spark.read.options(header='True', delimiter=',').csv("data/data_w_genres.csv")#spark.read.csv("data/data_w_genres.csv")
    df_a_g=df_g.select(df_g.artists, df_g.popularity,df_g.genres)
    ar_df=udf.join(df_a_g,udf.Artist ==df_a_g.artists)
    
    ar_df=ar_df.filter(ar_df.User == check)
    ar_df1=ar_df.groupBy('Artist').count().select('Artist', f.col('count').alias('a_count')).where(f.col("a_count")>2)
    ar_df2=ar_df1.join(ar_df,'Artist','outer')
    ar_df2=ar_df2.filter(ar_df2.a_count>2)
    artists=ar_df2.collect()
    temp_genres=[]
    for row in artists:
        temp_genres.append(row["genres"])

    gen=[]
    for i in temp_genres:
        ar=i.split(',')
        for j in ar:
            j=re.sub(r'[^\w\s]','',j)
            gen.append(j)
    
    gen=list(set(gen))

    ##getting data from dataand operating on it.
    df_a_g=df_a_g.withColumn('genres', f.translate('genres', '[', ''))
    df_a_g=df_a_g.withColumn('genres', f.translate('genres', ']', ''))
    df_a_g=df_a_g.withColumn('genres', f.translate('genres', "'", ""))
    df_a_g=df_a_g.filter(df_a_g.genres!='')
    df_a_g1=df_a_g.withColumn("popularity", f.round(df_a_g["popularity"],3).cast('float'))
    df_a_g1=df_a_g1.orderBy(df_a_g1.popularity.desc())
    recomm_artists={}
    recomm_gn=[]
    #a_rec=df_a_g1.filter(df_a_g1.genres.isin(gen))
    #a_rec.show()
    for i in gen:
        a_rec=df_a_g1.filter(df_a_g1.genres.like(i+'%'))
        if (len(a_rec.head(1)) != 0):
            for row in a_rec.collect():
                if row["artists"] not in recomm_artists:
                    recomm_artists[row["artists"]]=row["popularity"]
                if row["genres"] not in recomm_gn:
                    recomm_gn.append(row["genres"])
    
    rg=list(set(recomm_gn))
    recg=[i.split(",")for i in rg]
    rec_gen=[]
    for i in recg:
        for j in i:
            rec_gen.append(j)
    rec_genre=list(set(rec_gen))
    ra={k:v for k, v in sorted(recomm_artists.items(), key=lambda item: item[1])}
    spark.stop()
    return rec_genre,ra

    

    #artists = ar_df.groupBy("Artist").agg(f.count("Artist").alias("a_count")).where(f.col("a_count")>2).show()



# if __name__=="__main__":
#     print(artist_rc('Vinjit'))