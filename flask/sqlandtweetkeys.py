import json

# Write here your Twitter API keys
# More info: https://developer.twitter.com/en/docs/basics/apps/overview
api_keys = {
    'consumer_key': 'sXm9eNCnL3NgLC0DVR51QmGV4',
    'consumer_secret':'g7lE3zb888IoAecIFYrPVkGa5oQtxi2GLo31rZKDcX64d8D3oY' ,
    'access_token': '1088819987995754496-ZGq11cH0QhTP22BNIvUDuTXkBKwywc',
    'access_token_secret': '7FdNKnHUprGn0YVND86nmXCBPg1UHsPyC85nNm0M4XtJE'
}

# Write here your MySQL access parameters
my_sql_config = {
    'user': 'YOUR USER',
    'password': 'YOUR PASSWORD',
    'host': 'YOUR HOST',
    'database': 'YOUR DATABASE'
}

# Write here your search parameters as a list
    # English: 'en'
    # Portuguese: 'pt'
search = {
    'words': ['spotify com'],
    'languages': ['en']
}

if __name__ == '__main__':
    try:
        json_keys = json.dumps(api_keys)
        with open("api_keys.json", "w") as file:
            file.write(json_keys)

        json_config = json.dumps(my_sql_config)
        with open("mysql_config.json", "w") as file:
            file.write(json_config)

        json_search = json.dumps(search)
        with open("search.json", "w") as file:
            file.write(json_search)

        print('Keys and configs written!')
    except:
        print('Oops, something went wrong!')