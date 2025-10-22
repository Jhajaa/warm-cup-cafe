<?php
echo "<h2>XAMPP MySQL Connection Test</h2>";

// Common XAMPP configurations to try
$configs = [
    ['host' => 'localhost', 'port' => '3306', 'user' => 'root', 'pass' => ''],
    ['host' => '127.0.0.1', 'port' => '3306', 'user' => 'root', 'pass' => ''],
    ['host' => 'localhost', 'port' => '3306', 'user' => 'root', 'pass' => 'root'],
    ['host' => 'localhost', 'port' => '3307', 'user' => 'root', 'pass' => ''],
];

foreach ($configs as $i => $config) {
    echo "<h3>Test " . ($i + 1) . ": {$config['host']}:{$config['port']} - user: {$config['user']}</h3>";
    
    try {
        $dsn = "mysql:host={$config['host']};port={$config['port']};charset=utf8mb4";
        $pdo = new PDO($dsn, $config['user'], $config['pass']);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        echo "✅ <strong>SUCCESS!</strong> Connected with this configuration.<br>";
        
        // Test creating/accessing ITP110 database
        try {
            $pdo->exec("CREATE DATABASE IF NOT EXISTS ITP110 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
            echo "✅ Database 'ITP110' is ready.<br>";
            
            // Test connection to the database
            $pdo_db = new PDO("mysql:host={$config['host']};port={$config['port']};dbname=ITP110;charset=utf8mb4", $config['user'], $config['pass']);
            echo "✅ Successfully connected to ITP110 database.<br>";
            
            echo "<br><strong>🎉 Use this configuration:</strong><br>";
            echo "Host: {$config['host']}<br>";
            echo "Port: {$config['port']}<br>";
            echo "Username: {$config['user']}<br>";
            echo "Password: " . (empty($config['pass']) ? "(empty)" : $config['pass']) . "<br>";
            
            // Update config file automatically
            $config_content = "<?php
// Database configuration for XAMPP
\$host = '{$config['host']}';
\$dbname = 'ITP110';
\$username = '{$config['user']}';
\$password = '{$config['pass']}';

try {
    \$pdo = new PDO(\"mysql:host=\$host;port={$config['port']};dbname=\$dbname;charset=utf8mb4\", \$username, \$password);
    \$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    \$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch(PDOException \$e) {
    die(\"Connection failed: \" . \$e->getMessage());
}
?>";
            
            file_put_contents('config/database.php', $config_content);
            echo "<br>✅ Configuration file updated automatically!<br>";
            echo "<br><a href='setup_database.php' style='background: #857979; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;'>🚀 Run Database Setup Now</a>";
            
            break; // Stop testing once we find a working configuration
            
        } catch(PDOException $e) {
            echo "❌ Database operation failed: " . $e->getMessage() . "<br>";
        }
        
    } catch(PDOException $e) {
        echo "❌ Failed: " . $e->getMessage() . "<br>";
    }
    
    echo "<hr>";
}

echo "<br><h3>Manual Steps if Above Doesn't Work:</h3>";
echo "<ol>";
echo "<li>Open XAMPP Control Panel</li>";
echo "<li>Make sure MySQL is started (green 'Running' status)</li>";
echo "<li>Click 'Admin' next to MySQL to open phpMyAdmin</li>";
echo "<li>Create a database named 'ITP110' if it doesn't exist</li>";
echo "<li>Try running this test again</li>";
echo "</ol>";
?>