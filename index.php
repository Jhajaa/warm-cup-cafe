<?php
// Simple health check for Docker deployment
header('Content-Type: application/json');

$response = [
    'status' => 'ok',
    'message' => 'Warm Cup Café Backend is running!',
    'timestamp' => date('Y-m-d H:i:s'),
    'php_version' => phpversion(),
    'server' => 'Apache + PHP Docker Container'
];

// Test database connection if available
if (isset($_ENV['DATABASE_URL'])) {
    try {
        require_once 'config/database.php';
        $response['database'] = 'connected';
    } catch (Exception $e) {
        $response['database'] = 'error: ' . $e->getMessage();
    }
} else {
    $response['database'] = 'not configured';
}

echo json_encode($response, JSON_PRETTY_PRINT);
?>
