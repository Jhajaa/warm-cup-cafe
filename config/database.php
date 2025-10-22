<?php
// Database configuration - supports both local and production environments
$host = $_ENV['DB_HOST'] ?? 'localhost';
$dbname = $_ENV['DB_NAME'] ?? 'coffeeshop_new';
$username = $_ENV['DB_USER'] ?? 'root';
$password = $_ENV['DB_PASS'] ?? '';
$port = 3306;

// For Render.com PostgreSQL, parse DATABASE_URL if available
if (isset($_ENV['DATABASE_URL'])) {
    $url = parse_url($_ENV['DATABASE_URL']);
    $host = $url['host'];
    $dbname = ltrim($url['path'], '/');
    $username = $url['user'];
    $password = $url['pass'];
    $port = isset($url['port']) ? $url['port'] : 5432; // PostgreSQL default port
}

try {
    // For PostgreSQL (Render's default)
    if (isset($_ENV['DATABASE_URL'])) {
        $dsn = "pgsql:host=$host;port=$port;dbname=$dbname";
    } else {
        // For MySQL (local development)
        $dsn = "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4";
    }
    
    $pdo = new PDO($dsn, $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_TIMEOUT => 30, // 30 second timeout
        PDO::ATTR_PERSISTENT => false // Disable persistent connections
    ]);
    
} catch(PDOException $e) {
    // Log the error for debugging
    error_log("Database connection failed: " . $e->getMessage());
    
    // Return a more user-friendly error
    die(json_encode([
        'error' => 'Database connection failed',
        'message' => 'Unable to connect to database. Please try again later.',
        'details' => $e->getMessage()
    ]));
}
?>