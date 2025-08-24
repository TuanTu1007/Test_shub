# DATA REPORT (ReactJS)

## 1. Giới thiệu

* Upload file báo cáo Excel (`.xlsx`) chứa dữ liệu giao dịch trong ngày của cửa hàng bán xăng dầu.
* Trích xuất dữ liệu từ file và hiển thị số lượng giao dịch.
* Nhập khoảng thời gian **bắt đầu - kết thúc** để lọc dữ liệu.
* Tính toán **Tổng Thành Tiền** trong khoảng thời gian đó (xử lý hoàn toàn ở **client-side**).

---

## 2. Công nghệ sử dụng

* **ReactJS**: Xây dựng giao diện.
* **xlsx**: Đọc & parse dữ liệu Excel.
* **flatpickr**: Chọn thời gian với giao diện trực quan.
* **TailwindCSS**: Thiết kế giao diện.

---

## 3. Cấu trúc dự án

```
data-report-app/
│── public/
│── src/
│   ├── components/
│   │   ├── FileUploader.jsx       # Upload file Excel
│   │   ├── TimeFilter.jsx         # Chọn khoảng thời gian & tính toán
│   │   └── ReportResult.jsx       # Hiển thị kết quả
│   ├── utils/
│   │   └── excelParser.js         # Hàm parse dữ liệu từ Excel
│   ├── App.jsx                    # Component chính
│   ├── index.js                   
│── package.json
```

---

## 4. Cách làm

### 4.1 Upload file Excel

* Người dùng chọn file `.xlsx`.
* File được parse bằng `xlsx`.
* Dữ liệu được ánh xạ từ **hàng header** và bỏ qua các dòng trống.

### 4.2 Lọc dữ liệu theo thời gian

* Nhập **giờ bắt đầu** và **giờ kết thúc** bằng `flatpickr`.
* Lọc các bản ghi có trường `Giờ` nằm trong khoảng này.

### 4.3 Tính toán Tổng Thành Tiền

* Sau khi lọc dữ liệu, tính tổng các giá trị trong cột **"Thành tiền (VNĐ)"**.
* Kết quả hiển thị với format tiền Việt (`toLocaleString('vi-VN')`).

---

## 5. Hướng dẫn cài đặt & chạy

### Bước 1: Clone dự án

```bash
git clone <repo-url>
cd TASK1-DATA-REPORT
```

### Bước 2: Cài đặt dependencies

```bash
npm install xlsx flatpickr tailwindcss
npx tailwindcss init
```
- Thêm cấu hình vào tailwind.config.js và import vào index.css:
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Bước 3: Chạy ứng dụng

```bash
npm run dev
```

### Bước 4: Sử dụng

1. Truy cập [http://localhost:5173](http://localhost:5173).
2. Upload file Excel `test_report.xlsx`.
3. Chọn thời gian bắt đầu và kết thúc.
4. Nhấn **Tính Tổng Thành Tiền** để xem kết quả.

---

