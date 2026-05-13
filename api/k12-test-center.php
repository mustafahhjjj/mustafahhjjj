<?php
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');

function ekurs_param($key, $default = '') {
    return isset($_GET[$key]) ? trim((string) $_GET[$key]) : $default;
}

function ekurs_lower($value) {
    $value = trim((string) $value);
    return function_exists('mb_strtolower') ? mb_strtolower($value, 'UTF-8') : strtolower($value);
}

$grade = ekurs_param('grade', '8');
$subject = ekurs_lower(ekurs_param('subject', 'matematik'));

$tests = [
    [
        'id' => 'math-8-uslu-sayilar-teshis',
        'title' => 'Üslü Sayılar Hızlı Teşhis',
        'grade' => '8',
        'subject' => 'matematik',
        'unit' => 'Sayılar ve İşlemler',
        'outcome' => 'M.8.1.1.1',
        'skill' => 'Tam sayıların tam sayı kuvvetlerini hesaplama',
        'difficulty' => 'Orta',
        'questionCount' => 12,
        'duration' => 15,
        'xp' => 90,
        'status' => 'Yeni',
        'accuracy' => null,
        'modeHint' => 'Pratik modu önerilir',
    ],
    [
        'id' => 'math-8-karekok-devam',
        'title' => 'Kareköklü İfadeler Kaldığın Yerden',
        'grade' => '8',
        'subject' => 'matematik',
        'unit' => 'Kareköklü İfadeler',
        'outcome' => 'M.8.1.3.2',
        'skill' => 'Kareköklü ifadeleri yaklaşık değerleriyle yorumlama',
        'difficulty' => 'Zorlayıcı',
        'questionCount' => 10,
        'duration' => 14,
        'xp' => 120,
        'status' => 'Yarım Kalan',
        'accuracy' => 54,
        'modeHint' => 'Pratik modu önerilir',
    ],
    [
        'id' => 'math-8-carpanlar-deneme',
        'title' => 'Çarpanlar ve Katlar Mini Deneme',
        'grade' => '8',
        'subject' => 'matematik',
        'unit' => 'Çarpanlar ve Katlar',
        'outcome' => 'M.8.1.2.1',
        'skill' => 'EBOB ve EKOK problemleri çözme',
        'difficulty' => 'Orta',
        'questionCount' => 20,
        'duration' => 25,
        'xp' => 150,
        'status' => 'Tamamlanan',
        'accuracy' => 82,
        'modeHint' => 'Deneme modu ile tekrar et',
    ],
    [
        'id' => 'tr-7-paragraf-pratik',
        'title' => 'Paragrafta Ana Düşünce Pratiği',
        'grade' => '7',
        'subject' => 'türkçe',
        'unit' => 'Anlama',
        'outcome' => 'T.7.3.17',
        'skill' => 'Metnin ana fikrini belirleme',
        'difficulty' => 'Kolay',
        'questionCount' => 8,
        'duration' => 10,
        'xp' => 70,
        'status' => 'Yeni',
        'accuracy' => null,
        'modeHint' => 'Pratik modu önerilir',
    ],
    [
        'id' => 'fen-6-kuvvet-deneme',
        'title' => 'Kuvvet ve Hareket Kazanım Testi',
        'grade' => '6',
        'subject' => 'fen bilimleri',
        'unit' => 'Kuvvet ve Hareket',
        'outcome' => 'F.6.3.1.2',
        'skill' => 'Bileşke kuvveti yorumlama',
        'difficulty' => 'Orta',
        'questionCount' => 15,
        'duration' => 18,
        'xp' => 110,
        'status' => 'Yeni',
        'accuracy' => null,
        'modeHint' => 'Deneme modu uygun',
    ],
];

$filtered = array_values(array_filter($tests, function ($test) use ($grade, $subject) {
    if ($grade !== 'all' && $test['grade'] !== $grade) {
        return false;
    }
    if ($subject !== 'all' && ekurs_lower($test['subject']) !== $subject) {
        return false;
    }
    return true;
}));

if (!$filtered) {
    $filtered = array_values(array_filter($tests, function ($test) use ($grade) {
        return $grade === 'all' || $test['grade'] === $grade;
    }));
}

$response = [
    'student' => [
        'name' => 'Öğrenci',
        'grade' => $grade,
        'streakDays' => 5,
        'weeklySolved' => 34,
        'xpToday' => 180,
    ],
    'filters' => [
        'grades' => ['all', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        'subjects' => ['all', 'matematik', 'türkçe', 'fen bilimleri'],
        'difficulties' => ['all', 'Kolay', 'Orta', 'Zorlayıcı'],
        'statuses' => ['all', 'Yeni', 'Yarım Kalan', 'Tamamlanan'],
    ],
    'recommendations' => [
        [
            'label' => 'Zayıf nokta giderici',
            'title' => 'Üslü sayılar tekrar seti',
            'reason' => 'Son denemelerde kuvvet alma adımlarında hata oranı arttı.',
            'target' => 'M.8.1.1.1',
            'action' => '5 soruluk tekrar testi',
            'xp' => 75,
            'questionCount' => 5,
        ],
        [
            'label' => 'Ön koşul önerisi',
            'title' => 'Çarpanlara ayırmadan önce ortak çarpan',
            'reason' => 'Bir üst konuya geçmeden önce temel ilişkiyi güçlendirmek gerekir.',
            'target' => 'M.8.1.2.2',
            'action' => 'Kısa pratik başlat',
            'xp' => 65,
            'questionCount' => 5,
        ],
    ],
    'dailyChallenge' => [
        'title' => 'Günün Matematik Meydan Okuması',
        'description' => '5 dakikalık, seviyene göre kalibre edilmiş kısa test.',
        'questionCount' => 5,
        'xp' => 75,
        'difficulty' => 'Uyarlanabilir',
    ],
    'tests' => $filtered ?: $tests,
    'leaderboard' => [
        ['name' => '8A-042', 'solved' => 48],
        ['name' => '8B-117', 'solved' => 42],
        ['name' => '8C-089', 'solved' => 39],
    ],
];

echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
