-- Create expense_categories table
CREATE TABLE expense_categories (
    id VARCHAR(36) NOT NULL,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(50) NOT NULL,
    last_updated_at TIMESTAMP,
    last_updated_by VARCHAR(50),
    PRIMARY KEY (id)
);

-- Insert default category
INSERT INTO expense_categories (id, name, description, created_by)
VALUES (UUID(), 'Others', NULL, 'system');

-- Add category_id column to cash_expenses
ALTER TABLE cash_expenses 
ADD COLUMN category_id VARCHAR(36);

-- Update existing expenses to use the 'Others' category
UPDATE cash_expenses ce
JOIN expense_categories ec ON ec.name = 'Others'
SET ce.category_id = ec.id;

-- Make category_id NOT NULL and add foreign key
ALTER TABLE cash_expenses 
MODIFY COLUMN category_id VARCHAR(36) NOT NULL,
ADD CONSTRAINT fk_cash_expenses_category 
FOREIGN KEY (category_id) REFERENCES expense_categories(id); 