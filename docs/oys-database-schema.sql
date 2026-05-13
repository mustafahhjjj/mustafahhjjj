-- e-kurs.com OYS database schema draft
-- Relational store: PostgreSQL/MySQL compatible baseline.
-- Stream events must not be written here; use MongoDB/Redis streams for second-level logs.

CREATE TABLE schools (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(180) NOT NULL,
  city VARCHAR(80),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE teachers (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  school_id BIGINT NOT NULL REFERENCES schools(id),
  full_name VARCHAR(140) NOT NULL,
  email VARCHAR(180) NOT NULL UNIQUE,
  role VARCHAR(40) NOT NULL DEFAULT 'teacher',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE classes (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  school_id BIGINT NOT NULL REFERENCES schools(id),
  teacher_id BIGINT NOT NULL REFERENCES teachers(id),
  name VARCHAR(80) NOT NULL,
  grade_level SMALLINT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE students (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  school_id BIGINT NOT NULL REFERENCES schools(id),
  class_id BIGINT NOT NULL REFERENCES classes(id),
  full_name VARCHAR(140) NOT NULL,
  guardian_email VARCHAR(180),
  guardian_phone VARCHAR(40),
  status VARCHAR(30) NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE skills (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  code VARCHAR(40) NOT NULL UNIQUE,
  subject VARCHAR(80) NOT NULL,
  grade_level SMALLINT NOT NULL,
  title VARCHAR(220) NOT NULL,
  parent_code VARCHAR(40),
  mastery_target SMALLINT NOT NULL DEFAULT 100
);

CREATE TABLE assignments (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  teacher_id BIGINT NOT NULL REFERENCES teachers(id),
  class_id BIGINT REFERENCES classes(id),
  skill_id BIGINT NOT NULL REFERENCES skills(id),
  title VARCHAR(220) NOT NULL,
  target_type VARCHAR(30) NOT NULL, -- student | group | class
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
  skill_id BIGINT NOT NULL REFERENCES skills(id),
  smart_score SMALLINT NOT NULL DEFAULT 0,
  accuracy_percent NUMERIC(5,2) NOT NULL DEFAULT 0,
  active_seconds INTEGER NOT NULL DEFAULT 0,
  screen_seconds INTEGER NOT NULL DEFAULT 0,
  last_practiced_at TIMESTAMP,
  mastery_reached_at TIMESTAMP,
  PRIMARY KEY (student_id, skill_id)
);

CREATE TABLE certificates (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  student_id BIGINT NOT NULL REFERENCES students(id),
  teacher_id BIGINT NOT NULL REFERENCES teachers(id),
  skill_id BIGINT NOT NULL REFERENCES skills(id),
  certificate_url TEXT,
  issued_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
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
CREATE INDEX idx_skills_grade_subject ON skills(grade_level, subject);
CREATE INDEX idx_progress_skill ON student_skill_progress(skill_id, smart_score);
CREATE INDEX idx_cached_reports_scope ON cached_reports(scope_type, scope_id, report_type);

-- Stream store example document shape for MongoDB/Redis Streams:
-- {
--   type: 'student_answered', schoolId, classId, studentId, skillCode,
--   questionId, questionNo, answer, isCorrect, difficulty,
--   thinkingSeconds, activeSeconds, screenSeconds, smartScore,
--   mistakePattern, createdAt
-- }
