<?php
// Health Check Endpoint for Render
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

try {
    require_once 'config/database.php';
    
    // Test database connection
    $stmt = $pdo->query("SELECT 1");
    
    echo json_encode([
        'status' => 'healthy',
        'timestamp' => date('Y-m-d H:i:s'),
        'database' => 'connected',
        'version' => '1.0.0'
    ]);
    
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'unhealthy',
        'timestamp' => date('Y-m-d H:i:s'),
        'database' => 'disconnected',
        'error' => $e->getMessage()
    ]);
}
?>
