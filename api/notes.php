<?php
require_once 'config.php';

// Se for uma requisição OPTIONS, retorna apenas os headers
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Recebe os dados do POST
$data = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($data['content'])) {
        echo json_encode(['success' => false, 'error' => 'Conteúdo não fornecido']);
        exit;
    }

    try {
        // Gera um ID único
        $id = uniqid();
        
        // Prepara a query
        $stmt = $pdo->prepare("INSERT INTO notes (id, content, is_protected, password) VALUES (?, ?, ?, ?)");
        
        // Executa a query
        $stmt->execute([
            $id,
            $data['content'],
            $data['isProtected'] ? 1 : 0,
            $data['isProtected'] ? password_hash($data['password'], PASSWORD_DEFAULT) : null
        ]);
        
        echo json_encode([
            'success' => true,
            'id' => $id
        ]);
    } catch (PDOException $e) {
        echo json_encode([
            'success' => false,
            'error' => 'Erro ao salvar nota: ' . $e->getMessage()
        ]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id = $_GET['id'] ?? null;
    
    if (!$id) {
        echo json_encode(['success' => false, 'error' => 'ID não fornecido']);
        exit;
    }

    try {
        $stmt = $pdo->prepare("SELECT * FROM notes WHERE id = ?");
        $stmt->execute([$id]);
        $note = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$note) {
            echo json_encode(['success' => false, 'error' => 'Nota não encontrada']);
            exit;
        }

        echo json_encode([
            'success' => true,
            'note' => $note
        ]);
    } catch (PDOException $e) {
        echo json_encode([
            'success' => false,
            'error' => 'Erro ao buscar nota: ' . $e->getMessage()
        ]);
    }
}
?> 