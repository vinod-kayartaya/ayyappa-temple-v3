-- Create database
DROP DATABASE templedb;

CREATE DATABASE IF NOT EXISTS templedb;
USE templedb;

-- Users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255),
    primary_email VARCHAR(255),
    primary_phone VARCHAR(20),
    secondary_email VARCHAR(255),
    secondary_phone VARCHAR(20),
    password VARCHAR(255),
    photo LONGBLOB,
    created_at DATETIME NOT NULL,
    created_by VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    password_change_required BOOLEAN DEFAULT TRUE,
    password_last_changed DATETIME,
    designation VARCHAR(255)
);

-- Roles table
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role VARCHAR(255) NOT NULL,
    created_by VARCHAR(255),
    created_at DATETIME NOT NULL
);

-- Privileges table
CREATE TABLE privileges (
    id INT AUTO_INCREMENT PRIMARY KEY,
    privilege VARCHAR(255),
    description TEXT,
    parent_privilege_id INT,
    created_at DATETIME,
    created_by VARCHAR(255)
);

-- Roles privileges mapping table
CREATE TABLE roles_privileges (
    role_id INT,
    privilege_id INT,
    PRIMARY KEY (role_id, privilege_id),
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (privilege_id) REFERENCES privileges(id)
);

-- User roles mapping table
CREATE TABLE users_roles (
    user_id INT,
    role_id INT,
    created_by VARCHAR(255),
    created_at DATETIME NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- Categories table
CREATE TABLE categories (
    id VARCHAR(36) PRIMARY KEY,
    code INT NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_by VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL,
    last_updated_by VARCHAR(255),
    last_updated_at DATETIME
);

-- Deities table
CREATE TABLE deities (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_by VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL
);

-- Expense categories table
CREATE TABLE expense_categories (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_by VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL,
    last_updated_by VARCHAR(255),
    last_updated_at DATETIME
);

-- Offering categories table
CREATE TABLE offering_categories (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_by VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL,
    last_updated_by VARCHAR(255),
    last_updated_at DATETIME
);

-- Suppliers table
CREATE TABLE suppliers (
    id VARCHAR(36) PRIMARY KEY,
    code INT NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    short_form VARCHAR(50),
    type VARCHAR(50),
    address TEXT,
    phone VARCHAR(20),
    email VARCHAR(255),
    reorder_level INT,
    margin_percentage DECIMAL(5,2),
    created_by VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL,
    last_updated_by VARCHAR(255),
    last_updated_at DATETIME
);

-- Products table
CREATE TABLE products (
    id VARCHAR(36) PRIMARY KEY,
    code INT NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    unit VARCHAR(50),
    supplier_id VARCHAR(36),
    category_id VARCHAR(36),
    price DECIMAL(10,2) NOT NULL,
    cost_price DECIMAL(10,2) NOT NULL,
    commission_percentage DECIMAL(5,2),
    tax_percentage DECIMAL(5,2),
    ast_percentage DECIMAL(5,2),
    opening_stock INT DEFAULT 0,
    issued INT DEFAULT 0,
    received INT DEFAULT 0,
    damaged INT DEFAULT 0,
    sales_returned INT DEFAULT 0,
    purchases_returned INT DEFAULT 0,
    blocked INT DEFAULT 0,
    quantity_in_stock INT DEFAULT 0,
    created_by VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL,
    last_updated_by VARCHAR(255),
    last_updated_at DATETIME,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Vazhipadu table
CREATE TABLE vazhipadu (
    id VARCHAR(36) PRIMARY KEY,
    code INT NOT NULL UNIQUE,
    vazhipadu_name VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    daily_count INT,
    time_am_pm INT,
    times_per_day INT,
    days INT,
    blocking BOOLEAN DEFAULT FALSE,
    seasonal BOOLEAN DEFAULT FALSE,
    offering_category_id VARCHAR(36),
    receipt BOOLEAN DEFAULT TRUE,
    booking_required BOOLEAN DEFAULT FALSE,
    account_head_id INT,
    account_sub_head_id INT,
    created_by VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL,
    last_updated_by VARCHAR(255),
    last_updated_at DATETIME,
    FOREIGN KEY (offering_category_id) REFERENCES offering_categories(id),
    FOREIGN KEY (account_head_id) REFERENCES users(id),
    FOREIGN KEY (account_sub_head_id) REFERENCES users(id)
);

-- Sales table
CREATE TABLE sales (
    id VARCHAR(36) PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_mobile VARCHAR(20),
    sale_date DATETIME NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    created_by VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL,
    last_updated_by VARCHAR(255),
    last_updated_at DATETIME
);

-- Sale items table
CREATE TABLE sale_items (
    id VARCHAR(36) PRIMARY KEY,
    sale_id VARCHAR(36) NOT NULL,
    product_id VARCHAR(36) NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (sale_id) REFERENCES sales(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Donation categories table
CREATE TABLE donation_categories (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_by VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL,
    last_updated_by VARCHAR(255),
    last_updated_at DATETIME
);

-- Donations table
CREATE TABLE donations (
    id VARCHAR(36) PRIMARY KEY,
    donation_category_id VARCHAR(36) NOT NULL,
    devotee_name VARCHAR(100) NOT NULL,
    devotee_phone VARCHAR(20),
    devotee_email VARCHAR(100),
    devotee_address TEXT,
    amount DECIMAL(10,2) NOT NULL,
    payment_mode VARCHAR(20) NOT NULL,
    payment_reference VARCHAR(100),
    receipt_number VARCHAR(50),
    donation_date DATE NOT NULL,
    remarks TEXT,
    created_by VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL,
    last_updated_by VARCHAR(255),
    last_updated_at DATETIME,
    FOREIGN KEY (donation_category_id) REFERENCES donation_categories(id)
);

-- Cash expenses table
CREATE TABLE cash_expenses (
    id VARCHAR(36) PRIMARY KEY,
    voucher_no INT NOT NULL UNIQUE,
    voucher_date DATE NOT NULL,
    paid_to VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    purpose TEXT NOT NULL,
    approved_by INT,
    expense_type VARCHAR(20) NOT NULL,
    category_id VARCHAR(36) NOT NULL,
    created_by VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL,
    last_updated_by VARCHAR(255),
    last_updated_at DATETIME,
    FOREIGN KEY (approved_by) REFERENCES users(id),
    FOREIGN KEY (category_id) REFERENCES expense_categories(id)
);

-- Devotee offerings table
CREATE TABLE devotee_offerings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    transaction_date DATE NOT NULL,
    offering_date DATE NOT NULL,
    created_by VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL,
    last_updated_by VARCHAR(255),
    last_updated_at DATETIME
);

-- Devotee offering items table
CREATE TABLE devotee_offering_items (
    id VARCHAR(36) PRIMARY KEY,
    devotee_offering_id BIGINT NOT NULL,
    devotee_mobile_number VARCHAR(20),
    vazhipadu_id VARCHAR(36) NOT NULL,
    devotee_name VARCHAR(255) NOT NULL,
    devotee_nakshtram VARCHAR(100),
    deity_name VARCHAR(255),
    nos INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (devotee_offering_id) REFERENCES devotee_offerings(id),
    FOREIGN KEY (vazhipadu_id) REFERENCES vazhipadu(id)
);

-- Insert sample data

-- Insert roles
INSERT INTO roles (role, created_by, created_at) VALUES
('ADMIN', 'system', NOW()),
('TEMPLE_ADMIN', 'system', NOW()),
('ACCOUNTANT', 'system', NOW()),
('CASHIER', 'system', NOW()),
('STORE_KEEPER', 'system', NOW());

-- Insert privileges
INSERT INTO privileges (privilege, description, parent_privilege_id, created_at, created_by) VALUES
('USER_MANAGEMENT', 'Manage users and their roles', NULL, NOW(), 'system'),
('ROLE_MANAGEMENT', 'Manage roles and privileges', NULL, NOW(), 'system'),
('INVENTORY_MANAGEMENT', 'Manage temple inventory', NULL, NOW(), 'system'),
('OFFERING_MANAGEMENT', 'Manage temple offerings', NULL, NOW(), 'system'),
('DONATION_MANAGEMENT', 'Manage donations', NULL, NOW(), 'system'),
('EXPENSE_MANAGEMENT', 'Manage expenses', NULL, NOW(), 'system'),
('REPORT_VIEW', 'View reports', NULL, NOW(), 'system');

-- Insert roles_privileges mapping
INSERT INTO roles_privileges (role_id, privilege_id) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7),
(2, 3), (2, 4), (2, 5), (2, 6), (2, 7),
(3, 5), (3, 6), (3, 7),
(4, 4), (4, 5), (4, 7),
(5, 3), (5, 7);

-- Insert users (password is hashed version of 'Cyblore123!')
INSERT INTO users (username, firstname, lastname, primary_email, primary_phone, password, created_at, created_by, is_active, password_change_required, designation) VALUES
('vinod', 'Vinod', 'Kumar', 'vinod@vinod.co', '9876543210', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBpwTTyU3VWmW', NOW(), 'system', true, false, 'Temple Administrator'),
('priya', 'Priya', 'Sharma', 'priya@temple.com', '9876543211', '$2a$10$rDmGcWxNxNxNxNxNxNxNxO', NOW(), 'system', true, true, 'Accountant'),
('rajesh', 'Rajesh', 'Verma', 'rajesh@temple.com', '9876543212', '$2a$10$rDmGcWxNxNxNxNxNxNxNxO', NOW(), 'system', true, true, 'Cashier'),
('anita', 'Anita', 'Patel', 'anita@temple.com', '9876543213', '$2a$10$rDmGcWxNxNxNxNxNxNxNxO', NOW(), 'system', true, true, 'Store Keeper');

-- Insert users_roles mapping
INSERT INTO users_roles (user_id, role_id, created_by, created_at) VALUES
(1, 1, 'system', NOW()),
(2, 3, 'system', NOW()),
(3, 4, 'system', NOW()),
(4, 5, 'system', NOW());

-- Insert categories
INSERT INTO categories (id, code, name, description, created_by, created_at) VALUES
(UUID(), 1, 'Prasad Items', 'Items used for temple prasad', 'system', NOW()),
(UUID(), 2, 'Pooja Items', 'Items used for daily pooja', 'system', NOW()),
(UUID(), 3, 'Temple Decorations', 'Items used for temple decoration', 'system', NOW()),
(UUID(), 4, 'Food Items', 'Items used for temple kitchen', 'system', NOW());

-- Insert deities
INSERT INTO deities (id, name, created_by, created_at) VALUES
(UUID(), 'Lord Ayyappa', 'system', NOW()),
(UUID(), 'Lord Ganesha', 'system', NOW()),
(UUID(), 'Goddess Lakshmi', 'system', NOW()),
(UUID(), 'Lord Shiva', 'system', NOW()),
(UUID(), 'Goddess Parvati', 'system', NOW());

-- Insert expense categories
INSERT INTO expense_categories (id, name, description, created_by, created_at) VALUES
(UUID(), 'Electricity', 'Temple electricity expenses', 'system', NOW()),
(UUID(), 'Water', 'Temple water expenses', 'system', NOW()),
(UUID(), 'Staff Salary', 'Temple staff salary', 'system', NOW()),
(UUID(), 'Maintenance', 'Temple maintenance expenses', 'system', NOW()),
(UUID(), 'Food Items', 'Temple kitchen expenses', 'system', NOW());

-- Insert offering categories
INSERT INTO offering_categories (id, name, created_by, created_at) VALUES
(UUID(), 'Daily Offerings', 'system', NOW()),
(UUID(), 'Special Offerings', 'system', NOW()),
(UUID(), 'Festival Offerings', 'system', NOW()),
(UUID(), 'Monthly Offerings', 'system', NOW()),
(UUID(), 'Annual Offerings', 'system', NOW());

-- Insert suppliers
INSERT INTO suppliers (id, code, name, short_form, type, address, phone, email, reorder_level, margin_percentage, created_by, created_at) VALUES
(UUID(), 1, 'Sri Krishna Traders', 'SKT', 'Wholesaler', 'Temple Street, Thiruvananthapuram', '9876543214', 'skt@traders.com', 100, 10.00, 'system', NOW()),
(UUID(), 2, 'Devi Enterprises', 'DE', 'Wholesaler', 'Market Road, Kochi', '9876543215', 'de@enterprises.com', 100, 12.00, 'system', NOW()),
(UUID(), 3, 'Ganesh Suppliers', 'GS', 'Wholesaler', 'Main Road, Kollam', '9876543216', 'gs@suppliers.com', 100, 15.00, 'system', NOW());

-- Insert products
INSERT INTO products (id, code, name, unit, supplier_id, category_id, price, cost_price, commission_percentage, tax_percentage, ast_percentage, opening_stock, created_by, created_at) VALUES
(UUID(), 1, 'Camphor', 'KG', (SELECT id FROM suppliers WHERE code = 1), (SELECT id FROM categories WHERE code = 2), 1000.00, 800.00, 5.00, 18.00, 0.00, 100, 'system', NOW()),
(UUID(), 2, 'Ghee', 'KG', (SELECT id FROM suppliers WHERE code = 2), (SELECT id FROM categories WHERE code = 1), 800.00, 600.00, 5.00, 18.00, 0.00, 50, 'system', NOW()),
(UUID(), 3, 'Rice', 'KG', (SELECT id FROM suppliers WHERE code = 3), (SELECT id FROM categories WHERE code = 4), 40.00, 35.00, 5.00, 5.00, 0.00, 1000, 'system', NOW());

-- Insert vazhipadu
INSERT INTO vazhipadu (id, code, vazhipadu_name, amount, daily_count, time_am_pm, times_per_day, days, blocking, seasonal, offering_category_id, receipt, booking_required, account_head_id, account_sub_head_id, created_by, created_at) VALUES
(UUID(), 1, 'Archana', 50.00, 100, 1, 2, 1, false, false, (SELECT id FROM offering_categories WHERE name = 'Daily Offerings'), true, false, 1, 2, 'system', NOW()),
(UUID(), 2, 'Sahasranama Archana', 100.00, 50, 1, 1, 1, false, false, (SELECT id FROM offering_categories WHERE name = 'Daily Offerings'), true, false, 1, 2, 'system', NOW()),
(UUID(), 3, 'Ganapathy Homam', 1000.00, 10, 1, 1, 1, true, false, (SELECT id FROM offering_categories WHERE name = 'Special Offerings'), true, true, 1, 2, 'system', NOW());

-- Insert donation categories
INSERT INTO donation_categories (id, name, description, created_by, created_at) VALUES
(UUID(), 'Regular Donation', 'Regular temple donations', 'system', NOW()),
(UUID(), 'Special Donation', 'Special occasion donations', 'system', NOW()),
(UUID(), 'Construction Donation', 'Temple construction donations', 'system', NOW()),
(UUID(), 'Annadanam', 'Food donation', 'system', NOW());

-- Insert donations
INSERT INTO donations (id, donation_category_id, devotee_name, devotee_phone, devotee_email, devotee_address, amount, payment_mode, payment_reference, receipt_number, donation_date, remarks, created_by, created_at) VALUES
(UUID(), (SELECT id FROM donation_categories WHERE name = 'Regular Donation'), 'Ramesh Kumar', '9876543217', 'ramesh@email.com', 'Kerala', 1000.00, 'CASH', NULL, 'RCP001', CURDATE(), 'Regular monthly donation', 'system', NOW()),
(UUID(), (SELECT id FROM donation_categories WHERE name = 'Special Donation'), 'Suresh Nair', '9876543218', 'suresh@email.com', 'Tamil Nadu', 5000.00, 'BANK_TRANSFER', 'TRX001', 'RCP002', CURDATE(), 'Special festival donation', 'system', NOW());

-- Insert cash expenses
INSERT INTO cash_expenses (id, voucher_no, voucher_date, paid_to, amount, purpose, approved_by, expense_type, category_id, created_by, created_at) VALUES
(UUID(), 1, CURDATE(), 'KSEB', 5000.00, 'Monthly electricity bill', 1, 'VOUCHER', (SELECT id FROM expense_categories WHERE name = 'Electricity'), 'system', NOW()),
(UUID(), 2, CURDATE(), 'KWA', 2000.00, 'Monthly water bill', 1, 'VOUCHER', (SELECT id FROM expense_categories WHERE name = 'Water'), 'system', NOW());

-- Insert devotee offerings
INSERT INTO devotee_offerings (transaction_date, offering_date, created_by, created_at) VALUES
(CURDATE(), CURDATE(), 'system', NOW()),
(CURDATE(), CURDATE(), 'system', NOW());

-- Insert devotee offering items
INSERT INTO devotee_offering_items (id, devotee_offering_id, devotee_mobile_number, vazhipadu_id, devotee_name, devotee_nakshtram, deity_name, nos, amount) VALUES
(UUID(), 1, '9876543219', (SELECT id FROM vazhipadu WHERE code = 1), 'Arun Kumar', 'Ashwini', 'Lord Ayyappa', 1, 50.00),
(UUID(), 1, '9876543220', (SELECT id FROM vazhipadu WHERE code = 2), 'Meera Devi', 'Bharani', 'Lord Ayyappa', 1, 100.00),
(UUID(), 2, '9876543221', (SELECT id FROM vazhipadu WHERE code = 3), 'Krishna Menon', 'Krittika', 'Lord Ayyappa', 1, 1000.00); 