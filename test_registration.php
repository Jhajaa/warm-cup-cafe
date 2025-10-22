<?php
// Simple registration test
require_once 'config/database.php';

echo "Testing database connection and registration...<br>";

try {
    // Test database connection
    $stmt = $pdo->query("SELECT 1");
    echo "✅ Database connection successful<br>";
    
    // Test if users table exists
    $stmt = $pdo->query("SHOW TABLES LIKE 'users'");
    if ($stmt->fetch()) {
        echo "✅ Users table exists<br>";
        
        // Test inserting a user
        $test_name = "Test User " . time();
        $test_email = "test" . time() . "@example.com";
        $test_password = password_hash("123456", PASSWORD_DEFAULT);
        
        $stmt = $pdo->prepare("INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)");
        $result = $stmt->execute([$test_name, $test_email, $test_password]);
        
        if ($result) {
            echo "✅ User insertion successful<br>";
            echo "Test user created: $test_email<br>";
        } else {
            echo "❌ User insertion failed<br>";
        }
    } else {
        echo "❌ Users table does not exist<br>";
    }
    
} catch(PDOException $e) {
    echo "❌ Error: " . $e->getMessage() . "<br>";
}
?>
