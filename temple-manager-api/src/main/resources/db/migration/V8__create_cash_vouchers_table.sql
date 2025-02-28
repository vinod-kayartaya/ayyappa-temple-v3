CREATE TABLE cash_vouchers (
    id VARCHAR(36) PRIMARY KEY,
    voucher_no VARCHAR(20) NOT NULL UNIQUE,
    voucher_date DATE NOT NULL,
    paid_to VARCHAR(200) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    purpose VARCHAR(500) NOT NULL,
    approved_by VARCHAR(50),
    created_by VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    last_updated_by VARCHAR(50),
    last_updated_at TIMESTAMP
); 