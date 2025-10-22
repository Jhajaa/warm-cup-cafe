<?php
session_start();

// Destroy all session data
session_destroy();

// Redirect to main page
header('Location: hilaga.html');
exit();
?>