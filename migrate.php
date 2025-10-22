<?php
// Database Migration Script for Production
// This script creates the necessary tables for the Warm Cup Café application

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once 'config/database.php';

try {
    // Create users table (PostgreSQL compatible)
    $createUsersTable = "
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            full_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            is_admin BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    ";
    
    // Create orders table (PostgreSQL compatible)
    $createOrdersTable = "
        CREATE TABLE IF NOT EXISTS orders (
            id SERIAL PRIMARY KEY,
            customer_name VARCHAR(255) NOT NULL,
            phone VARCHAR(20) NOT NULL,
            drink VARCHAR(100) NOT NULL,
            size VARCHAR(20) NOT NULL,
            quantity INT NOT NULL DEFAULT 1,
            total_price DECIMAL(10,2) NOT NULL,
            notes TEXT,
            order_status VARCHAR(20) DEFAULT 'pending' CHECK (order_status IN ('pending', 'preparing', 'completed', 'cancelled')),
            user_id INT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
        );
    ";
    
    // Create admin user (PostgreSQL compatible)
    $createAdminUser = "
        INSERT INTO users (full_name, email, password, is_admin) 
        VALUES ('Admin User', 'admin@warmcupcafe.com', ?, TRUE)
        ON CONFLICT (email) DO NOTHING
    ";
    
    // Execute table creation
    $pdo->exec($createUsersTable);
    $pdo->exec($createOrdersTable);
    
    // Create admin user with default password
    $adminPassword = password_hash('admin123', PASSWORD_DEFAULT);
    $stmt = $pdo->prepare($createAdminUser);
    $stmt->execute([$adminPassword]);
    
    echo json_encode([
        'success' => true,
        'message' => 'Database migration completed successfully!',
        'tables_created' => ['users', 'orders'],
        'admin_created' => [
            'email' => 'admin@warmcupcafe.com',
            'password' => 'admin123'
        ]
    ]);
    
} catch(PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Migration failed: ' . $e->getMessage()
    ]);
}
?>
