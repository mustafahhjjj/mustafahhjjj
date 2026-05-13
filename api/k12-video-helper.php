<?php
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');

function ekurs_get($key, $default = '') {
    return isset($_GET[$key]) ? trim((string) $_GET[$key]) : $default;
}

function ekurs_slug_text($text) {
    $map = ['ş'=>'s','Ş'=>'s','ğ'=>'g','Ğ'=>'g','ç'=>'c','Ç'=>'c','ö'=>'o','Ö'=>'o','ü'=>'u','Ü'=>'u','ı'=>'i','İ'=>'i'];
    $text = strtr((string) $text, $map);
    $text = strtolower($text);
    $text = preg_replace('/[^a-z0-9]+/', '-', $text);
    return trim($text, '-') ?: 'k12-kazanim';
}

$skillId = ekurs_get('skill_id', 'M.K12.AUTO');
$topic = ekurs_get('topic', 'Matematik kazanımı');
$lessonUrl = ekurs_get('lesson_url', '/dersler/matematik?konu=' . ekurs_slug_text($topic));

$library = [
    'M.8.1.1.1' => [
        'lessonUrl' => '/dersler/matematik?konu=uslu-sayilar',
        'script' => 'Üslü sayılarda önce tabandaki sayının kaç kez çarpıldığını düşün. 2 üzeri 3 demek 2 x 2 x 2, yani 8 demektir. Sonra kalan işlemi yaparsın.',
        'storyboard' => ['Tabanı ve kuvveti ayrı renkle göster.', '2 x 2 x 2 çarpımını kutucuklarla aç.', 'Son adımda toplama işlemini tamamla.'],
    ],
    'M.8.1.3.2' => [
        'lessonUrl' => '/dersler/matematik?konu=karekoklu-ifadeler',
        'script' => 'Karekök, hangi sayının karesinin verilen sayıyı oluşturduğunu sorar. 49 için cevap 7dir çünkü 7 x 7 = 49.',
        'storyboard' => ['49 karelik alanı 7ye 7 kare olarak çiz.', 'Kenar uzunluğunun 7 olduğunu göster.', 'Sonra kalan işlemi tamamla.'],
    ],
    'M.8.1.2.1' => [
        'lessonUrl' => '/dersler/matematik?konu=carpanlar-katlar',
        'script' => 'EBOB ortak bölenlerin en büyüğüdür. Önce iki sayının bölenlerini yaz, ortak olanları işaretle ve en büyüğünü seç.',
        'storyboard' => ['İki sayı için bölen listesi oluştur.', 'Ortak bölenleri kesişim alanında göster.', 'En büyük ortak böleni vurgula.'],
    ],
];

$item = isset($library[$skillId]) ? $library[$skillId] : [
    'lessonUrl' => $lessonUrl,
    'script' => $topic . ' konusu için 45 saniyelik kısa bir tekrar: önce temel kuralı hatırla, sonra örnek üzerinden adımları izle ve en sonda benzer kolay soruyu çöz.',
    'storyboard' => ['Kazanım adını sade bir başlık olarak göster.', 'Temel kuralı tek cümleyle anlat.', 'Bir örnek soruyu üç adımda çöz.', 'Öğrenciyi kolay kontrol sorusuna yönlendir.'],
];

$response = [
    'status' => 'queued',
    'skillId' => $skillId,
    'topic' => $topic,
    'lessonUrl' => $item['lessonUrl'],
    'videoUrl' => null,
    'script' => $item['script'],
    'storyboard' => $item['storyboard'],
    'generationPrompt' => '30-45 saniyelik, K-12 seviyesinde, sade Türkçe anlatımlı, şematik çizimli ve mobil öncelikli bir eğitim videosu üret. Konu: ' . $topic . '. Kazanım kodu: ' . $skillId . '.',
    'provider' => getenv('EKURS_VIDEO_PROVIDER') ?: 'pending-video-provider',
];

echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
