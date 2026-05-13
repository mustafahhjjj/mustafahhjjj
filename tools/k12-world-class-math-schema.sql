CREATE TABLE IF NOT EXISTS ekurs_math_units (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  grade_level VARCHAR(32) NOT NULL,
  unit_code VARCHAR(32) NOT NULL,
  unit_slug VARCHAR(128) NOT NULL,
  unit_name VARCHAR(220) NOT NULL,
  sort_order INT UNSIGNED NOT NULL DEFAULT 0,
  UNIQUE KEY uniq_math_unit (grade_level, unit_slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS ekurs_math_subtopics (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  unit_id BIGINT UNSIGNED NOT NULL,
  subtopic_code VARCHAR(32) NOT NULL,
  subtopic_slug VARCHAR(128) NOT NULL,
  subtopic_name VARCHAR(220) NOT NULL,
  sort_order INT UNSIGNED NOT NULL DEFAULT 0,
  INDEX idx_subtopic_unit (unit_id, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS ekurs_math_micro_outcomes (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  subtopic_id BIGINT UNSIGNED NOT NULL,
  outcome_code VARCHAR(32) NOT NULL,
  outcome_slug VARCHAR(160) NOT NULL,
  outcome_name VARCHAR(240) NOT NULL,
  difficulty_score DECIMAL(4,2) NOT NULL DEFAULT 1.00,
  popularity_score DECIMAL(5,2) NOT NULL DEFAULT 0.00,
  sample_question VARCHAR(500) NOT NULL,
  challenge_question VARCHAR(500) NULL,
  sort_order INT UNSIGNED NOT NULL DEFAULT 0,
  UNIQUE KEY uniq_outcome_code (outcome_code),
  INDEX idx_outcome_subtopic (subtopic_id, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS ekurs_user_progress (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  outcome_code VARCHAR(32) NOT NULL,
  smartscore DECIMAL(5,2) NOT NULL DEFAULT 0,
  challenge_zone TINYINT(1) NOT NULL DEFAULT 0,
  medal ENUM('none','bronze','silver','gold') NOT NULL DEFAULT 'none',
  mastered_at TIMESTAMP NULL DEFAULT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_user_outcome (user_id, outcome_code),
  INDEX idx_progress_user_score (user_id, smartscore, medal)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT IGNORE INTO ekurs_math_units (grade_level, unit_code, unit_slug, unit_name, sort_order) VALUES
  ('2-sinif', 'M.2.1', 'sayilar-ve-islemler', 'Sayılar ve İşlemler', 1),
  ('2-sinif', 'M.2.2', 'geometri-ve-olcme', 'Geometri ve Ölçme', 2);

INSERT IGNORE INTO ekurs_math_subtopics (unit_id, subtopic_code, subtopic_slug, subtopic_name, sort_order)
SELECT id, 'M.2.1.A', 'toplama-islemi', 'Toplama İşlemi', 1 FROM ekurs_math_units WHERE unit_code = 'M.2.1';

INSERT IGNORE INTO ekurs_math_micro_outcomes
  (subtopic_id, outcome_code, outcome_slug, outcome_name, difficulty_score, popularity_score, sample_question, challenge_question, sort_order)
SELECT s.id, 'M.2.1.1', '10un-katlarini-toplama', '10''un katlarını toplama', 1.20, 84.00,
  '30 + 40 işleminin sonucu kaçtır?', '70 + 20 + 10 işlemini zihinden çöz.', 1
FROM ekurs_math_subtopics s WHERE s.subtopic_code = 'M.2.1.A';

INSERT IGNORE INTO ekurs_math_micro_outcomes
  (subtopic_id, outcome_code, outcome_slug, outcome_name, difficulty_score, popularity_score, sample_question, challenge_question, sort_order)
SELECT s.id, 'M.2.1.2', 'iki-basamakli-eldesiz-toplama', 'İki basamaklı eldesiz toplama', 1.80, 79.00,
  '24 + 35 işleminin sonucu kaçtır?', '43 + 26 + 10 işlemini çöz.', 2
FROM ekurs_math_subtopics s WHERE s.subtopic_code = 'M.2.1.A';

INSERT IGNORE INTO ekurs_math_micro_outcomes
  (subtopic_id, outcome_code, outcome_slug, outcome_name, difficulty_score, popularity_score, sample_question, challenge_question, sort_order)
SELECT s.id, 'M.2.1.3', 'iki-basamakli-eldeli-toplama', 'İki basamaklı eldeli toplama', 2.60, 91.00,
  '36 + 27 işleminde sonuç kaçtır?', '48 + 37 + 16 işlemini dikkatlice çöz.', 3
FROM ekurs_math_subtopics s WHERE s.subtopic_code = 'M.2.1.A';
