-- e-kurs.com OYS database schema draft
-- Relational store: PostgreSQL/MySQL compatible baseline.
-- Second-level telemetry and click streams must be stored in MongoDB/Redis Streams, not in the relational transaction store.

CREATE TABLE organizations (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(180) NOT NULL,
  total_licenses INTEGER NOT NULL DEFAULT 0,
  used_licenses INTEGER NOT NULL DEFAULT 0,
  e_okul_sync_status BOOLEAN NOT NULL DEFAULT FALSE,
  whatsapp_provider VARCHAR(40), -- meta | twilio | messagebird
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE schools (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  organization_id BIGINT REFERENCES organizations(id),
  name VARCHAR(180) NOT NULL,
  city VARCHAR(80),
  district VARCHAR(80),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE teachers (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  school_id BIGINT NOT NULL REFERENCES schools(id),
  full_name VARCHAR(140) NOT NULL,
  email VARCHAR(180) NOT NULL UNIQUE,
  role VARCHAR(40) NOT NULL DEFAULT 'teacher', -- teacher | counselor | admin | principal
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE classes (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  school_id BIGINT NOT NULL REFERENCES schools(id),
  teacher_id BIGINT NOT NULL REFERENCES teachers(id),
  name VARCHAR(80) NOT NULL,
  grade_level SMALLINT NOT NULL,
  branch VARCHAR(20),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE students (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  school_id BIGINT NOT NULL REFERENCES schools(id),
  class_id BIGINT NOT NULL REFERENCES classes(id),
  student_no VARCHAR(40),
  first_name VARCHAR(80) NOT NULL,
  last_name VARCHAR(80) NOT NULL,
  full_name VARCHAR(180) NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE parents (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  full_name VARCHAR(140),
  email VARCHAR(180),
  phone VARCHAR(40),
  whatsapp_opt_in BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE student_parent_links (
  student_id BIGINT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  parent_id BIGINT NOT NULL REFERENCES parents(id) ON DELETE CASCADE,
  relation_type VARCHAR(30) NOT NULL DEFAULT 'guardian',
  PRIMARY KEY (student_id, parent_id)
);

CREATE TABLE student_login_cards (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  student_id BIGINT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  login_mode VARCHAR(40) NOT NULL, -- qr | picture_password | qr_and_picture_password
  qr_token_hash VARCHAR(180),
  picture_password_hash VARCHAR(180),
  expires_at TIMESTAMP,
  printed_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE curriculum_skills (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  meb_code VARCHAR(40) NOT NULL UNIQUE,
  subject VARCHAR(80) NOT NULL,
  grade_level SMALLINT NOT NULL,
  domain VARCHAR(120),
  unit VARCHAR(160),
  topic VARCHAR(180),
  title VARCHAR(220) NOT NULL,
  parent_meb_code VARCHAR(40),
  is_new_generation BOOLEAN NOT NULL DEFAULT FALSE,
  mastery_target SMALLINT NOT NULL DEFAULT 100
);

-- Backward-compatible alias for older docs/code that use `skills`.
CREATE VIEW skills AS
SELECT id, meb_code AS code, subject, grade_level, title, parent_meb_code AS parent_code, mastery_target
FROM curriculum_skills;

CREATE TABLE questions (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  skill_id BIGINT NOT NULL REFERENCES curriculum_skills(id),
  prompt TEXT NOT NULL,
  difficulty NUMERIC(4,2) NOT NULL DEFAULT 0.50,
  is_new_generation BOOLEAN NOT NULL DEFAULT FALSE,
  cognitive_tags TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE question_choices (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  question_id BIGINT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  choice_key VARCHAR(4) NOT NULL,
  body TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL DEFAULT FALSE,
  cognitive_tag VARCHAR(120)
);

CREATE TABLE assignments (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  teacher_id BIGINT NOT NULL REFERENCES teachers(id),
  class_id BIGINT REFERENCES classes(id),
  skill_id BIGINT NOT NULL REFERENCES curriculum_skills(id),
  title VARCHAR(220) NOT NULL,
  target_type VARCHAR(30) NOT NULL, -- student | group | class
  difficulty VARCHAR(30) NOT NULL DEFAULT 'adaptive',
  question_count INTEGER NOT NULL DEFAULT 10,
  due_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE assignment_targets (
  assignment_id BIGINT NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
  student_id BIGINT NOT NULL REFERENCES students(id),
  PRIMARY KEY (assignment_id, student_id)
);

CREATE TABLE student_skill_progress (
  student_id BIGINT NOT NULL REFERENCES students(id),
  skill_id BIGINT NOT NULL REFERENCES curriculum_skills(id),
  smart_score SMALLINT NOT NULL DEFAULT 0,
  is_mastered BOOLEAN NOT NULL DEFAULT FALSE,
  accuracy_percent NUMERIC(5,2) NOT NULL DEFAULT 0,
  active_seconds INTEGER NOT NULL DEFAULT 0,
  screen_seconds INTEGER NOT NULL DEFAULT 0,
  estimated_grade_level NUMERIC(4,2),
  last_practiced_at TIMESTAMP,
  mastery_reached_at TIMESTAMP,
  PRIMARY KEY (student_id, skill_id)
);

CREATE TABLE textbook_maps (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  skill_id BIGINT NOT NULL REFERENCES curriculum_skills(id),
  publisher VARCHAR(120) NOT NULL,
  book_name VARCHAR(180),
  grade_level SMALLINT NOT NULL,
  subject VARCHAR(80) NOT NULL,
  unit VARCHAR(160),
  page_start INTEGER,
  page_end INTEGER,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE award_rules (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(140) NOT NULL,
  condition_type VARCHAR(60) NOT NULL, -- skill_mastery | question_count | streak | weekly_growth
  skill_id BIGINT REFERENCES curriculum_skills(id),
  threshold INTEGER NOT NULL,
  visibility VARCHAR(40) NOT NULL DEFAULT 'student_and_teacher',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE student_awards (
  student_id BIGINT NOT NULL REFERENCES students(id),
  award_rule_id BIGINT NOT NULL REFERENCES award_rules(id),
  earned_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (student_id, award_rule_id)
);

CREATE TABLE certificates (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  student_id BIGINT NOT NULL REFERENCES students(id),
  teacher_id BIGINT NOT NULL REFERENCES teachers(id),
  skill_id BIGINT REFERENCES curriculum_skills(id),
  certificate_url TEXT,
  issued_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE leaderboard_settings (
  class_id BIGINT PRIMARY KEY REFERENCES classes(id),
  student_visible BOOLEAN NOT NULL DEFAULT FALSE,
  teacher_visible BOOLEAN NOT NULL DEFAULT TRUE,
  sort_by VARCHAR(40) NOT NULL DEFAULT 'weekly_growth',
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notification_jobs (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  job_type VARCHAR(60) NOT NULL, -- weekly_parent_whatsapp | monday_admin_pdf | pdr_alert
  scope_type VARCHAR(30) NOT NULL, -- school | class | student
  scope_id BIGINT NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'queued',
  provider VARCHAR(40),
  payload_json TEXT NOT NULL,
  scheduled_at TIMESTAMP NOT NULL,
  sent_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cached_reports (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  scope_type VARCHAR(30) NOT NULL, -- school | class | student
  scope_id BIGINT NOT NULL,
  report_type VARCHAR(60) NOT NULL,
  payload_json TEXT NOT NULL,
  generated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NOT NULL
);

CREATE INDEX idx_students_class ON students(class_id);
CREATE INDEX idx_curriculum_grade_subject ON curriculum_skills(grade_level, subject);
CREATE INDEX idx_curriculum_meb_code ON curriculum_skills(meb_code);
CREATE INDEX idx_questions_skill ON questions(skill_id, difficulty);
CREATE INDEX idx_progress_skill ON student_skill_progress(skill_id, smart_score);
CREATE INDEX idx_progress_student ON student_skill_progress(student_id, is_mastered);
CREATE INDEX idx_cached_reports_scope ON cached_reports(scope_type, scope_id, report_type);
CREATE INDEX idx_notification_jobs_status ON notification_jobs(status, scheduled_at);

-- MongoDB / Redis Streams: StudentTelemetry document shape
-- {
--   type: 'student_answered',
--   student_id: 'uuid',
--   question_id: 'uuid',
--   school_id: 'uuid',
--   class_id: 'uuid',
--   skill_code: 'M.8.1.2.1',
--   time_spent_seconds: 42,
--   click_count: 5,
--   answer_changes: 2,
--   is_correct: false,
--   difficulty: 0.62,
--   smart_score: 58,
--   cognitive_tag: 'place_value_borrowing_error',
--   frustration_status: 'frustrated',
--   created_at: '2026-05-13T13:00:00+03:00'
-- }

-- MongoDB / Redis Streams: PDR alert document shape
-- {
--   type: 'pdr_alert',
--   student_id: 'uuid',
--   class_id: 'uuid',
--   reason: 'frustration_threshold_exceeded',
--   severity: 'high',
--   teacher_seen_at: null,
--   counselor_seen_at: null,
--   created_at: '2026-05-13T13:00:00+03:00'
-- }
