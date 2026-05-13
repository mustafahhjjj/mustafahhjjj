<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

function respond(array $payload): void {
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

$samples = [
    'M.2.1.1' => [
        'name' => "10'un katlarını toplama",
        'sample' => '30 + 40 işleminin sonucu kaçtır?',
        'challenge' => '70 + 20 + 10 işlemini zihinden çöz.',
        'difficulty' => 1.2,
        'popularity' => 84,
    ],
    'M.2.1.2' => [
        'name' => 'İki basamaklı eldesiz toplama',
        'sample' => '24 + 35 işleminin sonucu kaçtır?',
        'challenge' => '43 + 26 + 10 işlemini çöz.',
        'difficulty' => 1.8,
        'popularity' => 79,
    ],
    'M.2.1.3' => [
        'name' => 'İki basamaklı eldeli toplama',
        'sample' => '36 + 27 işleminde sonuç kaçtır?',
        'challenge' => '48 + 37 + 16 işlemini dikkatlice çöz.',
        'difficulty' => 2.6,
        'popularity' => 91,
    ],
];

$code = (string) ($_GET['code'] ?? 'M.2.1.3');
$item = $samples[$code] ?? $samples['M.2.1.3'];

respond([
    'ok' => true,
    'code' => $code,
    'name' => $item['name'],
    'sample_question' => $item['sample'],
    'challenge_question' => $item['challenge'],
    'difficulty_score' => $item['difficulty'],
    'popularity_score' => $item['popularity'],
    'hint' => '90 SmartScore sonrası Challenge Zone soruları açılır.'
]);
