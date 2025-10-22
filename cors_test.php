<?php
// Simple CORS test endpoint
header('Content-Type: application/json');

// Enhanced CORS handling
$allowed_origins = [
    'https://warm-cup-cafe.netlify.app',
    'http://localhost:3000',
    'http://localhost:80'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins)) {
    header('Access-Control-Allow-Origin: ' . $origin);
} else {
    header('Access-Control-Allow-Origin: *');
}

header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 86400');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

echo json_encode([
    'status' => 'success',
    'message' => 'CORS test successful!',
    'origin' => $origin,
    'method' => $_SERVER['REQUEST_METHOD'],
    'headers' => getallheaders(),
    'timestamp' => date('Y-m-d H:i:s')
]);
?>
