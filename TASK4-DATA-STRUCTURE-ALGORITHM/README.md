# Task 4

## Cách làm
1. **Tiền xử lý**:
   - `prefixSum[i] = data[0] + ... + data[i]` (tổng thường).
   - `altSum[i] = data[0] - data[1] + data[2] - ... ± data[i]` (tổng xen kẽ).

2. **Trả lời truy vấn**:
   - Loại 1:  
     `sum(l,r) = prefixSum[r] - prefixSum[l-1] (nếu l > 0)`.
   - Loại 2:  
     - Nếu `l == 0` → `altSum[r]`.  
     - Nếu `l` chẵn → `altSum[r] - altSum[l-1]`.  
     - Nếu `l` lẻ → `altSum[r] + altSum[l-1]`.

3. **Trả kết quả**: gửi mảng kết quả lên API output.

---

## Cấu trúc dự án

```
project/
│
├─ task4.py          # Script xử lý truy vấn và gửi kết quả
├─ .env             # Chứa các biến môi trường INPUT_URL và OUTPUT_URL
└─ README.md
```

## Hướng dẫn thực thi
### Yêu cầu:
- Python 3.10+
- Thư viện `requests`

Cài đặt requests:
```
pip install requests python-dotenv
```

### Chạy chương trình
```
python task4.py
```
