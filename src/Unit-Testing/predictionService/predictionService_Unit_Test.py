import unittest 
import requests 
import os 
import json 

class TestPredictionServiceModule(unittest.TestCase):

    def test_upload_file_service(self):
        path = "test_files"
        text_files = [f for f in os.listdir(path)]
        contents = [] 
        for i in range(len(text_files)):
            f = open(f"{path}/{text_files[i]}","r")
            data = f.read() 
            f.close() 
            contents.append(data)
        json_obj = {  "username": "user", "files": contents, "titles": text_files  }
        req = requests.post("https://us-central1-pelagic-media-276804.cloudfunctions.net/uploadFileService", json= json_obj)
        result = "success"

        #Executing the test case 
        self.assertEqual(req.json()['results'], result)

    def test_prediction_file_service(self):
        json_obj = {  "username": "user" }

        req = requests.post("https://us-central1-pelagic-media-276804.cloudfunctions.net/predictionService", json= json_obj)

        response = req.json() 

        self.assertIsInstance(type(response), object)


if __name__ == '__main__':
   log_file = 'predictionServiceLogFile.txt'
   with open(log_file, "w") as f:
       runner = unittest.TextTestRunner(f)
       unittest.main(testRunner=runner)