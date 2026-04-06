-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =========================
-- ENUM TYPES
-- =========================

CREATE TYPE user_role AS ENUM ('LEARNER','INSTRUCTOR','ADMIN');

CREATE TYPE user_status AS ENUM ('ACTIVE','INACTIVE','SUSPENDED');

CREATE TYPE course_level AS ENUM ('BEGINNER','INTERMEDIATE','ADVANCED');

CREATE TYPE content_status AS ENUM ('DRAFT','PUBLISHED');

CREATE TYPE lesson_type AS ENUM ('TEXT','QUIZ');

CREATE TYPE subscription_status AS ENUM ('ACTIVE','EXPIRED','CANCELLED');

CREATE TYPE payment_status AS ENUM ('PENDING','COMPLETED','FAILED','REFUNDED');

CREATE TYPE refund_status AS ENUM ('PENDING','COMPLETED','FAILED');

-- Create enum for discount types
CREATE TYPE discount_type AS ENUM ('PERCENTAGE', 'FIXED_AMOUNT');

CREATE TYPE coupon_status AS ENUM ('ACTIVE', 'EXPIRED', 'DISABLED', 'DEPLETED');

CREATE TYPE access_course_type AS ENUM ('FREE','SUBSCRIPTION');
-- ========================
-- UTILITY: AUTO-UPDATE update_at
-- ========================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END; 
$$ LANGUAGE plpgsql;

-- =========================
-- USERS
-- =========================
CREATE TABLE users(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  image_url TEXT,
  password VARCHAR(255) NOT NULL,
  role user_role DEFAULT 'LEARNER',
  status user_status DEFAULT 'ACTIVE',
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER trg_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

-- =========================
-- USER PROFILES
-- =========================
CREATE TABLE user_profiles (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  headline     VARCHAR(255),
  bio          TEXT,
  website_url  TEXT,
  twitter_url  TEXT,
  linkedin_url TEXT,
  youtube_url  TEXT,
  created_at   TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER trg_user_profiles_updated_at
BEFORE UPDATE ON user_profiles
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TABLE password_reset_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  code VARCHAR(6) NOT NULL,
  attempts INTEGER DEFAULT 0,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER trg_password_reset_codes_updated_at
BEFORE UPDATE ON password_reset_codes
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();
-- ========================
-- CATEGORIES
-- =========================
CREATE TABLE categories(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER trg_categories_updated_at
BEFORE UPDATE ON categories
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

-- =========================
-- COURSES
-- =========================
  CREATE TABLE courses(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    instructor_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    name VARCHAR(255) NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    status content_status DEFAULT 'DRAFT' NOT NULL,
    level course_level DEFAULT 'BEGINNER' NOT NULL,
    access_type access_course_type DEFAULT 'FREE',
    position INTEGER,
    deleted_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );

CREATE TRIGGER trg_courses_updated_at
BEFORE UPDATE ON courses
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

-- =========================
-- COURSE OBJECTIVES
-- =========================
CREATE TABLE course_objectives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL 
  REFERENCES courses(id) ON DELETE CASCADE,
  content TEXT NOT NULL, -- the objective text
  position INTEGER DEFAULT 1, -- ordering
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

create TRIGGER trg_course_objectives_updated_at
BEFORE UPDATE ON course_objectives
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();
-- =========================
-- MODULES
-- =========================

CREATE TABLE modules(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  position INTEGER ,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon_name VARCHAR(255),
  status content_status DEFAULT 'DRAFT' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_modules_course ON modules(course_id);
CREATE TRIGGER trg_modules_updated_at
BEFORE UPDATE ON modules
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

-- =========================
-- CHAPTERS
-- =========================

CREATE TABLE chapters(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  position INTEGER ,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status content_status DEFAULT 'DRAFT' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_chapters_module ON chapters(module_id);
CREATE TRIGGER trg_chapters_updated_at
BEFORE UPDATE ON chapters
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

-- =========================
-- LESSONS
-- =========================

CREATE TABLE lessons(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id UUID NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
  position INTEGER ,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  type lesson_type NOT NULL,
  status content_status DEFAULT 'DRAFT' NOT NULL,
  xp_points INTEGER DEFAULT 5 CHECK (xp_points >= 0),
  duration_minutes INTEGER CHECK (duration_minutes >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_lessons_chapter ON lessons(chapter_id);
CREATE TRIGGER trg_lessons_updated_at
BEFORE UPDATE ON lessons
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- =========================
-- LESSON LINKS
-- =========================

CREATE TABLE lesson_content(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  position INTEGER,
  name VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_lesson_content_lesson ON lesson_content(lesson_id);
CREATE TRIGGER trg_lesson_content_updated_at
BEFORE UPDATE ON lesson_content
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- =========================
-- QUIZZES
-- =========================

CREATE TABLE quizzes(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID UNIQUE NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  explanation TEXT,
  position INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_quizzes_lesson ON quizzes(lesson_id);

CREATE TRIGGER trg_quizzes_updated_at
BEFORE UPDATE ON quizzes
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- =========================
-- QUIZ OPTIONS
-- =========================

CREATE TABLE quiz_options(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT FALSE,
  position INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  quiz_id UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  score INTEGER DEFAULT 0,
  passed BOOLEAN DEFAULT FALSE,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER trg_quiz_attempts_updated_at
BEFORE UPDATE ON quiz_attempts
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE quiz_attempt_answers(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id UUID NOT NULL REFERENCES quiz_attempts(id) ON DELETE CASCADE,
  quiz_id UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  selected_option_id UUID NOT NULL REFERENCES quiz_options(id) ON DELETE CASCADE,
  is_correct BOOLEAN DEFAULT FALSE,
  answered_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_quiz_attempt_answers_attempt ON quiz_attempt_answers(attempt_id);
CREATE INDEX idx_quiz_attempt_answers_quiz ON quiz_attempt_answers(quiz_id);

-- =========================
-- ENROLLMENTS
-- =========================

CREATE TABLE enrollments(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  access_type access_course_type DEFAULT 'FREE',
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, 
  expires_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_user_course UNIQUE(user_id, course_id)
);

CREATE INDEX idx_enrollments_user ON enrollments(user_id);
CREATE INDEX idx_enrollments_course ON enrollments(course_id);

CREATE TRIGGER trg_enrollments_updated_at
BEFORE UPDATE ON enrollments
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- =========================
-- SUBSCRIPTION PLANS
-- =========================
CREATE TABLE subscription_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL, -- STANDARD, PREMIUM, etc.
  duration_name VARCHAR(20) NOT NULL, -- MONTHLY, YEARLY
  duration_days INT NOT NULL, -- 30, 365, etc.
  price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_plan_duration UNIQUE(name, duration_days)
);

CREATE TRIGGER trg_subscription_plans_updated_at
BEFORE UPDATE ON subscription_plans
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- =========================
-- USER SUBSCRIPTIONS
-- =========================
CREATE TABLE user_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES subscription_plans(id) ON DELETE CASCADE,
  start_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status subscription_status DEFAULT 'ACTIVE',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Only ONE active subscription per user
CREATE UNIQUE INDEX one_active_subscription_per_user
ON user_subscriptions(user_id)
WHERE status = 'ACTIVE';

CREATE INDEX idx_user_subscriptions_user 
ON user_subscriptions(user_id);

CREATE TRIGGER trg_user_subscriptions_updated_at
BEFORE UPDATE ON user_subscriptions
FOR EACH ROW EXECUTE FUNCTION set_updated_at();
-- ========================
-- SUBSCRIPTION PAYMENTS
-- =========================

CREATE TABLE subscription_payments(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_subscription_id UUID NOT NULL REFERENCES user_subscriptions(id) ON DELETE CASCADE,
  amount NUMERIC(10,2) NOT NULL CHECK (amount >= 0),
  payment_status payment_status DEFAULT 'PENDING',
  stripe_payment_intent_id TEXT UNIQUE,
  stripe_invoice_id TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_subscription_payment_user_subscription ON subscription_payments(user_subscription_id);

CREATE TRIGGER trg_subscription_payments_updated_at
BEFORE UPDATE ON subscription_payments
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ========================
-- SUBSCRIPTION REFUND PAYMENTS
-- ========================
CREATE TABLE subscription_refunds(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_subscription_id UUID NOT NULL REFERENCES user_subscriptions(id) ON DELETE CASCADE,
  amount NUMERIC(10,2) NOT NULL CHECK (amount >= 0),
  confirm BOOLEAN DEFAULT FALSE,
  refund_status refund_status DEFAULT 'PENDING',
  stripe_refund_id TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_subscription_refund_user_subscription ON subscription_refunds(user_subscription_id);

CREATE TRIGGER trg_subscription_refunds_updated_at
BEFORE UPDATE ON subscription_refunds
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ========================
-- COUPONS
-- ========================
CREATE TABLE coupons(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  code VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  discount_type discount_type NOT NULL,
  discount_value NUMERIC(10,2) NOT NULL CHECK(discount_value > 0),
  max_uses INTEGER,
  per_user_limit INTEGER DEFAULT 1,
  times_used INTEGER DEFAULT 0,
  first_time_only BOOLEAN DEFAULT FALSE,
  apply_to_all_subscriptions BOOLEAN DEFAULT FALSE,
  status coupon_status DEFAULT 'ACTIVE',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL CHECK (expires_at >= created_at),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_coupons_code ON coupons(code);
CREATE INDEX idx_coupons_status ON coupons(status);

CREATE TRIGGER trg_coupons_updated_at
BEFORE UPDATE ON coupons
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ========================
-- COUPON TARGETS
-- ========================

CREATE TABLE coupon_targets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coupon_id UUID UNIQUE NOT NULL REFERENCES coupons(id) ON DELETE CASCADE,
  target_id UUID REFERENCES subscription_plans(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_coupon_targets_coupon ON coupon_targets(coupon_id);
CREATE INDEX idx_coupon_targets_lookup ON coupon_targets(target_id);

-- ========================
-- COUPON REDEMPTIONS
-- ========================

CREATE TABLE coupon_redemptions(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coupon_id UUID NOT NULL REFERENCES coupons(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  redeemed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_user_coupon UNIQUE(user_id, coupon_id)
);

CREATE INDEX idx_coupon_redemption_coupon ON coupon_redemptions(coupon_id);
CREATE INDEX idx_coupon_redemption_user ON coupon_redemptions(user_id);

-- =========================
-- COURSE REVIEWS
-- =========================

CREATE TABLE course_reviews(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  helpful_count INTEGER DEFAULT 0,
  review TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_user_review UNIQUE(user_id, course_id)
);

CREATE INDEX idx_course_reviews_course ON course_reviews(course_id);
CREATE INDEX idx_course_reviews_user ON course_reviews(user_id);

CREATE TRIGGER trg_course_reviews_updated_at
  BEFORE UPDATE ON course_reviews
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- =========================
-- REVIEW HELPFUL VOTES
-- =========================
CREATE TABLE review_helpful_votes(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  review_id UUID NOT NULL REFERENCES course_reviews(id) ON DELETE CASCADE,
  is_helpful BOOLEAN NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_user_vote UNIQUE(user_id, review_id)
);

-- =========================
-- REVIEW REPORTS
-- =========================
CREATE TABLE review_reports(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  review_id UUID NOT NULL REFERENCES course_reviews(id) ON DELETE CASCADE,
  reason  VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_user_report UNIQUE(user_id, review_id)
);

-- =========================
-- LEARNING STATISTICS
-- =========================

CREATE TABLE learn_statistics(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  total_xp INTEGER DEFAULT 0,
  total_lessons_completed INTEGER DEFAULT 0,
  total_time_spent_minutes INTEGER DEFAULT 0,
  last_learning_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER trg_learn_statistics_updated_at
  BEFORE UPDATE ON learn_statistics
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- =========================
-- LEARNING PROGRESS
-- =========================

CREATE TABLE learn_progress(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  
  -- current position tracking
  current_module_id UUID REFERENCES modules(id) ON DELETE SET NULL,
  current_chapter_id UUID REFERENCES chapters(id) ON DELETE SET NULL,
  current_lesson_id UUID REFERENCES lessons(id) ON DELETE SET NULL,

  -- progress tracking
  completed_lessons_count INTEGER DEFAULT 0,
  total_lessons_count INTEGER DEFAULT 0,
  progress_percentage NUMERIC(5,2) DEFAULT 0,
  total_xp_earned INTEGER DEFAULT 0,
  time_spent_minutes INTEGER DEFAULT 0,

  -- last activity tracking
  last_lesson_completed_at TIMESTAMP WITH TIME ZONE,
  last_activity_at TIMESTAMP WITH TIME ZONE,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT unique_user_course_progress UNIQUE(user_id, course_id)
);

CREATE INDEX idx_learn_progress_user ON learn_progress(user_id);
CREATE INDEX idx_learn_progress_course ON learn_progress(course_id);

CREATE TRIGGER trg_learn_progress_updated_at
  BEFORE UPDATE ON learn_progress
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- =========================
-- LESSON COMPLETIONS
-- =========================
CREATE TABLE lesson_completion (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    module_id UUID NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
    chapter_id UUID NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
    lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    completed_at TIMESTAMP NOT NULL DEFAULT NOW(),
    time_spent_minutes INTEGER DEFAULT 0,
    xp_earned INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_user_lesson_completion UNIQUE(user_id, lesson_id) 
);

CREATE INDEX idx_lesson_completion_user ON lesson_completion(user_id);
CREATE INDEX idx_lesson_completion_lesson ON lesson_completion(lesson_id);

-- =========================
-- LEARNER ACTIVITY
-- =========================

CREATE TABLE learner_activity(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  learning_date DATE NOT NULL,
  lesson_completed BOOLEAN DEFAULT FALSE,
  time_spent_minutes INTEGER DEFAULT 0,
  xp_earned INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT unique_user_activity UNIQUE(user_id, lesson_id, learning_date)
);

CREATE INDEX idx_learner_activity_user ON learner_activity(user_id);
CREATE INDEX idx_learner_activity_date ON learner_activity(learning_date);

CREATE TRIGGER trg_learner_activity_updated_at
  BEFORE UPDATE ON learner_activity
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- =========================
-- CERTIFICATES
-- =========================
CREATE TABLE certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    confirm BOOLEAN DEFAULT FALSE,
    certificate_number VARCHAR(100) UNIQUE NOT NULL, 
    certificate_url TEXT,
    issued_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_course_certificate UNIQUE(user_id, course_id)
);

CREATE INDEX idx_certificates_user ON certificates(user_id);
CREATE INDEX idx_certificates_course ON certificates(course_id);