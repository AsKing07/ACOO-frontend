<?php
/**
 * API Plausible intégrée
 * Remplace le serveur Node.js externe pour les requêtes Plausible
 */

// Configuration des headers CORS
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Gestion des requêtes OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Configuration
require_once '../../plausible-config.php';

class PlausibleAPI {
    private $apiKey;
    private $baseUrl;
    
    public function __construct() {
        $this->apiKey = PLAUSIBLE_API_KEY;
        $this->baseUrl = 'https://plausible.io/api/v1/stats';
    }
    
    /**
     * Effectue une requête vers l'API Plausible
     */
    private function makeRequest($endpoint, $params = []) {
        $url = $this->baseUrl . '/' . $endpoint;
        
        if (!empty($params)) {
            $url .= '?' . http_build_query($params);
        }
        
        $context = stream_context_create([
            'http' => [
                'method' => 'GET',
                'header' => [
                    'Authorization: Bearer ' . $this->apiKey,
                    'Content-Type: application/json'
                ],
                'timeout' => 30
            ]
        ]);
        
        $response = @file_get_contents($url, false, $context);
        
        if ($response === false) {
            throw new Exception('Erreur lors de la requête vers Plausible API');
        }
        
        $data = json_decode($response, true);
        
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception('Erreur lors du décodage JSON');
        }
        
        return $data;
    }
    
    /**
     * Visiteurs en temps réel
     */
    public function getRealtime($siteId) {
        try {
            $data = $this->makeRequest('realtime/visitors', [
                'site_id' => $siteId
            ]);
            
            return [
                'success' => true,
                'visitors' => $data,
                'timestamp' => date('c')
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'error' => $e->getMessage(),
                'visitors' => 0
            ];
        }
    }
    
    /**
     * Métriques agrégées
     */
    public function getAggregate($siteId, $period = '7d', $metrics = 'visitors,pageviews,visits,bounce_rate') {
        try {
            $data = $this->makeRequest('aggregate', [
                'site_id' => $siteId,
                'period' => $period,
                'metrics' => $metrics
            ]);
            
            return [
                'success' => true,
                'data' => $data,
                'params' => ['site_id' => $siteId, 'period' => $period, 'metrics' => $metrics],
                'timestamp' => date('c')
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'error' => $e->getMessage(),
                'data' => ['results' => []]
            ];
        }
    }
    
    /**
     * Données temporelles
     */
    public function getTimeseries($siteId, $period = '7d', $metrics = 'visitors', $dimensions = 'time:day') {
        try {
            $data = $this->makeRequest('timeseries', [
                'site_id' => $siteId,
                'period' => $period,
                'metrics' => $metrics,
                'dimensions' => $dimensions
            ]);
            
            return [
                'success' => true,
                'data' => $data,
                'params' => ['site_id' => $siteId, 'period' => $period, 'metrics' => $metrics, 'dimensions' => $dimensions],
                'timestamp' => date('c')
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'error' => $e->getMessage(),
                'data' => ['results' => []]
            ];
        }
    }
    
    /**
     * Répartition par propriété
     */
    public function getBreakdown($siteId, $dimensions, $period = '7d', $metrics = 'visitors') {
        try {
            $data = $this->makeRequest('breakdown', [
                'site_id' => $siteId,
                'dimensions' => $dimensions,
                'period' => $period,
                'metrics' => $metrics
            ]);
            
            return [
                'success' => true,
                'data' => $data,
                'params' => ['site_id' => $siteId, 'dimensions' => $dimensions, 'period' => $period, 'metrics' => $metrics],
                'timestamp' => date('c')
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'error' => $e->getMessage(),
                'data' => ['results' => []]
            ];
        }
    }
    
    /**
     * Test de connexion
     */
    public function testConnection($apiKey, $siteId) {
        try {
            // Test avec une requête simple
            $tempApiKey = $this->apiKey;
            $this->apiKey = $apiKey;
            
            $data = $this->makeRequest('aggregate', [
                'site_id' => $siteId,
                'period' => 'day',
                'metrics' => 'visitors'
            ]);
            
            $this->apiKey = $tempApiKey;
            
            return [
                'success' => true,
                'message' => 'Connexion réussie à l\'API Plausible',
                'site_id' => $siteId
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'error' => 'Échec de la connexion',
                'message' => 'Clé API ou site ID invalide'
            ];
        }
    }
}

// Routage simple
$api = new PlausibleAPI();
$path = $_GET['endpoint'] ?? '';
$method = $_SERVER['REQUEST_METHOD'];

try {
    switch ($path) {
        case 'realtime':
            if ($method !== 'GET') {
                throw new Exception('Méthode non autorisée');
            }
            $siteId = $_GET['site_id'] ?? '';
            if (empty($siteId)) {
                throw new Exception('site_id requis');
            }
            $result = $api->getRealtime($siteId);
            break;
            
        case 'aggregate':
            if ($method !== 'GET') {
                throw new Exception('Méthode non autorisée');
            }
            $siteId = $_GET['site_id'] ?? '';
            $period = $_GET['period'] ?? '7d';
            $metrics = $_GET['metrics'] ?? 'visitors,pageviews,visits,bounce_rate';
            
            if (empty($siteId)) {
                throw new Exception('site_id requis');
            }
            $result = $api->getAggregate($siteId, $period, $metrics);
            break;
            
        case 'timeseries':
            if ($method !== 'GET') {
                throw new Exception('Méthode non autorisée');
            }
            $siteId = $_GET['site_id'] ?? '';
            $period = $_GET['period'] ?? '7d';
            $metrics = $_GET['metrics'] ?? 'visitors';
            $dimensions = $_GET['dimensions'] ?? 'time:day';
            
            if (empty($siteId)) {
                throw new Exception('site_id requis');
            }
            $result = $api->getTimeseries($siteId, $period, $metrics, $dimensions);
            break;
            
        case 'breakdown':
            if ($method !== 'GET') {
                throw new Exception('Méthode non autorisée');
            }
            $siteId = $_GET['site_id'] ?? '';
            $dimensions = $_GET['dimensions'] ?? 'visit:country_name';
            $period = $_GET['period'] ?? '7d';
            $metrics = $_GET['metrics'] ?? 'visitors';
            
            if (empty($siteId)) {
                throw new Exception('site_id requis');
            }
            $result = $api->getBreakdown($siteId, $dimensions, $period, $metrics);
            break;
            
        case 'test-connection':
            if ($method !== 'POST') {
                throw new Exception('Méthode non autorisée');
            }
            $input = json_decode(file_get_contents('php://input'), true);
            $apiKey = $input['api_key'] ?? '';
            $siteId = $input['site_id'] ?? '';
            
            if (empty($apiKey) || empty($siteId)) {
                throw new Exception('api_key et site_id requis');
            }
            $result = $api->testConnection($apiKey, $siteId);
            break;
            
        default:
            throw new Exception('Endpoint non trouvé');
    }
    
    echo json_encode($result);
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>
