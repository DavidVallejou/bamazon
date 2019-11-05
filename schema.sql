DROP DATABASE IF EXISTS bamazon_db;
CREATE database bamazon_db;

USE bamazon_db;

CREATE TABLE products (
item_id INT NOT NULL,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(50) NOT NULL,
price DECIMAL (10,2) NOT NULL,
stock_quantity INT (10) NOT NULL,
Primary KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Polo", "Clothing", 59.99, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fitbit", "Sports", 60.00, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Iron Man", "Entertainment", 19.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nike Air Forces", "Clothing", 79.95, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("El Madrid Jersey", "Sports", 72, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Matrix", "Entertainment", 25, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tom Ford tie", "Clothing", 85.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("NFL helmet", "Sports", 25.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("God of War", "Entertainment", 49.95, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("H&M Cardigan", "Clothing", 36.95, 15);

 
select* from products;
SELECT * FROM products WHERE stock_quantity < 5;