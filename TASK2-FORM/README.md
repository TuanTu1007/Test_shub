# Form nhập giao dịch (React + MUI + React Hook Form + Yup + Flatpickr)
## 1. Mô tả cách thực hiện
Các bước thực hiện chính:
- **UI**: sử dụng thư viện [MUI] để xây dựng form, button, select và các thành phần giao diện.
- **Quản lý form**: sử dụng [react-hook-form] kết hợp với [Yup] để kiểm tra và validate dữ liệu nhập vào.
- **DateTime Picker**: sử dụng [Flatpickr] để nhập thời gian với định dạng `d/m/Y H:i:S`.
- **Custom Label**: tạo component `FormField` để hiển thị label nhỏ gọn nằm trên input, giúp form đẹp và rõ ràng hơn.
- **Snackbar**: sử dụng `Snackbar` của MUI để hiển thị thông báo khi submit form thành công.

## 2. Cấu trúc dự án
```
project-root/
│── src/
│ ├── App.jsx # Component chính chứa form
│ ├── index.js 
│ ├── App.css 
│ └── ... # Các file/thư mục khác
│
├── package.json 
├── README.md # Hướng dẫn dự án
```

## 3. Hướng dẫn cài đặt & chạy

### Bước 1: Clone dự án

```bash
git clone <repo-url>
cd TASK2-FORM
```

### Bước 2: Cài đặt dependencies

```bash
npm install react react-dom @mui/material @mui/icons-material react-hook-form yup @hookform/resolvers flatpickr tailwindcss
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
2. Nhập các trường thông tin -> Cập nhật