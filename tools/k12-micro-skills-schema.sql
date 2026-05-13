CREATE TABLE IF NOT EXISTS ekurs_micro_skills (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  grade_level VARCHAR(32) NOT NULL,
  subject_slug VARCHAR(128) NOT NULL,
  unit_slug VARCHAR(128) NOT NULL,
  skill_slug VARCHAR(160) NOT NULL,
  skill_name VARCHAR(220) NOT NULL,
  prerequisite_skill_slug VARCHAR(160) NULL,
  difficulty TINYINT UNSIGNED NOT NULL DEFAULT 1,
  question_count INT UNSIGNED NOT NULL DEFAULT 10,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_micro_skill (grade_level, subject_slug, unit_slug, skill_slug),
  INDEX idx_micro_skill_lookup (subject_slug, unit_slug, difficulty)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS ekurs_smartscore_attempts (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  student_id BIGINT UNSIGNED NOT NULL,
  micro_skill_id BIGINT UNSIGNED NOT NULL,
  question_id BIGINT UNSIGNED NULL,
  is_correct TINYINT(1) NOT NULL DEFAULT 0,
  difficulty TINYINT UNSIGNED NOT NULL DEFAULT 1,
  response_time_seconds INT UNSIGNED NULL,
  score_before DECIMAL(5,2) NOT NULL DEFAULT 0,
  score_after DECIMAL(5,2) NOT NULL DEFAULT 0,
  feedback_json JSON NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_student_skill_score (student_id, micro_skill_id, created_at),
  INDEX idx_skill_correctness (micro_skill_id, is_correct, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS ekurs_teacher_trouble_spots (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  class_group_id BIGINT UNSIGNED NULL,
  grade_level VARCHAR(32) NOT NULL,
  subject_slug VARCHAR(128) NOT NULL,
  micro_skill_id BIGINT UNSIGNED NOT NULL,
  wrong_rate DECIMAL(5,2) NOT NULL DEFAULT 0,
  affected_student_count INT UNSIGNED NOT NULL DEFAULT 0,
  recommendation VARCHAR(500) NOT NULL,
  calculated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_trouble_lookup (grade_level, subject_slug, wrong_rate, calculated_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT IGNORE INTO ekurs_micro_skills
  (grade_level, subject_slug, unit_slug, skill_slug, skill_name, prerequisite_skill_slug, difficulty, question_count)
VALUES
  ('2-sinif', 'matematik', 'toplama-islemi', '10un-katlarini-toplama', '10''un katlarını toplama', NULL, 1, 10),
  ('2-sinif', 'matematik', 'toplama-islemi', 'iki-basamakli-eldesiz-toplama', 'İki basamaklı eldesiz toplama', '10un-katlarini-toplama', 2, 10),
  ('2-sinif', 'matematik', 'toplama-islemi', 'iki-basamakli-eldeli-toplama', 'İki basamaklı eldeli toplama', 'iki-basamakli-eldesiz-toplama', 3, 12),
  ('2-sinif', 'matematik', 'toplama-islemi', 'uc-terimli-toplama', 'Üç terimli toplama', 'iki-basamakli-eldeli-toplama', 4, 12),
  ('2-sinif', 'matematik', 'toplama-islemi', 'toplama-problemleri', 'Toplama işlemiyle problem çözme', 'uc-terimli-toplama', 4, 15);
