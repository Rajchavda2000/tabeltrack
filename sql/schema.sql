CREATE DATABASE IF NOT EXISTS tabletrack;
USE tabletrack;

CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    table_number INT NOT NULL,
    items TEXT NOT NULL
);
