<?php
// Test database connection
$host = 'localhost';
$username = 'root';
$password = '';

echo "Testing MySQL connection...<br>";

try {
    // Try to connect to MySQL server
    $pdo = new PDO("mysql:host=$host;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "✅ Connected to MySQL server successfully!<br>";
    
    // Check if coffeeshop database exists
    $stmt = $pdo->query("SHOW DATABASES LIKE 'coffeeshop'");
    $db_exists = $stmt->fetch();
    
    if ($db_exists) {
        echo "✅ Database 'coffeeshop' already exists!<br>";
    } else {
        echo "❌ Database 'coffeeshop' does not exist. Creating it...<br>";
        $pdo->exec("CREATE DATABASE coffeeshop CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
        echo "✅ Database 'coffeeshop' created successfully!<br>";
    }
    
    // Now connect to the coffeeshop database
    $pdo = new PDO("mysql:host=$host;dbname=coffeeshop;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "✅ Connected to coffeeshop database successfully!<br>";
    
    echo "<br><strong>Connection test completed! You can now run the setup script.</strong><br>";
    echo "<a href='setup_database.php'>Run Database Setup</a>";
    
} catch(PDOException $e) {
    echo "❌ Connection failed: " . $e->getMessage() . "<br>";
    echo "<br>Please check your MySQL configuration.";
}
?>