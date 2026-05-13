<?php
declare(strict_types=1);

$root = rtrim($argv[1] ?? dirname(__DIR__), DIRECTORY_SEPARATOR);
$assetVersion = '20260513-2sinif-math-links';

$skipAudit = [
    'index.html',
    'dersler/matematik.html',
    'siniflar/1-sinif/turkce.html',
    'siniflar/1-sinif/turkce/index.html',
    'siniflar/1-sinif/turkce/konu.html',
    'siniflar/1-sinif/turkce/test.html',
    'siniflar/1-sinif/turkce/okudugunu-anlama.html',
    'siniflar/1-sinif/turkce/okudugunu-anlama-test.html',
    'siniflar/2-sinif/matematik.html',
    'siniflar/2-sinif/matematik/index.html',
    'siniflar/2-sinif/matematik/dogal-sayilar-test.html',
];

function ekurs_relative(string $root, string $file): string
{
    return str_replace(DIRECTORY_SEPARATOR, '/', substr($file, strlen($root) + 1));
}

function ekurs_remove_audit(string $html): string
{
    while (($needle = strpos($html, '/js/seo-audit.js')) !== false) {
        $before = substr($html, 0, $needle);
        $start = strripos($before, '<script');
        $end = stripos($html, '</script>', $needle);
        if ($start === false || $end === false) {
            break;
        }
        $html = substr($html, 0, $start) . PHP_EOL . substr($html, $end + 9);
    }
    return $html;
}

function ekurs_inject_audit(string $html, string $assetVersion): string
{
    $headEnd = stripos($html, '</head>');
    if ($headEnd === false) {
        return $html;
    }
    $quote = chr(39);
    $audit = '  <script src=' . $quote . '/js/seo-audit.js?v=' . $assetVersion . $quote . ' defer></script>' . PHP_EOL;
    return substr($html, 0, $headEnd) . $audit . substr($html, $headEnd);
}

$iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($root, FilesystemIterator::SKIP_DOTS));
$count = 0;
foreach ($iterator as $file) {
    if (!$file->isFile() || strtolower($file->getExtension()) !== 'html') {
        continue;
    }
    $path = $file->getPathname();
    $html = file_get_contents($path);
    if ($html === false || !str_contains($html, '<head')) {
        continue;
    }
    $relative = ekurs_relative($root, $path);
    $html = ekurs_remove_audit($html);
    if (!in_array($relative, $skipAudit, true)) {
        $html = ekurs_inject_audit($html, $assetVersion);
    }
    file_put_contents($path, $html);
    $count++;
}

echo 'Static SEO audit refreshed for ' . $count . ' HTML files.' . PHP_EOL;
