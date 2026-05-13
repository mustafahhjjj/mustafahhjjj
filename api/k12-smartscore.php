<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

function ekurs_reply(array $payload, int $status = 200): void {
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function ekurs_smartscore(float $previous, bool $correct, int $difficulty, int $streak = 0): float {
    $difficulty = max(1, min(5, $difficulty));
    if ($correct) {
        $gain = 6 + ($difficulty * 2) + min(6, $streak * 1.5);
        return min(100, $previous + $gain);
    }
    $penalty = 4 + ($difficulty * 1.8);
    return max(0, $previous - $penalty);
}

function ekurs_feedback(string $skillName, bool $correct): array {
    if ($correct) {
        return [
            'status' => 'mastery-progress',
            'title' => 'Harika, ustalığa yaklaşıyorsun.',
            'steps' => ['Aynı kuralı bir sonraki daha zor soruda da uygula.', 'Hızını değil tutarlılığını koru.'],
        ];
    }
    return [
        'status' => 'reteach',
        'title' => $skillName . ' için kısa tekrar',
        'steps' => [
            'Önce birlikleri topla.',
            '10 veya daha fazlaysa bir onluk elde et.',
            'Eldeyi onlar basamağına ekle.',
        ],
        'manipulative' => 'base-ten-blocks',
    ];
}

$input = json_decode(file_get_contents('php://input') ?: '[]', true) ?: [];
$previous = (float) ($input['score_before'] ?? 0);
$correct = !empty($input['is_correct']);
$difficulty = (int) ($input['difficulty'] ?? 1);
$streak = (int) ($input['streak'] ?? 0);
$skillName = (string) ($input['skill_name'] ?? 'Bu mikro kazanım');
$score = ekurs_smartscore($previous, $correct, $difficulty, $streak);

ekurs_reply([
    'ok' => true,
    'score_before' => $previous,
    'score_after' => $score,
    'mastered' => $score >= 90,
    'feedback' => ekurs_feedback($skillName, $correct),
    'next_action' => $score >= 90 ? 'Bir sonraki mikro kazanıma geç' : 'Kısa tekrar + 3 alıştırma çöz',
]);
