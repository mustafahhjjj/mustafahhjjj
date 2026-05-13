<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

function out(array $payload): void {
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

$input = json_decode(file_get_contents('php://input') ?: '[]', true) ?: [];
$score = (float) ($input['score_before'] ?? 0);
$correct = !empty($input['is_correct']);
$difficulty = max(1.0, min(5.0, (float) ($input['difficulty'] ?? 1)));
$challenge = $score >= 90;

if ($correct) {
    $gain = $challenge ? 2.5 + ($difficulty * 0.8) : 7 + ($difficulty * 1.6);
    $score = min(100, $score + $gain);
} else {
    $drop = $challenge ? 12 + ($difficulty * 2.2) : 5 + ($difficulty * 1.5);
    $score = max(0, $score - $drop);
}

out([
    'ok' => true,
    'score_after' => round($score, 2),
    'challenge_zone' => $score >= 90,
    'medal' => $score >= 100 ? 'gold' : ($score >= 90 ? 'silver' : 'none'),
    'message' => $score >= 100 ? 'Altın madalya açıldı.' : ($challenge ? 'Challenge Zone aktif.' : 'Ustalığa doğru ilerliyorsun.')
]);
