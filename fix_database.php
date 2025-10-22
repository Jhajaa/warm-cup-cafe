<?php
// Fix tablespace issue and recreate tables
require_once 'config/database.php';

echo "Fixing tablespace issue and recreating tables...<br>";

try {
    // Drop existing tables with proper cleanup
    $pdo->exec("DROP TABLE IF EXISTS orders");
    $pdo->exec("DROP TABLE IF EXISTS users");
    echo "✅ Dropped existing tables<br>";
    
    // Wait a moment for cleanup
    sleep(1);
    
    // Create users table
    $sql_users = "CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB";
    
    $pdo->exec($sql_users);
    echo "✅ Users table created successfully<br>";
    
    // Create orders table
    $sql_orders = "CREATE TABLE orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        customer_name VARCHAR(100) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        drink VARCHAR(50) NOT NULL,
        size VARCHAR(20) NOT NULL,
        quantity INT NOT NULL DEFAULT 1,
        notes TEXT,
        total_price DECIMAL(10,2) NOT NULL,
        order_status VARCHAR(20) DEFAULT 'pending',
        user_id INT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    ) ENGINE=InnoDB";
    
    $pdo->exec($sql_orders);
    echo "✅ Orders table created successfully<br>";
    
    // Create admin user
    $admin_email = 'admin@coffeeshop.com';
    $admin_password = password_hash('admin123', PASSWORD_DEFAULT);
    $admin_name = 'Admin User';
    
    $insert_admin = $pdo->prepare("INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)");
    $insert_admin->execute([$admin_name, $admin_email, $admin_password]);
    echo "✅ Admin user created successfully<br>";
    echo "Admin login: $admin_email / admin123<br>";
    
    // Test the tables
    $stmt = $pdo->query("SELECT COUNT(*) FROM users");
    $count = $stmt->fetchColumn();
    echo "✅ Users table test: $count users found<br>";
    
    echo "<br><strong>✅ Database setup completed successfully!</strong><br>";
    echo "<a href='test_registration.php'>Test Registration</a><br>";
    
} catch(PDOException $e) {
    echo "❌ Error: " . $e->getMessage() . "<br>";
}
?>
