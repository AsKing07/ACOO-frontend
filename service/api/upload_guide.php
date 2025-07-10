<?php

if (isset($_FILES['guide'])) {
    $uploadDir = __DIR__ . '/../../assets/docs/';
    // Crée le dossier s'il n'existe pas
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0775, true);
    }

    // Récupère l'extension du fichier original
    $extension = pathinfo($_FILES['guide']['name'], PATHINFO_EXTENSION);
    $newFileName = 'guide_inscription' . ($extension ? '.' . $extension : '');
    $uploadFile = $uploadDir . $newFileName;

    if (move_uploaded_file($_FILES['guide']['tmp_name'], $uploadFile)) {
        http_response_code(200);
        echo json_encode(['success' => true, 'filename' => $newFileName]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Erreur lors de l\'enregistrement']);
    }
} else {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Aucun fichier reçu']);
}
