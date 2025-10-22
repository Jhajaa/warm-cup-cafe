<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
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