export const mockUsers = [
  {
    id: "1",
    name: "John Admin",
    email: "admin@lms.com",
    role: "ADMIN",
    status: "ACTIVE",
    last_login: "2026-04-15T10:00:00Z",
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Sarah Instructor",
    email: "sarah@lms.com",
    role: "INSTRUCTOR",
    status: "ACTIVE",
    last_login: "2026-04-14T08:00:00Z",
    created_at: "2026-01-15T00:00:00Z",
  },
  {
    id: "3",
    name: "Mike Instructor",
    email: "mike@lms.com",
    role: "INSTRUCTOR",
    status: "ACTIVE",
    last_login: "2026-04-13T12:00:00Z",
    created_at: "2026-02-01T00:00:00Z",
  },
  {
    id: "4",
    name: "Alice Learner",
    email: "alice@lms.com",
    role: "LEARNER",
    status: "ACTIVE",
    created_at: "2026-03-01T00:00:00Z",
  },
  {
    id: "5",
    name: "Bob Learner",
    email: "bob@lms.com",
    role: "LEARNER",
    status: "SUSPENDED",
    created_at: "2026-03-10T00:00:00Z",
  },
];

export const mockCategories = [
  {
    id: "1",
    name: "Web Development",
    slug: "web-development",
    description: "Full-stack web development courses",
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Data Science",
    slug: "data-science",
    description: "Data analysis and machine learning",
    created_at: "2026-01-02T00:00:00Z",
  },
  {
    id: "3",
    name: "Mobile Development",
    slug: "mobile-development",
    description: "iOS and Android development",
    created_at: "2026-01-03T00:00:00Z",
  },
  {
    id: "4",
    name: "DevOps",
    slug: "devops",
    description: "CI/CD, Docker, Kubernetes",
    created_at: "2026-01-04T00:00:00Z",
  },
];

export const mockCourses = [
  {
    id: "1",
    instructor_id: "2",
    category_id: "1",
    name: "React Masterclass",
    slug: "react-masterclass",
    description: "Complete React course from beginner to advanced",
    status: "PUBLISHED",
    level: "INTERMEDIATE",
    access_type: "SUBSCRIPTION",
    created_at: "2026-02-01T00:00:00Z",
    instructor_name: "Sarah Instructor",
    category_name: "Web Development",
    modules_count: 3,
    enrollments_count: 145,
  },
  {
    id: "2",
    instructor_id: "3",
    category_id: "2",
    name: "Python for Data Science",
    slug: "python-data-science",
    description: "Learn Python for data analysis",
    status: "PUBLISHED",
    level: "BEGINNER",
    access_type: "FREE",
    created_at: "2026-02-15T00:00:00Z",
    instructor_name: "Mike Instructor",
    category_name: "Data Science",
    modules_count: 5,
    enrollments_count: 230,
  },
  {
    id: "3",
    instructor_id: "2",
    category_id: "3",
    name: "Flutter Development",
    slug: "flutter-development",
    description: "Build cross-platform apps with Flutter",
    status: "DRAFT",
    level: "BEGINNER",
    access_type: "FREE",
    created_at: "2026-03-01T00:00:00Z",
    instructor_name: "Sarah Instructor",
    category_name: "Mobile Development",
    modules_count: 2,
    enrollments_count: 0,
  },
];

export const mockModules = [
  {
    id: "1",
    course_id: "1",
    position: 1,
    name: "Getting Started with React",
    status: "PUBLISHED",
    description: "Introduction to React fundamentals",
  },
  {
    id: "2",
    course_id: "1",
    position: 2,
    name: "Advanced Hooks",
    status: "PUBLISHED",
    description: "Deep dive into React hooks",
  },
  {
    id: "3",
    course_id: "1",
    position: 3,
    name: "State Management",
    status: "DRAFT",
    description: "Redux, Zustand, and more",
  },
];

export const mockChapters = [
  {
    id: "1",
    module_id: "1",
    position: 1,
    name: "What is React?",
    status: "PUBLISHED",
  },
  {
    id: "2",
    module_id: "1",
    position: 2,
    name: "JSX & Components",
    status: "PUBLISHED",
  },
  {
    id: "3",
    module_id: "2",
    position: 1,
    name: "useState & useEffect",
    status: "PUBLISHED",
  },
];

export const mockLessons = [
  {
    id: "1",
    chapter_id: "1",
    position: 1,
    name: "Introduction to React",
    type: "TEXT",
    status: "PUBLISHED",
    xp_points: 10,
    duration_minutes: 15,
  },
  {
    id: "2",
    chapter_id: "1",
    position: 2,
    name: "React Quiz",
    type: "QUIZ",
    status: "PUBLISHED",
    xp_points: 20,
    duration_minutes: 10,
  },
  {
    id: "3",
    chapter_id: "2",
    position: 1,
    name: "Understanding JSX",
    type: "TEXT",
    status: "PUBLISHED",
    xp_points: 10,
    duration_minutes: 20,
  },
];

export const mockLessonContents = [
  {
    id: "1",
    lesson_id: "1",
    position: 1,
    name: "What is React?",
    content: "React is a JavaScript library for building user interfaces...",
    created_at: "2026-02-01T00:00:00Z",
  },
  {
    id: "2",
    lesson_id: "1",
    position: 2,
    name: "Why React?",
    content: "React makes it painless to create interactive UIs...",
    created_at: "2026-02-01T00:00:00Z",
  },
  {
    id: "3",
    lesson_id: "3",
    position: 1,
    name: "JSX Syntax",
    content: "JSX is a syntax extension for JavaScript...",
    created_at: "2026-02-01T00:00:00Z",
  },
];

export const mockQuizzes = [
  {
    id: "1",
    lesson_id: "2",
    question: "What is React?",
    explanation: "React is a JavaScript library for building UIs",
    position: 1,
  },
];

export const mockQuizOptions = [
  {
    id: "1",
    quiz_id: "1",
    text: "A JavaScript library for building UIs",
    is_correct: true,
    position: 1,
  },
  {
    id: "2",
    quiz_id: "1",
    text: "A CSS framework",
    is_correct: false,
    position: 2,
  },
  { id: "3", quiz_id: "1", text: "A database", is_correct: false, position: 3 },
  {
    id: "4",
    quiz_id: "1",
    text: "An operating system",
    is_correct: false,
    position: 4,
  },
];

export const mockSubscriptionPlans = [
  {
    id: "1",
    name: "Basic Monthly",
    duration_days: 30,
    price: 9.99,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Pro Monthly",
    duration_days: 30,
    price: 19.99,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "3",
    name: "Basic Yearly",
    duration_days: 365,
    price: 99.99,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "4",
    name: "Pro Yearly",
    duration_days: 365,
    price: 199.99,
    created_at: "2026-01-01T00:00:00Z",
  },
];

export const mockUserSubscriptions = [
  {
    id: "1",
    user_id: "4",
    plan_id: "2",
    start_date: "2026-03-01T00:00:00Z",
    end_date: "2026-03-31T00:00:00Z",
    status: "ACTIVE",
    created_at: "2026-03-01T00:00:00Z",
    user_name: "Alice Learner",
    plan_name: "Pro Monthly",
  },
  {
    id: "2",
    user_id: "5",
    plan_id: "3",
    start_date: "2026-02-01T00:00:00Z",
    end_date: "2027-02-01T00:00:00Z",
    status: "ACTIVE",
    created_at: "2026-02-01T00:00:00Z",
    user_name: "Bob Learner",
    plan_name: "Basic Yearly",
  },
];

export const mockSubscriptionPayments = [
  {
    id: "1",
    user_subscription_id: "1",
    amount: 19.99,
    payment_status: "COMPLETED",
    stripe_payment_intent_id: "pi_mock_001",
    created_at: "2026-03-01T00:00:00Z",
    user_name: "Alice Learner",
    plan_name: "Pro Monthly",
  },
  {
    id: "2",
    user_subscription_id: "2",
    amount: 99.99,
    payment_status: "COMPLETED",
    stripe_payment_intent_id: "pi_mock_002",
    created_at: "2026-02-01T00:00:00Z",
    user_name: "Bob Learner",
    plan_name: "Basic Yearly",
  },
  {
    id: "3",
    user_subscription_id: "1",
    amount: 19.99,
    payment_status: "PENDING",
    created_at: "2026-04-01T00:00:00Z",
    user_name: "Alice Learner",
    plan_name: "Pro Monthly",
  },
];
