# Python3 샘플 코드 #
import os
import requests
from dotenv import load_dotenv
load_dotenv()

api_key = os.getenv("TRADE_API_KEY")
startYm = str(201601)
endYm = str(201601)

print(api_key)

url = 'http://apis.data.go.kr/1220000/nitemtrade/getNitemtradeList'
params ={'serviceKey' : api_key, 'strtYymm' : '201601', 'endYymm' : '201601', 'hsSgn' : '1001999090', 'cntyCd' : 'US' }

print(params)
response = requests.get(url, params=params)
print(response)
print(response.content)