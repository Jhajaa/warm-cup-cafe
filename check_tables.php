<?php
// Check what tables exist in the database
require_once 'config/database.php';

echo "Checking database tables...<br>";

try {
    // Show all tables
    $stmt = $pdo->query("SHOW TABLES");
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
    
    echo "Tables in database: " . implode(', ', $tables) . "<br>";
    
    if (empty($tables)) {
        echo "❌ No tables found in database<br>";
        echo "Running setup script...<br>";
        
        // Run the setup
        include 'setup_database.php';
    } else {
        echo "✅ Found " . count($tables) . " tables<br>";
        
        // Check users table structure
        if (in_array('users', $tables)) {
            $stmt = $pdo->query("DESCRIBE users");
            $columns = $stmt->fetchAll();
            echo "Users table columns:<br>";
            foreach ($columns as $column) {
                echo "- " . $column['Field'] . " (" . $column['Type'] . ")<br>";
            }
        }
    }
    
} catch(PDOException $e) {
    echo "❌ Error: " . $e->getMessage() . "<br>";
}
?>
