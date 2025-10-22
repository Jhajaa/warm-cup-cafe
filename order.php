<?php
header('Content-Type: application/json');

require_once 'config/database.php';

// Handle API request
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $customer_name = $input['customer_name'] ?? '';
    $phone = $input['phone'] ?? '';
    $drink = $input['drink'] ?? '';
    $size = $input['size'] ?? 'small';
    $quantity = $input['quantity'] ?? 1;
    $notes = $input['notes'] ?? '';
    $total_price = $input['total_price'] ?? 0;
    $user_id = $input['user_id'] ?? null;
    
    // Basic validation
    $errors = [];
    
    if (empty($customer_name)) {
        $errors[] = "Customer name is required.";
    }
    
    if (empty($phone)) {
        $errors[] = "Phone number is required.";
    }
    
    if (empty($drink)) {
        $errors[] = "Please select a drink.";
    }
    
    if (empty($quantity) || $quantity < 1) {
        $errors[] = "Quantity must be at least 1.";
    }
    
    if (empty($errors)) {
        try {
            $stmt = $pdo->prepare("INSERT INTO orders (customer_name, phone, drink, size, quantity, notes, total_price, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([$customer_name, $phone, $drink, $size, $quantity, $notes, $total_price, $user_id]);
            
            $order_id = $pdo->lastInsertId();
            
            echo json_encode([
                'success' => true,
                'message' => 'Order placed successfully!',
                'order_id' => $order_id
            ]);
        } catch(PDOException $e) {
            echo json_encode([
                'success' => false,
                'message' => 'Order failed. Please try again.'
            ]);
        }
    } else {
        echo json_encode([
            'success' => false,
            'message' => implode(', ', $errors)
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed'
    ]);
}
?>