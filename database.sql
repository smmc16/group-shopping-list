-- Don't forget to add your create table SQL 
-- It is also helpful to include some test data

CREATE TABLE shoppinglist (
    id SERIAL PRIMARY KEY,
    name VARCHAR(80) NOT NULL,
    quantity DECIMAL(3,1) NOT NULL,
    unit VARCHAR(20),
    purchased BOOLEAN default false
);

INSERT INTO shoppinglist (name, quantity, unit) VALUES 
    ('Apples', 3.5, 'lbs'),
    ('Milk', 1, 'gallon');

SELECT * FROM shoppinglist ORDER BY id;