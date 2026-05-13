<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

function ekurs_json(array $payload, int $status = 200): void {
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function ekurs_pdo(): ?PDO {
    $host = getenv('EKURS_DB_HOST');
    $name = getenv('EKURS_DB_NAME');
    $user = getenv('EKURS_DB_USER');
    $pass = getenv('EKURS_DB_PASS');
    if (!$host || !$name || !$user) {
        return null;
    }
    return new PDO(
        "mysql:host={$host};dbname={$name};charset=utf8mb4",
        $user,
        (string) $pass,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]
    );
}

function ekurs_award_xp(PDO $pdo, int $studentId, string $eventType, array $payload): int {
    $xpMap = [
        'video_watched' => 10,
        'topic_completed' => 35,
        'test_passed' => 60,
        'diagnostic_review' => 20,
    ];
    $xp = $xpMap[$eventType] ?? 5;
    $stmt = $pdo->prepare(
        'INSERT INTO ekurs_student_xp_events (student_id, event_type, subject_slug, skill_slug, xp, metadata)
         VALUES (:student_id, :event_type, :subject_slug, :skill_slug, :xp, :metadata)'
    );
    $stmt->execute([
        ':student_id' => $studentId,
        ':event_type' => $eventType,
        ':subject_slug' => $payload['subject_slug'] ?? null,
        ':skill_slug' => $payload['skill_slug'] ?? null,
        ':xp' => $xp,
        ':metadata' => json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
    ]);
    ekurs_unlock_badges($pdo, $studentId);
    return $xp;
}

function ekurs_total_xp(PDO $pdo, int $studentId): int {
    $stmt = $pdo->prepare('SELECT COALESCE(SUM(xp), 0) AS total_xp FROM ekurs_student_xp_events WHERE student_id = :student_id');
    $stmt->execute([':student_id' => $studentId]);
    return (int) $stmt->fetchColumn();
}

function ekurs_unlock_badges(PDO $pdo, int $studentId): void {
    $total = ekurs_total_xp($pdo, $studentId);
    $badges = [
        ['matematik-kasifi', 'Matematik Kaşifi', 250],
        ['hizli-cozucu', 'Hızlı Çözücü', 500],
        ['konu-ustasi', 'Konu Ustası', 1000],
    ];
    $stmt = $pdo->prepare(
        'INSERT IGNORE INTO ekurs_student_badges (student_id, badge_slug, badge_name, threshold_xp)
         VALUES (:student_id, :badge_slug, :badge_name, :threshold_xp)'
    );
    foreach ($badges as $badge) {
        if ($total >= $badge[2]) {
            $stmt->execute([
                ':student_id' => $studentId,
                ':badge_slug' => $badge[0],
                ':badge_name' => $badge[1],
                ':threshold_xp' => $badge[2],
            ]);
        }
    }
}

function ekurs_record_diagnostic(PDO $pdo, int $studentId, array $payload): ?string {
    $stmt = $pdo->prepare(
        'INSERT INTO ekurs_diagnostic_events (student_id, quiz_id, question_id, subject_slug, skill_slug, is_correct)
         VALUES (:student_id, :quiz_id, :question_id, :subject_slug, :skill_slug, :is_correct)'
    );
    $stmt->execute([
        ':student_id' => $studentId,
        ':quiz_id' => $payload['quiz_id'] ?? null,
        ':question_id' => $payload['question_id'] ?? null,
        ':subject_slug' => $payload['subject_slug'] ?? 'matematik',
        ':skill_slug' => $payload['skill_slug'] ?? 'uslu-sayilar',
        ':is_correct' => !empty($payload['is_correct']) ? 1 : 0,
    ]);
    if (!empty($payload['is_correct'])) {
        return null;
    }
    $check = $pdo->prepare(
        'SELECT COUNT(*) FROM ekurs_diagnostic_events
         WHERE student_id = :student_id AND skill_slug = :skill_slug AND is_correct = 0
         AND created_at >= DATE_SUB(NOW(), INTERVAL 14 DAY)'
    );
    $skill = $payload['skill_slug'] ?? 'uslu-sayilar';
    $check->execute([':student_id' => $studentId, ':skill_slug' => $skill]);
    if ((int) $check->fetchColumn() < 3) {
        return null;
    }
    $label = $payload['skill_label'] ?? 'Üslü sayılar';
    $message = $label . ' konusunda biraz takılmış gibisin, sana özel hazırladığım 5 soruluk tekrar testini çözelim mi?';
    $insert = $pdo->prepare(
        'INSERT INTO ekurs_diagnostic_recommendations (student_id, subject_slug, skill_slug, recommendation_text)
         VALUES (:student_id, :subject_slug, :skill_slug, :recommendation_text)'
    );
    $insert->execute([
        ':student_id' => $studentId,
        ':subject_slug' => $payload['subject_slug'] ?? 'matematik',
        ':skill_slug' => $skill,
        ':recommendation_text' => $message,
    ]);
    return $message;
}

$action = $_GET['action'] ?? 'dashboard';
$input = json_decode(file_get_contents('php://input') ?: '[]', true) ?: [];
$studentId = (int) ($input['student_id'] ?? $_GET['student_id'] ?? 1);

try {
    $pdo = ekurs_pdo();
    if (!$pdo) {
        ekurs_json([
            'mode' => 'fallback',
            'message' => 'Veritabanı ortam değişkenleri tanımlı değil; frontend örnek veriyle çalışıyor.',
        ]);
    }
    if ($action === 'event') {
        $event = (string) ($input['event'] ?? 'activity');
        $xp = ekurs_award_xp($pdo, $studentId, $event, $input);
        ekurs_json(['ok' => true, 'awarded_xp' => $xp, 'total_xp' => ekurs_total_xp($pdo, $studentId)]);
    }
    if ($action === 'diagnostic') {
        $message = ekurs_record_diagnostic($pdo, $studentId, $input);
        ekurs_json(['ok' => true, 'recommendation' => $message]);
    }
    ekurs_json(['ok' => true, 'total_xp' => ekurs_total_xp($pdo, $studentId)]);
} catch (Throwable $error) {
    ekurs_json(['ok' => false, 'error' => $error->getMessage()], 500);
}
