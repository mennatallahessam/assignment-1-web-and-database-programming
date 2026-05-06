-- Assignment 5: Relations and Normalization
-- Database initialization for Personal Task Manager (Todo App)

-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS todo_app_db;
USE todo_app_db;

-- 1. Users table (Normalized to 3NF)
-- Attributes: user_id (PK), first_name, last_name, email, password
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Categories table (Normalized to 3NF)
-- Attributes: category_id (PK), category_name
CREATE TABLE IF NOT EXISTS categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL UNIQUE
);

-- 3. Tasks table (Normalized to 3NF)
-- Attributes: task_id (PK), user_id (FK), category_id (FK), task_description, is_completed
CREATE TABLE IF NOT EXISTS tasks (
    task_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    category_id INT,
    task_description TEXT NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE SET NULL
);

-- Seed some initial categories
INSERT IGNORE INTO categories (category_name) VALUES ('Work'), ('Personal'), ('Shopping'), ('Health');
