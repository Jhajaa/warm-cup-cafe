<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
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
                // Get user info to check if admin
                $stmt = $pdo->prepare("SELECT email FROM users WHERE id = ?");
                $stmt->execute([$token_data['user_id']]);
                $user = $stmt->fetch();
                
                if ($user && $user['email'] === 'admin@coffeeshop.com') {
                    // Get all orders
                    $stmt = $pdo->prepare("SELECT * FROM orders ORDER BY created_at DESC");
                    $stmt->execute();
                    $orders = $stmt->fetchAll();
                    
                    // Get statistics
                    $stats_stmt = $pdo->prepare("
                        SELECT 
                            COUNT(*) as total_orders,
                            SUM(CASE WHEN order_status = 'pending' THEN 1 ELSE 0 END) as pending_orders,
                            SUM(CASE WHEN order_status = 'completed' THEN 1 ELSE 0 END) as completed_orders,
                            SUM(CASE WHEN order_status = 'completed' THEN total_price ELSE 0 END) as total_revenue
                        FROM orders
                    ");
                    $stats_stmt->execute();
                    $stats = $stats_stmt->fetch();
                    
                    echo json_encode([
                        'success' => true,
                        'orders' => $orders,
                        'stats' => $stats
                    ]);
                } else {
                    echo json_encode([
                        'success' => false,
                        'message' => 'Admin access required'
                    ]);
                }
            } catch(PDOException $e) {
                echo json_encode([
                    'success' => false,
                    'message' => 'Failed to fetch admin data'
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
} elseif ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $headers = getallheaders();
    $auth_header = $headers['Authorization'] ?? '';
    
    if (strpos($auth_header, 'Bearer ') === 0) {
        $token = substr($auth_header, 7);
        $token_data = verifyToken($token);
        
        if ($token_data) {
            try {
                // Get user info to check if admin
                $stmt = $pdo->prepare("SELECT email FROM users WHERE id = ?");
                $stmt->execute([$token_data['user_id']]);
                $user = $stmt->fetch();
                
                if ($user && $user['email'] === 'admin@coffeeshop.com') {
                    $input = json_decode(file_get_contents('php://input'), true);
                    $action = $input['action'] ?? '';
                    
                    if ($action === 'update_status') {
                        $order_id = $input['order_id'] ?? '';
                        $status = $input['status'] ?? '';
                        
                        if ($order_id && $status) {
                            $stmt = $pdo->prepare("UPDATE orders SET order_status = ? WHERE id = ?");
                            $stmt->execute([$status, $order_id]);
                            
                            echo json_encode([
                                'success' => true,
                                'message' => 'Order status updated successfully'
                            ]);
                        } else {
                            echo json_encode([
                                'success' => false,
                                'message' => 'Order ID and status required'
                            ]);
                        }
                    } else {
                        echo json_encode([
                            'success' => false,
                            'message' => 'Invalid action'
                        ]);
                    }
                } else {
                    echo json_encode([
                        'success' => false,
                        'message' => 'Admin access required'
                    ]);
                }
            } catch(PDOException $e) {
                echo json_encode([
                    'success' => false,
                    'message' => 'Failed to update order'
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