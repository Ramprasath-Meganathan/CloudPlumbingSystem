from predictionService import predict_categories 
import json 
from unittest.mock import Mock
def test_prediction_result():
    # Fetch files from s3 bucket specific to the user for performing prediction 
    username = "user" 

    data = {'username': username }
    data = data
    req = Mock(get_json=Mock(return_value=data, args=data))
    # Call tested function

    assert predict_categories(req) == { "result": "success"}

test_prediction_result()