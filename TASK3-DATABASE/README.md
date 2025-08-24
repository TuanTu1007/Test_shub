# Task 3 – Hệ thống quản lý trạm xăng

## 1. Bảng `gas_station` (Trạm xăng)

Lưu thông tin về từng trạm xăng trong hệ thống.

| Trường | Kiểu dữ liệu | Mô tả |
|--------|--------------|-------|
| id | INT, PK, AUTO_INCREMENT | Mã định danh duy nhất của trạm xăng |
| name | VARCHAR | Tên trạm xăng |
| address | VARCHAR | Địa chỉ chi tiết |
| phone | VARCHAR | Số điện thoại liên hệ |
| status | VARCHAR, default 'active' | Trạng thái hoạt động của trạm (active,…) |
| created_at | DATETIME | Ngày giờ tạo |
| updated_at | DATETIME | Ngày giờ cập nhật |

---

## 2. Bảng `product` (Hàng hóa / Nhiên liệu)

Lưu thông tin về các loại xăng/dầu mà trạm bán.

| Trường | Kiểu dữ liệu | Mô tả |
|--------|--------------|-------|
| id | INT, PK, AUTO_INCREMENT | Mã định danh duy nhất cho sản phẩm |
| name | VARCHAR | Tên hàng hóa|
| sku | VARCHAR, UNIQUE | Mã định danh sản phẩm |
| unit | VARCHAR, default 'liter' | Đơn vị tính |
| active | BOOLEAN | Trạng thái hoạt động (true = còn bán, false = ngừng bán) |
| created_at | DATETIME | Ngày giờ tạo |
| updated_at | DATETIME | Ngày giờ cập nhật |

---

## 3. Bảng `pump` (Trụ bơm)

Quản lý từng trụ bơm tại mỗi trạm.

| Trường | Kiểu dữ liệu | Mô tả |
|--------|--------------|-------|
| id | INT, PK, AUTO_INCREMENT | Mã định danh của trụ bơm |
| station_id | INT, FK → gas_station.id | Trụ thuộc trạm xăng nào |
| code | VARCHAR | Mã trụ bơm |
| product_id | INT, FK → product.id | Trụ này chuyên bơm loại xăng/dầu nào |
| status | VARCHAR, default 'active' | Tình trạng trụ (active,…) |
| created_at | DATETIME | Ngày tạo |
| updated_at | DATETIME | Ngày cập nhật |
| ux_station_pump_code | UNIQUE | Đảm bảo trong một trạm không có 2 trụ trùng mã |

---

## 4. Bảng `sale_txn` (Giao dịch bán hàng)

Ghi lại chi tiết từng lần bơm xăng/dầu.

| Trường | Kiểu dữ liệu | Mô tả |
|--------|--------------|-------|
| id | BIGINT, PK, AUTO_INCREMENT | Mã định danh giao dịch |
| station_id | INT, FK → gas_station.id | Giao dịch thuộc trạm nào |
| pump_id | INT, FK → pump.id | Thực hiện tại trụ nào |
| product_id | INT, FK → product.id | Bán loại nhiên liệu nào |
| txn_time | DATETIME | Thời gian phát sinh giao dịch |
| quantity_liter | DECIMAL | Số lít bán ra |
| unit_price | DECIMAL | Đơn giá 1 lít tại thời điểm giao dịch |
| total_amount | DECIMAL | Tổng tiền |
| payment_method | VARCHAR | Hình thức thanh toán |
| created_at | DATETIME | Ngày tạo |

**Index hỗ trợ truy vấn nhanh:**

- `idx_txn_station_time` → tìm giao dịch theo trạm + thời gian.  
- `idx_txn_pump_time` → tìm giao dịch theo trụ + thời gian.  
- `idx_txn_product_time` → tìm giao dịch theo sản phẩm + thời gian.  
