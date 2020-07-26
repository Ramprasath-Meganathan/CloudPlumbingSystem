import pickle
import numpy as np
import matplotlib.pyplot as plt
from flask import request, jsonify
import urllib.request
import json 
import boto3 

aws_access_key_id = "ASIAXVGEXXIURHK4MZBG"
aws_secret_access_key = "xCT6Rx/iRsvWoFYbK9Q1FD5QR8YhsSwD/LHVFmZY"
aws_session_key_id = "FwoGZXIvYXdzEA8aDCkNRzVpsO3SPMblbiK+AYVS+WsasGovcgZiNbUk9WmCMrNHsyIqEugdnyfUOxtUMOjCLFkkchH8aoyY4rpWLONcS4xsHNW5czHTQT+KOH08M1bjCMRCMnf7rvMnGOAGUlYIq9GIJuJhcv/j0bje9Am9X80Tc3El4Uh9xhdxw2VeHii5UIW5B8IR/o6TlnXMtTP4PQhiPT+HqV61aA6LwS1R1ZxGtu7xDyN3BQBObVRda0nSCMKSNFx6jLEY2SSNKuTjH3W+2tN2OzbEiZ8olqn0+AUyLbc2I0vRV42ZS/JX0AvOvB7lZa9f/7+aD/OGgk4JaxNPfBbVmbRKRGS10y9ggA=="
s3_client = boto3.client('s3',
                      aws_access_key_id=aws_access_key_id,
                      aws_secret_access_key=aws_secret_access_key,
                      aws_session_token=aws_session_key_id,
                      region_name="us-east-1"
                      )

def predict_categories(request):

    content = request.get_json(silent=True)
    username = content['username']

    response = s3_client.list_objects(Bucket="prediction-service-catalog", Prefix=f"{username}/")
    file_names = [] 
    contents = [] 
    for content in response.get('Contents', []):
        data = s3_client.get_object(Bucket='prediction-service-catalog', Key=content['Key'])
        data = json.loads(data['Body'].read().decode('UTF-8'))
        file = content.get('Key').replace(f"{username}/", "")
        contents.append(data['content'])
        file_names.append(file)
    
    vectorizer = pickle.load(urllib.request.urlopen("https://storage.googleapis.com/newsgroup-trained-model/vectorizer.pkl"))
    Y = vectorizer.transform(contents)
    model = pickle.load(urllib.request.urlopen("https://storage.googleapis.com/newsgroup-trained-model/model.pkl"))
    prediction = model.predict(Y).tolist()

    # tuples = tuple(zip(prediction, file_names))

    json_obj = list(map(lambda x,y,z: { "cluster": x, "title": y }, prediction, file_names, contents ))
    # Set CORS headers for the main request
    headers = {
        'Access-Control-Allow-Origin': '*'
    }

    return { "result": "success"}