<?php
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');

$storeRoot = dirname(__DIR__) . DIRECTORY_SEPARATOR . '.ekurs-cp-sync';
$lockTtl = 120;

function ekurs_cp_json_input(): array
{
    $raw = file_get_contents('php://input') ?: '';
    $json = json_decode($raw, true);
    return is_array($json) ? $json : [];
}

function ekurs_cp_response(array $data, int $status = 200): void
{
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function ekurs_cp_content_id(array $input): string
{
    $value = (string)($input['content_id'] ?? $_GET['content_id'] ?? '');
    $value = trim($value);
    $value = preg_replace('/[^a-zA-Z0-9_.\/-]+/', '-', $value) ?: '';
    $value = trim($value, './-');
    return $value !== '' ? $value : 'default';
}

function ekurs_cp_file(string $root, string $contentId): string
{
    $safe = str_replace(['/', '\\'], '__', $contentId);
    return $root . DIRECTORY_SEPARATOR . $safe . '.json';
}

function ekurs_cp_now(): string
{
    return gmdate('c');
}

function ekurs_cp_default_state(string $contentId): array
{
    return [
        'content_id' => $contentId,
        'version' => 1,
        'updated_at' => ekurs_cp_now(),
        'updated_by' => 'system',
        'payload' => new stdClass(),
        'lock' => null,
    ];
}

function ekurs_cp_read_state(string $file, string $contentId): array
{
    if (!is_file($file)) {
        return ekurs_cp_default_state($contentId);
    }
    $state = json_decode((string)file_get_contents($file), true);
    if (!is_array($state)) {
        return ekurs_cp_default_state($contentId);
    }
    $state += ekurs_cp_default_state($contentId);
    return $state;
}

function ekurs_cp_write_state(string $file, array $state): void
{
    file_put_contents($file, json_encode($state, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT), LOCK_EX);
}

function ekurs_cp_clean_lock(array $state, int $ttl): array
{
    if (empty($state['lock']['expires_at'])) {
        $state['lock'] = null;
        return $state;
    }
    if (strtotime((string)$state['lock']['expires_at']) <= time()) {
        $state['lock'] = null;
    }
    return $state;
}

function ekurs_cp_client_id(array $input): string
{
    $client = (string)($input['client_id'] ?? $_SERVER['HTTP_X_EKURS_CLIENT'] ?? session_id() ?: 'anonymous');
    return substr(preg_replace('/[^a-zA-Z0-9_.:-]+/', '-', $client) ?: 'anonymous', 0, 80);
}

if (!is_dir($storeRoot) && !mkdir($storeRoot, 0755, true) && !is_dir($storeRoot)) {
    ekurs_cp_response(['ok' => false, 'error' => 'sync_store_unavailable'], 500);
}

$input = ekurs_cp_json_input();
$action = (string)($input['action'] ?? $_GET['action'] ?? 'check');
$contentId = ekurs_cp_content_id($input);
$file = ekurs_cp_file($storeRoot, $contentId);
$state = ekurs_cp_clean_lock(ekurs_cp_read_state($file, $contentId), $lockTtl);
$localVersion = (int)($input['local_version'] ?? $_GET['local_version'] ?? 0);
$clientId = ekurs_cp_client_id($input);

if ($action === 'check' || $_SERVER['REQUEST_METHOD'] === 'GET') {
    ekurs_cp_write_state($file, $state);
    ekurs_cp_response([
        'ok' => true,
        'content_id' => $contentId,
        'remote_version' => (int)$state['version'],
        'remote_updated_at' => $state['updated_at'],
        'remote_newer' => $localVersion > 0 && (int)$state['version'] > $localVersion,
        'payload' => $state['payload'],
        'lock' => $state['lock'],
    ]);
}

if ($action === 'lock') {
    if (!empty($state['lock']) && ($state['lock']['client_id'] ?? '') !== $clientId) {
        ekurs_cp_response([
            'ok' => false,
            'error' => 'locked',
            'message' => 'İçerik şu an başka bir kullanıcı tarafından güncelleniyor.',
            'lock' => $state['lock'],
        ], 423);
    }
    $state['lock'] = [
        'client_id' => $clientId,
        'locked_at' => ekurs_cp_now(),
        'expires_at' => gmdate('c', time() + $lockTtl),
    ];
    ekurs_cp_write_state($file, $state);
    ekurs_cp_response(['ok' => true, 'lock' => $state['lock'], 'remote_version' => (int)$state['version']]);
}

if ($action === 'release') {
    if (!empty($state['lock']) && ($state['lock']['client_id'] ?? '') === $clientId) {
        $state['lock'] = null;
        ekurs_cp_write_state($file, $state);
    }
    ekurs_cp_response(['ok' => true]);
}

if ($action === 'save') {
    if ($localVersion > 0 && (int)$state['version'] > $localVersion) {
        ekurs_cp_response([
            'ok' => false,
            'error' => 'remote_newer',
            'message' => 'Sunucuda daha güncel bir sürüm bulundu. İçerik otomatik olarak güncellendi. Lütfen değişikliklerinizi kontrol edip tekrar gönderin.',
            'remote_version' => (int)$state['version'],
            'remote_updated_at' => $state['updated_at'],
            'payload' => $state['payload'],
        ], 409);
    }
    if (!empty($state['lock']) && ($state['lock']['client_id'] ?? '') !== $clientId) {
        ekurs_cp_response([
            'ok' => false,
            'error' => 'locked',
            'message' => 'İçerik şu an başka bir kullanıcı tarafından güncelleniyor.',
            'lock' => $state['lock'],
        ], 423);
    }
    $payload = $input['payload'] ?? [];
    if (!is_array($payload)) {
        $payload = [];
    }
    $state['version'] = (int)$state['version'] + 1;
    $state['updated_at'] = ekurs_cp_now();
    $state['updated_by'] = $clientId;
    $state['payload'] = $payload;
    $state['lock'] = null;
    ekurs_cp_write_state($file, $state);
    ekurs_cp_response([
        'ok' => true,
        'content_id' => $contentId,
        'remote_version' => (int)$state['version'],
        'remote_updated_at' => $state['updated_at'],
        'payload' => $state['payload'],
    ]);
}

ekurs_cp_response(['ok' => false, 'error' => 'unknown_action'], 400);
