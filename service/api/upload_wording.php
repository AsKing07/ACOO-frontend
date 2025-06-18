<?php

if (isset($_FILES['wording'])) {
    $uploadDir = __DIR__ . '/../assets/docs/';
    // Crée le dossier s'il n'existe pas
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0775, true);
    }
    $uploadFile = $uploadDir . basename($_FILES['wording']['name']);

    if (move_uploaded_file($_FILES['wording']['tmp_name'], $uploadFile)) {
        http_response_code(200);
        echo json_encode(['success' => true, 'filename' => $_FILES['wording']['name']]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Erreur lors de l\'enregistrement']);
    }
} else {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Aucun fichier reçu']);
}