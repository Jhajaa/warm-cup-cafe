<?php
// Debug endpoint to check environment variables
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

echo json_encode([
    'database_url_set' => isset($_ENV['DATABASE_URL']) ? 'YES' : 'NO',
    'database_url_value' => isset($_ENV['DATABASE_URL']) ? substr($_ENV['DATABASE_URL'], 0, 20) . '...' : 'NOT SET',
    'db_host_set' => isset($_ENV['DB_HOST']) ? 'YES' : 'NO',
    'db_name_set' => isset($_ENV['DB_NAME']) ? 'YES' : 'NO',
    'db_user_set' => isset($_ENV['DB_USER']) ? 'YES' : 'NO',
    'db_pass_set' => isset($_ENV['DB_PASS']) ? 'YES' : 'NO',
    'all_env_vars' => array_keys($_ENV),
    'timestamp' => date('Y-m-d H:i:s')
]);
?>
