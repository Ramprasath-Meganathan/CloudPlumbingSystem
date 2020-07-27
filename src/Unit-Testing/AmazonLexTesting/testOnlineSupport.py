from onlineSupportLexTesting import online_support
import json 
from unittest.mock import Mock
import sys 
import unittest

class TestOnlineSupportModule(unittest.TestCase):

    def test_online_support_get_users(self):
        with open("testEvent_onlineUsers.json", "r") as f:
            event = json.dumps(json.load(f))
            json_obj = online_support(event)
            # Check if whether response is received as an json object 
            self.assertIsInstance(type(json_obj), object)

    def test_online_support_data_processing(self):
        with open("testEvent_dataProcessing.json", "r") as f:
            event = json.dumps(json.load(f))
            json_obj = online_support(event)

            # Check if whether response is received as an json object 
            self.assertIsInstance(type(json_obj), object)

    def test_online_support_prediction(self):
        with open("testEvent_prediction.json", "r") as f:
            event = json.dumps(json.load(f))
            json_obj = online_support(event)

            # Check if whether response is received as an json object 
            self.assertIsInstance(type(json_obj), object)


if __name__ == '__main__':
   log_file = 'OnlineSupportLogFile.txt'
   with open(log_file, "w") as f:
       runner = unittest.TextTestRunner(f)
       unittest.main(testRunner=runner)