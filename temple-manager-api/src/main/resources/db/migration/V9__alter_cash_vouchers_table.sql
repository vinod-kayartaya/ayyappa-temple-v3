-- First drop the unique constraint on voucher_no
ALTER TABLE cash_vouchers DROP INDEX voucher_no;

-- Change voucher_no to INT
ALTER TABLE cash_vouchers MODIFY COLUMN voucher_no INT NOT NULL;

-- Add unique constraint back
ALTER TABLE cash_vouchers ADD UNIQUE (voucher_no);

-- First, check if there are any existing values in approved_by and set them to NULL if needed
UPDATE cash_vouchers SET approved_by = NULL WHERE approved_by IS NOT NULL;

-- Change approved_by to INT to match users table id type
ALTER TABLE cash_vouchers MODIFY COLUMN approved_by INT;

-- Add foreign key constraint
ALTER TABLE cash_vouchers 
    ADD CONSTRAINT fk_cash_vouchers_approved_by 
    FOREIGN KEY (approved_by) 
    REFERENCES users(id); 