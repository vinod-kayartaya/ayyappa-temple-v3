CREATE TABLE devotee_offerings (
    id VARCHAR(36) PRIMARY KEY,
    transaction_date DATE NOT NULL,
    offering_date DATE NOT NULL,
    created_by VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    last_updated_by VARCHAR(50),
    last_updated_at TIMESTAMP
);

CREATE TABLE devotee_offering_items (
    id VARCHAR(36) PRIMARY KEY,
    devotee_offering_id VARCHAR(36) NOT NULL,
    devotee_mobile_number VARCHAR(15),
    vazhipadu_id VARCHAR(36) NOT NULL,
    devotee_name VARCHAR(100) NOT NULL,
    devotee_nakshtram VARCHAR(50),
    deity_name VARCHAR(50),
    nos INTEGER NOT NULL DEFAULT 1,
    amount DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (devotee_offering_id) REFERENCES devotee_offerings(id),
    FOREIGN KEY (vazhipadu_id) REFERENCES vazhipadu(id)
); 