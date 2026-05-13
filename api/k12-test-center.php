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
        'id' => 'math-2-toplama-deneme',
        'title' => '2. Sınıf Toplama Hızlı Teşhis',
        'grade' => '2',
        'subject' => 'matematik',
        'unit' => 'Sayılar ve İşlemler',
        'outcome' => 'M.2.1.2.3',
        'skill' => 'İki basamaklı sayılarla 10’a tamamlayarak toplama yapma',
        'difficulty' => 'Zorlayıcı',
        'questionCount' => 8,
        'duration' => 12,
        'xp' => 80,
        'status' => 'Yeni',
        'accuracy' => null,
        'modeHint' => 'Sesli okuma ve mini ders ile çocuk dostu pratik',
    ],
    [
        'id' => 'math-2-cikarma-pratik',
        'title' => '2. Sınıf Çıkarma Mini Pratik',
        'grade' => '2',
        'subject' => 'matematik',
        'unit' => 'Sayılar ve İşlemler',
        'outcome' => 'M.2.1.2.5',
        'skill' => 'Onluk bozarak çıkarma işlemini modelleme',
        'difficulty' => 'Orta',
        'questionCount' => 6,
        'duration' => 10,
        'xp' => 65,
        'status' => 'Yeni',
        'accuracy' => null,
        'modeHint' => 'Yanlışta adım adım açıklama gösterilir',
    ],
    [
        'id' => 'math-2-paralarimiz',
        'title' => 'Paralarımız ve Alışveriş Problemleri',
        'grade' => '2',
        'subject' => 'matematik',
        'unit' => 'Paralarımız',
        'outcome' => 'M.2.3.2.1',
        'skill' => 'Lira ve kuruş ilişkisini günlük hayat problemlerinde kullanma',
        'difficulty' => 'Kolay',
        'questionCount' => 5,
        'duration' => 8,
        'xp' => 55,
        'status' => 'Yeni',
        'accuracy' => null,
        'modeHint' => 'Görsel şıklarla hızlı pekiştirme',
    ],
    [
        'id' => 'math-2-saatler',
        'title' => 'Saatleri Okuma ve Zaman',
        'grade' => '2',
        'subject' => 'matematik',
        'unit' => 'Zaman Ölçme',
        'outcome' => 'M.2.3.3.1',
        'skill' => 'Tam, yarım ve çeyrek saatleri okuma',
        'difficulty' => 'Orta',
        'questionCount' => 6,
        'duration' => 10,
        'xp' => 60,
        'status' => 'Yeni',
        'accuracy' => null,
        'modeHint' => 'Tablet dostu büyük seçenekler',
    ],
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

$isSecondGrade = $grade === '2';
$recommendations = $isSecondGrade ? [
    [
        'label' => 'Zayıf nokta giderici',
        'title' => '10’a tamamlayarak toplama',
        'reason' => 'Son denemelerde 7 + 5 gibi işlemlerde 10’a tamamlama adımı güçlendirilmeli.',
        'target' => 'M.2.1.2.3',
        'action' => '5 soruluk çocuk dostu tekrar',
        'xp' => 60,
        'questionCount' => 5,
    ],
    [
        'label' => 'Ön koşul önerisi',
        'title' => 'Onluk ve birlikleri modelle',
        'reason' => 'Eldeli toplama ve çıkarma için önce onluk-birlik ilişkisini pekiştirelim.',
        'target' => 'M.2.1.1.4',
        'action' => 'Kısa pratik başlat',
        'xp' => 50,
        'questionCount' => 5,
    ],
] : [
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
];

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
    'recommendations' => $recommendations,
    'dailyChallenge' => [
        'title' => $isSecondGrade ? 'Günün 2. Sınıf Matematik Oyunu' : 'Günün Matematik Meydan Okuması',
        'description' => $isSecondGrade ? '5 dakikalık toplama ve dikkat pratiği.' : '5 dakikalık, seviyene göre kalibre edilmiş kısa test.',
        'questionCount' => 5,
        'xp' => 75,
        'difficulty' => 'Uyarlanabilir',
    ],
    'tests' => $filtered ?: $tests,
    'leaderboard' => $isSecondGrade ? [
        ['name' => '2A-014', 'solved' => 22],
        ['name' => '2B-031', 'solved' => 19],
        ['name' => '2C-008', 'solved' => 17],
    ] : [
        ['name' => '8A-042', 'solved' => 48],
        ['name' => '8B-117', 'solved' => 42],
        ['name' => '8C-089', 'solved' => 39],
    ],
];

echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
