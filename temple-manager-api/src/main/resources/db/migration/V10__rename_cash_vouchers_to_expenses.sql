-- Rename the table
RENAME TABLE cash_vouchers TO cash_expenses;

-- Add expense_type column with default value 'VOUCHER' for existing records
ALTER TABLE cash_expenses 
ADD COLUMN expense_type VARCHAR(10) NOT NULL DEFAULT 'VOUCHER' 
CHECK (expense_type IN ('VOUCHER', 'RECEIPT'));

-- Add index for better performance when querying by expense_type
CREATE INDEX idx_expense_type ON cash_expenses(expense_type); 