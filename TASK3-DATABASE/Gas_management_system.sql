create database gas_management;
use gas_management;

-- Bảng trạm xăng
CREATE TABLE gas_station (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  address VARCHAR(255),
  phone VARCHAR(30),
  status VARCHAR(20) DEFAULT 'active',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Bảng hàng hóa
CREATE TABLE product (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,        -- Ví dụ: Xăng A95, E5, Dầu DO
  sku VARCHAR(30) UNIQUE,            -- Mã: A95, E5, DO
  unit VARCHAR(20) DEFAULT 'liter',
  active BOOLEAN DEFAULT TRUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Bảng trụ bơm
CREATE TABLE pump (
  id INT AUTO_INCREMENT PRIMARY KEY,
  station_id INT NOT NULL,
  code VARCHAR(30) NOT NULL,         -- Ví dụ: P01
  product_id INT NOT NULL,           -- Trụ bơm loại hàng hóa nào
  status VARCHAR(20) DEFAULT 'active',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_pump_station FOREIGN KEY (station_id) REFERENCES gas_station(id),
  CONSTRAINT fk_pump_product FOREIGN KEY (product_id) REFERENCES product(id),
  CONSTRAINT ux_station_pump_code UNIQUE (station_id, code)
);

-- Bảng giao dịch
CREATE TABLE sale_txn (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  station_id INT NOT NULL,
  pump_id INT NOT NULL,
  product_id INT NOT NULL,
  txn_time DATETIME NOT NULL,
  quantity_liter DECIMAL(12,3) NOT NULL,
  unit_price DECIMAL(12,4) NOT NULL,
  total_amount DECIMAL(14,2) NOT NULL,
  payment_method VARCHAR(20),        -- cash, card, ewallet
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_txn_station FOREIGN KEY (station_id) REFERENCES gas_station(id),
  CONSTRAINT fk_txn_pump FOREIGN KEY (pump_id) REFERENCES pump(id),
  CONSTRAINT fk_txn_product FOREIGN KEY (product_id) REFERENCES product(id),
  INDEX idx_txn_station_time (station_id, txn_time),
  INDEX idx_txn_pump_time (pump_id, txn_time),
  INDEX idx_txn_product_time (product_id, txn_time)
);

INSERT INTO gas_station (name, address, phone, status)
VALUES
  ('Trạm Xăng A', '123 Đường ABC, Hà Nội', '0123456789', 'active'),
  ('Trạm Xăng B', '456 Đường XYZ, TP.HCM', '0987654321', 'active');
  
  
INSERT INTO product (name, sku, unit, active)
VALUES
  ('Xăng RON95', 'A95', 'liter', TRUE),
  ('Xăng E5 RON92', 'E5', 'liter', TRUE),
  ('Dầu DO', 'DO', 'liter', TRUE);

INSERT INTO pump (station_id, code, product_id, status)
VALUES
  (1, 'P01', 1, 'active'), -- Trụ 1 của trạm A, bơm A95
  (1, 'P02', 2, 'active'), -- Trụ 2 của trạm A, bơm E5
  (2, 'P01', 3, 'active'); -- Trụ 1 của trạm B, bơm DO

INSERT INTO sale_txn (station_id, pump_id, product_id, txn_time, quantity_liter, unit_price, total_amount, payment_method)
VALUES
  (1, 1, 1, '2025-08-01 08:15:00', 20.5, 23500, 20.5*23500, 'cash'),
  (1, 2, 2, '2025-08-01 09:20:00', 15.0, 22000, 15.0*22000, 'card'),
  (1, 1, 1, '2025-08-02 10:30:00', 30.0, 23500, 30.0*23500, 'ewallet'),
  (2, 3, 3, '2025-08-01 11:00:00', 25.0, 21000, 25.0*21000, 'cash');


-- 1.
SELECT 
    t.id AS transaction_id,
    t.txn_time,
    s.name AS station_name,
    p.code AS pump_code,
    pr.name AS product_name,
    t.quantity_liter,
    t.unit_price,
    t.total_amount,
    t.payment_method
FROM sale_txn t
JOIN gas_station s ON t.station_id = s.id
JOIN pump p ON t.pump_id = p.id
JOIN product pr ON t.product_id = pr.id
WHERE t.station_id = 1   -- ID trạm cần lấy
  AND t.txn_time BETWEEN '2025-08-01' AND '2025-08-02'
ORDER BY t.txn_time;

-- 2.
SELECT 
    DATE(t.txn_time) AS txn_date,
    p.code AS pump_code,
    SUM(t.total_amount) AS total_revenue
FROM sale_txn t
JOIN pump p ON t.pump_id = p.id
WHERE t.pump_id = 1   -- ID trụ bơm cần lấy
GROUP BY DATE(t.txn_time), p.code
ORDER BY txn_date;

-- 3
SELECT 
    DATE(t.txn_time) AS txn_date,
    s.name AS station_name,
    SUM(t.total_amount) AS total_revenue
FROM sale_txn t
JOIN gas_station s ON t.station_id = s.id
WHERE t.station_id = 1   -- ID trạm cần lấy
GROUP BY DATE(t.txn_time), s.name
ORDER BY txn_date;

-- 4
SELECT 
    pr.name AS product_name,
    SUM(t.quantity_liter) AS total_liter
FROM sale_txn t
JOIN product pr ON t.product_id = pr.id
WHERE t.station_id = 1
  AND YEAR(t.txn_time) = 2025
  AND MONTH(t.txn_time) = 8
GROUP BY pr.name
ORDER BY total_liter DESC
LIMIT 3;




