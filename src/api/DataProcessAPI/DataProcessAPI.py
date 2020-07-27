from wordcloud import WordCloud, STOPWORDS
from flask import request, Flask
import json
from flask_cors import CORS
import boto3


app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
finalstring = ''

with open('credentials.json') as credentialsFile:
    credentials = json.load(credentialsFile)

s3Client = boto3.client(
    's3',
    aws_access_key_id=credentials['ACCESS_KEY'],
    aws_secret_access_key=credentials['SECRET_KEY'],
    aws_session_token=credentials['SESSION_TOKEN']
)


s3Resource = boto3.resource('s3',
                            aws_access_key_id=credentials['ACCESS_KEY'],
                            aws_secret_access_key=credentials['SECRET_KEY'],
                            aws_session_token=credentials['SESSION_TOKEN'])


@app.route("/uploadfiles", methods=["POST"])
def upload():
    fileName = 'Image.png'
    url = ''
    with open('./english.txt') as stop_wordslist:
            stop_words = set(str(stop_wordslist.read()).split(),)
    finalstring = ''
    data = dict((key, request.files.getlist('files'))
                for key in request.files.keys())
    for firstvalue in data.values():
        for value in firstvalue:
                filename = value.filename
                content = value.read()
                fileContent = content.decode('utf-8')
                s3Client.put_object(Bucket="wordcloudbucket",
                                    Body=content, Key=filename)
                words = fileContent.split()
                for word in words:
                    if(word[0].isupper()):
                        if word.lower() not in stop_words:
                            if word not in finalstring:
                                finalstring = finalstring+' '+word
                wordcloud = WordCloud(
                    stopwords=STOPWORDS,
                    background_color='white',
                    width=400,
                    height=400,
                    min_font_size=7
                ).generate(finalstring)
                wordcloud.to_file(fileName)
                s3Client.upload_file(fileName, "wordcloudbucket", fileName)
                object_acl = s3Resource.ObjectAcl('wordcloudbucket', fileName)
                response = object_acl.put(ACL='public-read')
                url = s3Client.generate_presigned_url('get_object',
                                                      Params={
                                                          'Bucket': 'wordcloudbucket',
                                                          'Key': fileName,
                                                      }
                                                      )
    return (url)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
