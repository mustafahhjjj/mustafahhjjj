<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

function reply(array $payload, int $status = 200): void {
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function pickSkill(string $skillSlug): array {
    $skills = [
        'iki-basamakli-eldeli-toplama' => [
            'skill_name' => 'İki basamaklı eldeli toplama',
            'template' => '{a} + {b} = ?',
            'remediation' => ['Önce birlikleri topla.', '10 veya daha fazlaysa 1 onluk elde et.', 'Eldeyi onlar basamağına ekle.'],
            'manipulative' => 'base-ten-blocks',
            'type' => 'carry_addition',
        ],
        'kalansiz-bolme-mantigi' => [
            'skill_name' => 'Kalansız bölme mantığı',
            'template' => '{a} nesne {b} eş gruba ayrılırsa her grupta kaç nesne olur?',
            'remediation' => ['Toplam nesne sayısını eş gruplara dağıt.', 'Her grupta aynı sayı olmasına dikkat et.', 'Bir gruptaki sayı bölümdür.'],
            'manipulative' => 'equal-groups',
            'type' => 'division',
        ],
    ];
    return $skills[$skillSlug] ?? $skills['iki-basamakli-eldeli-toplama'];
}

function generateQuestion(array $skill, float $difficulty): array {
    if ($skill['type'] === 'division') {
        $divisor = random_int(2, max(3, min(9, (int) round(3 + $difficulty * 2))));
        $quotient = random_int(2, max(4, min(12, (int) round(5 + $difficulty * 3))));
        $a = $divisor * $quotient;
        $question = str_replace(['{a}', '{b}'], [(string) $a, (string) $divisor], $skill['template']);
        return ['question' => $question, 'answer' => $quotient, 'variables' => ['a' => $a, 'b' => $divisor, 'q' => $quotient]];
    }
    do {
        $a = random_int(18, max(28, min(89, (int) round(45 + $difficulty * 18))));
        $b = random_int(18, max(28, min(89, (int) round(38 + $difficulty * 18))));
    } while (($a % 10) + ($b % 10) < 10);
    $question = str_replace(['{a}', '{b}'], [(string) $a, (string) $b], $skill['template']);
    return ['question' => $question, 'answer' => $a + $b, 'variables' => ['a' => $a, 'b' => $b]];
}

$input = json_decode(file_get_contents('php://input') ?: '[]', true) ?: [];
$skillSlug = (string) ($_GET['skill'] ?? $input['skill_slug'] ?? 'iki-basamakli-eldeli-toplama');
$correctStreak = (int) ($_GET['streak'] ?? $input['correct_streak'] ?? 0);
$difficulty = (float) ($_GET['difficulty'] ?? $input['difficulty'] ?? 1.0);
if ($correctStreak >= 3) {
    $difficulty += 0.2;
}
$difficulty = max(1.0, min(5.0, $difficulty));
$skill = pickSkill($skillSlug);
$generated = generateQuestion($skill, $difficulty);

reply([
    'ok' => true,
    'skill_slug' => $skillSlug,
    'skill_name' => $skill['skill_name'],
    'difficulty' => $difficulty,
    'question' => $generated['question'],
    'answer' => $generated['answer'],
    'variables' => $generated['variables'],
    'remediation' => $skill['remediation'],
    'manipulative' => $skill['manipulative'],
    'mastery_hint' => 'Ustalık için son sorularda tutarlı başarı gerekir.'
]);
