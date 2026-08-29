-- =========================================================
-- HealthyCraftyBites Full Database Schema & Initial Seed Data
-- Database: healthycraftybites
-- =========================================================

CREATE DATABASE IF NOT EXISTS healthycraftybites;
USE healthycraftybites;

-- 1. Product Table (Menu Management Service)
CREATE TABLE IF NOT EXISTS product (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT,
    tag VARCHAR(50),
    img_name VARCHAR(255),
    price DECIMAL(10, 2) NOT NULL,
    calories DECIMAL(10, 2) DEFAULT 0.00,
    protein DECIMAL(10, 2) DEFAULT 0.00,
    carbohydrates DECIMAL(10, 2) DEFAULT 0.00,
    fat DECIMAL(10, 2) DEFAULT 0.00,
    fiber DECIMAL(10, 2) DEFAULT 0.00,
    availability_status INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Ingredient Table (Menu Management Service & Customizer)
CREATE TABLE IF NOT EXISTS ingredient (
    ingredient_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL, -- Bread, Roll-Roti, Vegetable, Bean, Protein-Portion, Sauce, Seasoning
    img_name VARCHAR(255),
    calories DECIMAL(10, 2) DEFAULT 0.00,
    protein DECIMAL(10, 2) DEFAULT 0.00,
    carbohydrates DECIMAL(10, 2) DEFAULT 0.00,
    fat DECIMAL(10, 2) DEFAULT 0.00,
    fiber DECIMAL(10, 2) DEFAULT 0.00,
    price DECIMAL(10, 2) DEFAULT 0.00,
    availability_status INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. User Profile Table (User Service)
CREATE TABLE IF NOT EXISTS user_profile (
    profile_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    full_name VARCHAR(150),
    email VARCHAR(150),
    phone VARCHAR(30),
    address TEXT,
    role VARCHAR(50) DEFAULT 'CUSTOMER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Customer Favorite Table (User Service)
CREATE TABLE IF NOT EXISTS customer_favorite (
    favorite_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    product_id INT,
    item_name VARCHAR(150),
    category VARCHAR(50),
    price DOUBLE,
    img_name VARCHAR(255),
    customised_details_json TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Product Review Table (User Service)
CREATE TABLE IF NOT EXISTS product_review (
    review_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    product_id INT,
    product_name VARCHAR(150),
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Customised Product Table (Order Service)
CREATE TABLE IF NOT EXISTS customised_product (
    customised_product_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    meal_type VARCHAR(50) NOT NULL, -- SALAD, SANDWICH, ROLL
    bread_id INT NULL,
    roll_roti_id INT NULL,
    vegetable_ids_json TEXT,
    bean_ids_json TEXT,
    protein_portion_id INT NULL,
    sauce_ids_json TEXT,
    seasoning_ids_json TEXT,
    total_calories DECIMAL(10, 2),
    total_protein DECIMAL(10, 2),
    total_carbohydrates DECIMAL(10, 2),
    total_fat DECIMAL(10, 2),
    total_fiber DECIMAL(10, 2),
    total_price DECIMAL(10, 2)
);

-- 7. Customer Order Table (Order Service)
CREATE TABLE IF NOT EXISTS customer_order (
    order_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(100) NOT NULL UNIQUE,
    username VARCHAR(100) NOT NULL,
    customer_email VARCHAR(150),
    total_amount DECIMAL(10, 2) NOT NULL,
    payment_status VARCHAR(50) DEFAULT 'PENDING_PAYMENT', -- PENDING_PAYMENT, PAID
    order_status VARCHAR(50) DEFAULT 'RECEIVED', -- RECEIVED, PREPARING, READY, COMPLETED, CANCELLED
    advance_pickup_date VARCHAR(50),
    advance_pickup_time VARCHAR(50),
    special_instructions TEXT,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. Order Item Table (Order Service)
CREATE TABLE IF NOT EXISTS order_item (
    order_item_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT,
    product_id INT,
    product_name VARCHAR(150),
    quantity INT DEFAULT 1,
    price DECIMAL(10, 2),
    is_customised BOOLEAN DEFAULT FALSE,
    customised_product_id BIGINT,
    FOREIGN KEY (order_id) REFERENCES customer_order(order_id) ON DELETE CASCADE,
    FOREIGN KEY (customised_product_id) REFERENCES customised_product(customised_product_id) ON DELETE SET NULL
);

-- 9. Payment Transaction Table (Payment & Billing Service)
CREATE TABLE IF NOT EXISTS payment_transaction (
    payment_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    transaction_number VARCHAR(100) NOT NULL UNIQUE,
    order_number VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL,
    amount DECIMAL(10, 2),
    payment_method VARCHAR(50), -- CARD, UPI, CASH_ON_COUNTER
    status VARCHAR(50) DEFAULT 'SUCCESS',
    payment_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 10. Daily Sales Metric Table (Analytics Service)
CREATE TABLE IF NOT EXISTS daily_sales_metric (
    metric_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    metric_date DATE NOT NULL UNIQUE,
    total_orders INT DEFAULT 0,
    total_revenue DECIMAL(10, 2) DEFAULT 0.00,
    customised_meals_count INT DEFAULT 0
);

-- =========================================================
-- INITIAL SEED DATA (Standard Menu Products & Customizer Ingredients)
-- =========================================================

INSERT IGNORE INTO product (product_id, name, category, description, tag, price, calories, protein, carbohydrates, fat, fiber, availability_status) VALUES
(1, 'Avocado Protein Power Salad', 'Salad', 'Fresh greens, avocado, grilled chicken, quinoa, and Greek yogurt ranch', 'High Protein', 280.00, 420.0, 34.0, 22.0, 14.0, 8.0, 1),
(2, 'Keto Chicken Whole Wheat Sandwich', 'Sandwich', 'Whole wheat toast with herb chicken breast, bell peppers, and olive oil vinaigrette', 'Keto Friendly', 240.00, 390.0, 32.0, 26.0, 12.0, 6.0, 1),
(3, 'Multigrain Tofu & Bean Roll', 'Roll', 'Multigrain wrap packed with organic tofu, black beans, cucumber, and tahini', 'Vegan Power', 220.00, 350.0, 24.0, 38.0, 9.0, 9.0, 1);

INSERT IGNORE INTO ingredient (ingredient_id, name, category, calories, protein, carbohydrates, fat, fiber, price, availability_status) VALUES
(101, 'Whole Wheat Bread', 'Bread', 120.0, 5.0, 22.0, 2.0, 4.0, 30.0, 1),
(102, 'Multigrain Bread', 'Bread', 130.0, 6.0, 20.0, 2.5, 5.0, 35.0, 1),
(201, 'Multigrain Wrap / Roti', 'Roll-Roti', 140.0, 5.0, 25.0, 3.0, 4.0, 35.0, 1),
(202, 'Oat Tortilla', 'Roll-Roti', 130.0, 4.0, 23.0, 2.0, 5.0, 40.0, 1),
(301, 'Fresh Lettuce & Spinach', 'Vegetable', 15.0, 1.5, 2.0, 0.2, 2.0, 20.0, 1),
(302, 'Cherry Tomatoes', 'Vegetable', 20.0, 1.0, 4.0, 0.2, 1.5, 25.0, 1),
(303, 'Crunchy Cucumbers', 'Vegetable', 12.0, 0.6, 2.5, 0.1, 1.0, 15.0, 1),
(304, 'Bell Peppers (Trio)', 'Vegetable', 25.0, 1.0, 5.0, 0.3, 2.0, 30.0, 1),
(305, 'Red Onions', 'Vegetable', 18.0, 0.5, 4.0, 0.1, 1.0, 15.0, 1),
(306, 'Shredded Carrots', 'Vegetable', 22.0, 0.6, 5.0, 0.1, 2.0, 20.0, 1),
(401, 'Black Beans', 'Bean', 70.0, 4.5, 12.0, 0.4, 4.0, 30.0, 1),
(402, 'Chickpeas (Garbanzo)', 'Bean', 80.0, 5.0, 13.0, 1.0, 4.5, 35.0, 1),
(501, 'Herb Grilled Chicken', 'Protein-Portion', 160.0, 28.0, 0.0, 4.5, 0.0, 90.0, 1),
(502, 'Organic Tofu Cubes', 'Protein-Portion', 110.0, 14.0, 2.0, 6.0, 1.5, 75.0, 1),
(503, 'Cottage Cheese (Paneer)', 'Protein-Portion', 140.0, 18.0, 3.0, 7.0, 0.0, 80.0, 1),
(601, 'Greek Yogurt Ranch', 'Sauce', 45.0, 2.0, 3.0, 2.5, 0.0, 25.0, 1),
(602, 'Olive Oil Vinaigrette', 'Sauce', 60.0, 0.0, 1.0, 6.5, 0.0, 30.0, 1),
(603, 'Honey Mustard', 'Sauce', 50.0, 0.5, 8.0, 1.5, 0.0, 25.0, 1),
(604, 'Creamy Tahini Dressing', 'Sauce', 70.0, 2.0, 3.0, 6.0, 1.0, 35.0, 1),
(701, 'Himalayan Pink Salt & Pepper', 'Seasoning', 2.0, 0.0, 0.4, 0.0, 0.2, 10.0, 1),
(702, 'Italian Oregano & Chili Flakes', 'Seasoning', 5.0, 0.2, 1.0, 0.1, 0.5, 15.0, 1);
