import requests
import boto3

s3_client = boto3.client('s3',
                      aws_access_key_id="ASIAXVGEXXIUYLECM56K",
                      aws_secret_access_key="/fhXLvQ4FfuXj1AhxXJiS7GAEgbgs0vSFS7HBwcJ",
                      aws_session_token="FwoGZXIvYXdzEO///////////wEaDAhDFtxBjQxXwQPIkyK+ATto224q4Por8/OcIsWUZuVs+VFJtuQTTtveZ/pW+AVfTS2GCwk70XPdozb1/UshUbo1n+wv0MpeZiGf63jlIqzOs3mg/6oJc0rzK1GBYZh8PCsR77gXxgcc8lqFDUMZJZ6QQI+FsxoSeS8y57V7v2rx238U7EZlO9iN6k/GQ2dm0IiARDR7RbrkE+ndbYtRW6AbEyHAUDTDSL/g6AJw2oNxAngwAKvyRL8hEbKNKjhkToYpjVuuGn5WmBCPQwAo5Kft+AUyLUjkTldwbmJ2tyeEA0uVCRrk/yQbfQKzXXvQeHUegBi/ry/+lx8S2eyhGtOz+A==FwoGZXIvYXdzEO///////////wEaDAhDFtxBjQxXwQPIkyK+ATto224q4Por8/OcIsWUZuVs+VFJtuQTTtveZ/pW+AVfTS2GCwk70XPdozb1/UshUbo1n+wv0MpeZiGf63jlIqzOs3mg/6oJc0rzK1GBYZh8PCsR77gXxgcc8lqFDUMZJZ6QQI+FsxoSeS8y57V7v2rx238U7EZlO9iN6k/GQ2dm0IiARDR7RbrkE+ndbYtRW6AbEyHAUDTDSL/g6AJw2oNxAngwAKvyRL8hEbKNKjhkToYpjVuuGn5WmBCPQwAo5Kft+AUyLUjkTldwbmJ2tyeEA0uVCRrk/yQbfQKzXXvQeHUegBi/ry/+lx8S2eyhGtOz+A=="
                      )
# s3_client.put_object(
#     Bucket='prediction-service-catalog',
#     Key='user/doctor.txt'
# )

user = "computer"
# response = s3_client.list_objects(Bucket="prediction-service-catalog", Prefix="user/")
# file_names = []
# for content in response.get('Contents', []):
#     file = content.get('Key').replace("user/", "")
#     file_names.append(file)
