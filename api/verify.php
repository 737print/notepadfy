<?php
require_once 'config.php';

// Se for uma requisição OPTIONS, retorna apenas os headers
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['id']) || !isset($data['password'])) {
        echo json_encode(['success' => false, 'error' => 'ID ou senha não fornecidos']);
        exit;
    }

    try {
        $stmt = $pdo->prepare("SELECT * FROM notes WHERE id = ?");
        $stmt->execute([$data['id']]);
        $note = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$note) {
            echo json_encode(['success' => false, 'error' => 'Nota não encontrada']);
            exit;
        }

        if (!$note['is_protected']) {
            echo json_encode(['success' => true, 'note' => $note]);
            exit;
        }

        if (password_verify($data['password'], $note['password'])) {
            echo json_encode(['success' => true, 'note' => $note]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Senha incorreta']);
        }
    } catch (PDOException $e) {
        echo json_encode([
            'success' => false,
            'error' => 'Erro ao verificar senha: ' . $e->getMessage()
        ]);
    }
}
?> 