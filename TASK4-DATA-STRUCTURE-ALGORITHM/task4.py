import requests

# Lấy dữ liệu input
url_input = "REMOVED"
resp = requests.get(url_input)
input_data = resp.json()

token = input_data['token']
data = input_data['data']
queries = input_data['query']

n = len(data)

prefixSum = [0] * n
prefixSum[0] = data[0]
for i in range(1, n):
    prefixSum[i] = prefixSum[i-1] + data[i]

altSum = [0] * n
altSum[0] = data[0]
for i in range(1, n):
    altSum[i] = data[i] - altSum[i-1]

results = []
for q in queries:
    l, r = q['range']
    if q['type'] == "1":
        total = prefixSum[r] - (prefixSum[l-1] if l > 0 else 0)
        results.append(total)
    elif q['type'] == "2":
        if l == 0:
            val = altSum[r]
        else:
            val = altSum[r] - altSum[l-1] if (l % 2 == 0) else altSum[r] + altSum[l-1]
        results.append(val)

print(results)

# Gửi kết quả
url_output = "REMOVED"
headers = {
    "Authorization": f"Bearer {token}",
    "Content-Type": "application/json"
}

resp_post = requests.post(url_output, json=results, headers=headers)
print(resp_post.text)
