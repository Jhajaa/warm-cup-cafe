<?php
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

require_once 'config/database.php';

// Simple token verification function
function verifyToken($token) {
    try {
        $decoded = json_decode(base64_decode($token), true);
        if ($decoded && isset($decoded['user_id']) && isset($decoded['exp'])) {
            if ($decoded['exp'] > time()) {
                return $decoded;
            }
        }
    } catch (Exception $e) {
        return false;
    }
    return false;
}

// Handle API request
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $headers = getallheaders();
    $auth_header = $headers['Authorization'] ?? '';
    
    if (strpos($auth_header, 'Bearer ') === 0) {
        $token = substr($auth_header, 7);
        $token_data = verifyToken($token);
        
        if ($token_data) {
            try {
                $user_id = $token_data['user_id'];
                $stmt = $pdo->prepare("SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC");
                $stmt->execute([$user_id]);
                $orders = $stmt->fetchAll();
                
                echo json_encode([
                    'success' => true,
                    'orders' => $orders
                ]);
            } catch(PDOException $e) {
                echo json_encode([
                    'success' => false,
                    'message' => 'Failed to fetch order history'
                ]);
            }
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Invalid or expired token'
            ]);
        }
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Authorization token required'
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed'
    ]);
}
?>