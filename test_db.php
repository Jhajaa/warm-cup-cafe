<?php
// Database connection test endpoint
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

try {
    require_once 'config/database.php';
    
    // Test a simple query
    $stmt = $pdo->query("SELECT 1 as test");
    $result = $stmt->fetch();
    
    echo json_encode([
        'status' => 'success',
        'message' => 'Database connection successful!',
        'test_query' => $result,
        'database_type' => isset($_ENV['DATABASE_URL']) ? 'PostgreSQL' : 'MySQL',
        'timestamp' => date('Y-m-d H:i:s')
    ]);
    
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Database connection failed',
        'error' => $e->getMessage(),
        'database_url_set' => isset($_ENV['DATABASE_URL']) ? 'yes' : 'no',
        'timestamp' => date('Y-m-d H:i:s')
    ]);
}
?>
