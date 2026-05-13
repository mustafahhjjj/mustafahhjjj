CREATE TABLE IF NOT EXISTS ekurs_student_xp_events (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  student_id BIGINT UNSIGNED NOT NULL,
  event_type VARCHAR(64) NOT NULL,
  subject_slug VARCHAR(128) NULL,
  skill_slug VARCHAR(128) NULL,
  xp INT UNSIGNED NOT NULL DEFAULT 0,
  metadata JSON NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_student_created (student_id, created_at),
  INDEX idx_student_skill (student_id, skill_slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS ekurs_student_badges (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  student_id BIGINT UNSIGNED NOT NULL,
  badge_slug VARCHAR(128) NOT NULL,
  badge_name VARCHAR(160) NOT NULL,
  threshold_xp INT UNSIGNED NOT NULL,
  unlocked_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_student_badge (student_id, badge_slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS ekurs_diagnostic_events (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  student_id BIGINT UNSIGNED NOT NULL,
  quiz_id BIGINT UNSIGNED NULL,
  question_id BIGINT UNSIGNED NULL,
  subject_slug VARCHAR(128) NOT NULL,
  skill_slug VARCHAR(128) NOT NULL,
  is_correct TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_diagnostic_skill (student_id, subject_slug, skill_slug, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS ekurs_diagnostic_recommendations (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  student_id BIGINT UNSIGNED NOT NULL,
  subject_slug VARCHAR(128) NOT NULL,
  skill_slug VARCHAR(128) NOT NULL,
  recommendation_text VARCHAR(500) NOT NULL,
  status ENUM('new','seen','completed') NOT NULL DEFAULT 'new',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL,
  INDEX idx_recommendation_status (student_id, status, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
