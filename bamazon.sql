DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(255) NOT NULL,
  department_name VARCHAR(255) NOT NULL,
  price DECIMAL (10,2),
  stock_quantity INT default 0
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('A Half-Drained AAA Battery', 'Electronics', 5.99, 5),
('Two, Left-Foot Hiking Boots (Laces Not Included)', 'Outdoors', 9.95, 22),
('Play-Doh-Station 4', 'Electronics', 59.99, 14),
('A Crude Painting Of Mark Thompson', 'Fine Art', .25, 500),
('20 Assorted Tupperware Containers With Random Un-Matching Lids', 'Kitchenwares', 35.95, 48),
('Scorpion King 2: "Rise Of A Warrior"; Specifically on Blu Ray', 'Entertainment', 19.92, 4500),
('A Set Of Lawn Darts, The Lethal(fun) Kind', 'Entertainment', 13.67, 10),
('One Person Camping Tent Without Rain Fly', 'Outdoors', 100.22, 26),
('"Bold and Brash" - Artist Unknown', 'Fine Art', 25000.00, 1),
('A Perfectly Fine Spatula', 'Kitchenwares', 4.44, 8);

SELECT * FROM bamazon_db.products;