<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

$host = 'localhost';
$dbname = 'u476886275_notepadfy';
$username = 'u476886275_notepadfyuser';
$password = 'g6/O|3uVqhNu';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die(json_encode(['error' => 'Erro na conexão: ' . $e->getMessage()]));
}
?> 