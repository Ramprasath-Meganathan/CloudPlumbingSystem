import boto3  
import json 

def online_support(event):
    lambda_function_arn = "arn:aws:lambda:us-east-1:526546090537:function:onlineSupport"
    client = boto3.client('lambda')
    response = client.invoke(
        FunctionName=lambda_function_arn,
        InvocationType='RequestResponse',
        LogType='Tail',
        Payload= event,
    )
    return response['Payload'].read().decode('utf-8')