// session
export const COOKIE_MAX_AGE_MSEC = 60 * 60 * 24 * 30 * 1000; // 30 days
export const SESSION_MAX_AGE_SEC = 60 * 60 * 24 * 30; // 30 days
export const SESSION_INTERVAL_SEC = 60 * 15; // 15 minutes
// file
export const FILE_SIZE_LIMIT = 1024 * 1024 * 5; // 5MB
// database
export const DB_POOL_SIZE = 10; // max number of connections in the pool
export const DB_IDLE_TIMEOUT = 30_000; // 30 seconds
export const DB_CONNECTION_TIMEOUT = 2000; // 2 seconds
// user role
export const ADMIN = "ADMIN";
export const INSTRUCTOR = "INSTRUCTOR";
// ABOUT COURSE
export const CONTENT_STATUS = ["DRAFT", "PUBLISHED"];
export const LESSON_TYPE = ["TEXT", "QUIZ"];
export const COURSE_LEVEL = ["BEGINNER", "INTERMEDIATE", "ADVANCED"];
export const ACCESS_COURSE_TYPE = ["FREE", "SUBSCRIPTION"];
