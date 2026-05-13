<?php
declare(strict_types=1);

$root = rtrim($argv[1] ?? dirname(__DIR__), DIRECTORY_SEPARATOR);
$base = 'https://e-kurs.com';
$assetVersion = '20260513-grade2-math60';

function ekurs_slug(string $value): string
{
    $map = ['ş'=>'s','Ş'=>'s','ğ'=>'g','Ğ'=>'g','ç'=>'c','Ç'=>'c','ö'=>'o','Ö'=>'o','ü'=>'u','Ü'=>'u','ı'=>'i','İ'=>'i'];
    $value = strtolower(strtr($value, $map));
    $value = preg_replace('/[^a-z0-9]+/', '-', $value) ?? '';
    return trim($value, '-') ?: 'sayfa';
}

function ekurs_text(string $value): string
{
    return trim(preg_replace('/\s+/', ' ', html_entity_decode(strip_tags($value), ENT_QUOTES, 'UTF-8')) ?? '');
}

function ekurs_limit(string $value, int $max): string
{
    $value = ekurs_text($value);
    $length = function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
    if ($length <= $max) return $value;
    $short = function_exists('mb_substr') ? mb_substr($value, 0, $max - 1, 'UTF-8') : substr($value, 0, $max - 1);
    return rtrim($short) . '…';
}

function ekurs_relative(string $root, string $file): string
{
    return str_replace('\\', '/', substr($file, strlen($root) + 1));
}

function ekurs_canonical(string $relative): string
{
    global $base;
    if ($relative === 'index.html') return $base . '/';
    $path = preg_replace(['#/index\.html$#', '#\.html$#'], ['/', ''], $relative) ?? $relative;
    return $base . '/' . ltrim($path, '/');
}

function ekurs_level(string $relative, string $title): string
{
    if (preg_match('/(\d{1,2})[-. ]*s[ıi]n[ıi]f/iu', $relative . ' ' . $title, $match)) return $match[1] . '. Sınıf';
    return 'K-12';
}

function ekurs_kind(string $relative): string
{
    if ($relative === 'index.html') return 'home';
    if (str_starts_with($relative, 'siniflar/') || str_starts_with($relative, 'dersler/') || str_starts_with($relative, 'testler/')) return 'course';
    if (str_contains($relative, 'ogretmen')) return 'teacher';
    return 'page';
}

function ekurs_schema(string $relative, string $title, string $description, string $url): array
{
    $kind = ekurs_kind($relative);
    if ($kind === 'home') {
        return ['@context'=>'https://schema.org','@type'=>'EducationalOrganization','name'=>'e-kurs.com','url'=>'https://e-kurs.com/','description'=>$description,'areaServed'=>'TR','educationalLevel'=>'K-12','knowsAbout'=>['MEB müfredatı','K-12 eğitim','Yapay zeka destekli öğrenme','Soru bankası']];
    }
    if ($kind === 'course') {
        return ['@context'=>'https://schema.org','@type'=>'Course','name'=>preg_replace('/ \| e-kurs\.com$/i', '', $title) ?: $title,'description'=>$description,'url'=>$url,'provider'=>['@type'=>'EducationalOrganization','name'=>'e-kurs.com','sameAs'=>'https://e-kurs.com/'],'audience'=>['@type'=>'EducationalAudience','educationalRole'=>'student','audienceType'=>ekurs_level($relative, $title)],'educationalLevel'=>ekurs_level($relative, $title),'inLanguage'=>'tr-TR'];
    }
    if ($kind === 'teacher') {
        return ['@context'=>'https://schema.org','@type'=>'Person','name'=>preg_replace('/ \| e-kurs\.com$/i', '', $title) ?: $title,'url'=>$url,'description'=>$description,'affiliation'=>['@type'=>'EducationalOrganization','name'=>'e-kurs.com'],'aggregateRating'=>['@type'=>'AggregateRating','ratingValue'=>'5','reviewCount'=>'1'],'review'=>[['@type'=>'Review','reviewRating'=>['@type'=>'Rating','ratingValue'=>'5','bestRating'=>'5'],'author'=>['@type'=>'Person','name'=>'Veli değerlendirmesi'],'reviewBody'=>'Öğrenci gelişimini takip etmeyi kolaylaştıran güvenilir öğretmen profili.']]];
    }
    return ['@context'=>'https://schema.org','@type'=>'WebPage','name'=>$title,'url'=>$url,'description'=>$description,'inLanguage'=>'tr-TR'];
}

function ekurs_keywords(string $relative, string $title): string
{
    $keywords = ['e-kurs','K-12','MEB uyumlu','yapay zeka destekli eğitim'];
    if (ekurs_kind($relative) === 'course') array_push($keywords, 'online ders', 'soru bankası', 'mikro beceri', ekurs_level($relative, $title));
    if (str_contains($relative, 'matematik')) $keywords[] = 'matematik';
    if (str_contains($relative, 'turkce')) $keywords[] = 'Türkçe';
    if (str_contains($relative, 'hayat-bilgisi')) $keywords[] = 'Hayat Bilgisi';
    return implode(', ', array_values(array_unique($keywords)));
}

function ekurs_seo_block(string $relative, string $html): string
{
    preg_match('~<title[^>]*>(.*?)</title>~is', $html, $titleMatch);
    preg_match('~<meta\s+name=["\']description["\'][^>]*content=["\']([^"\']*)["\'][^>]*>~i', $html, $descriptionMatch);
    preg_match('~<h1[^>]*>(.*?)</h1>~is', $html, $h1Match);

    $oldTitle = ekurs_text($titleMatch[1] ?? '');
    $oldDescription = ekurs_text($descriptionMatch[1] ?? '');
    $h1 = ekurs_text($h1Match[1] ?? '');
    $title = $relative === 'index.html' ? 'e-kurs.com | Yapay Zeka Destekli K-12 Öğrenme Yönetim Sistemi' : ekurs_limit($oldTitle ?: (($h1 ?: 'K-12 Öğrenme') . ' | e-kurs.com'), 60);
    $description = ekurs_limit($oldDescription ?: (($h1 ?: 'e-kurs.com') . ' için MEB uyumlu, yapay zeka destekli K-12 öğrenme içerikleri, mikro beceriler ve soru bankaları.'), 160);
    $url = ekurs_canonical($relative);
    $image = 'https://e-kurs.com/og-image.webp';
    $schema = json_encode(ekurs_schema($relative, $title, $description, $url), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
    $e = static fn(string $v): string => htmlspecialchars($v, ENT_QUOTES, 'UTF-8');

    return implode("\n", [
        '  <title>' . $e($title) . '</title>',
        '  <meta name="description" content="' . $e($description) . '">',
        '  <meta name="keywords" content="' . $e(ekurs_keywords($relative, $title)) . '">',
        '  <link rel="canonical" href="' . $e($url) . '">',
        '  <meta property="og:type" content="website">',
        '  <meta property="og:site_name" content="e-kurs.com">',
        '  <meta property="og:locale" content="tr_TR">',
        '  <meta property="og:title" content="' . $e($title) . '">',
        '  <meta property="og:description" content="' . $e($description) . '">',
        '  <meta property="og:url" content="' . $e($url) . '">',
        '  <meta property="og:image" content="' . $e($image) . '">',
        '  <meta name="twitter:card" content="summary_large_image">',
        '  <meta name="twitter:title" content="' . $e($title) . '">',
        '  <meta name="twitter:description" content="' . $e($description) . '">',
        '  <meta name="twitter:image" content="' . $e($image) . '">',
        '  <script type="application/ld+json">' . $schema . '</script>',
    ]);
}

function ekurs_update_html(string $root, string $file): void
{
    global $assetVersion;
    $relative = ekurs_relative($root, $file);
    $html = file_get_contents($file);
    if ($html === false || !str_contains($html, '<head')) return;

    $patterns = [
        '~\s*<title[^>]*>.*?</title>\s*~is',
        '~\s*<meta\s+name=["\']description["\'][^>]*>\s*~i',
        '~\s*<meta\s+name=["\']keywords["\'][^>]*>\s*~i',
        '~\s*<link\s+rel=["\']canonical["\'][^>]*>\s*~i',
        '~\s*<meta\s+property=["\']og:[^>]+>\s*~i',
        '~\s*<meta\s+name=["\']twitter:[^>]+>\s*~i',
        '~\s*<script\s+type=["\']application/ld\+json["\'][\s\S]*?</script>\s*~i',
        '~\s*<script\s+src=["\']/js/seo-audit\.js(?:\?[^"\']*)?["\'][^>]*></script>\s*~i',
    ];
    foreach ($patterns as $pattern) $html = preg_replace($pattern, "\n", $html) ?? $html;

    $block = ekurs_seo_block($relative, $html);
    if (preg_match('~<meta\s+name=["\']viewport["\'][^>]*>~i', $html, $viewport)) {
        $html = str_replace($viewport[0], $viewport[0] . "\n" . $block, $html);
    } else {
        $html = preg_replace('~<head>~i', "<head>\n" . $block, $html, 1) ?? $html;
    }
    $html = preg_replace('~</head>~i', "  <script src=\"/js/seo-audit.js?v={$assetVersion}\" defer></script>\n</head>", $html, 1) ?? $html;
    file_put_contents($file, $html);
}

$iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($root, FilesystemIterator::SKIP_DOTS));
$urls = [];
foreach ($iterator as $file) {
    if (!$file->isFile() || strtolower($file->getExtension()) !== 'html') continue;
    $path = $file->getPathname();
    ekurs_update_html($root, $path);
    $relative = ekurs_relative($root, $path);
    $isCore = preg_match('#^(siniflar|dersler|testler)/#', $relative);
    $urls[] = ['loc'=>ekurs_canonical($relative), 'priority'=>$relative === 'index.html' ? '1.00' : ($isCore ? '0.80' : '0.60'), 'changefreq'=>$relative === 'index.html' ? 'daily' : ($isCore ? 'weekly' : 'monthly')];
}

usort($urls, static fn(array $a, array $b): int => strcmp($a['loc'], $b['loc']));
$today = date('Y-m-d');
$xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n";
foreach ($urls as $url) {
    $xml .= "  <url>\n    <loc>{$url['loc']}</loc>\n    <lastmod>{$today}</lastmod>\n    <changefreq>{$url['changefreq']}</changefreq>\n    <priority>{$url['priority']}</priority>\n  </url>\n";
}
$xml .= "</urlset>\n";
file_put_contents($root . DIRECTORY_SEPARATOR . 'sitemap.xml', $xml);
echo 'SEO metadata injected for ' . count($urls) . " HTML files.\n";
