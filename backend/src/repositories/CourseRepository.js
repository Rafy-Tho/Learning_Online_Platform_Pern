import pgPool from "../configs/database.js";
import AdvancedQuery from "../utils/AdvaceQuery.js";

class CourseRepository {
  async create({
    instructorId,
    categoryId,
    name,
    slug,
    description,
    level,
    accessType,
    status,
    position,
  }) {
    const query = `INSERT INTO courses (
        instructor_id,
        category_id,
        name,
        slug,
        description,
        status,
        position,
        level,
        access_type
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;
    const values = [
      instructorId,
      categoryId,
      name,
      slug,
      description,
      status,
      position,
      level,
      accessType,
    ];
    const result = await pgPool.query(query, values);
    return result.rows[0];
  }
  async update({
    id,
    categoryId,
    name,
    slug,
    description,
    status,
    position,
    level,
    accessType,
  }) {
    const query = `UPDATE courses
      SET
        category_id = $1,
        name = $2,
        slug = $3,
        description = $4,
        status = $5,
        position = $6,
        level = $7,
        access_type = $8
      WHERE id = $9
      RETURNING *
    `;
    const values = [
      categoryId,
      name,
      slug,
      description,
      status,
      position,
      level,
      accessType,
      id,
    ];
    const result = await pgPool.query(query, values);
    return result.rows[0];
  }
  async delete(id) {
    const query = `DELETE FROM courses
      WHERE id = $1
      RETURNING *
    `;
    const values = [id];
    const result = await pgPool.query(query, values);
    return result.rows[0];
  }
  async findById(id) {
    const query = `SELECT * FROM courses
      WHERE id = $1`;
    const values = [id];
    const result = await pgPool.query(query, values);
    return result.rows[0];
  }

  async getAllCourses(queryString) {
    const baseQuery = `
    FROM courses c

    LEFT JOIN (
      SELECT 
        m.course_id,
        SUM(l.duration_minutes) AS total_duration,
        COUNT(l.id) FILTER (WHERE l.type = 'TEXT') AS total_lessons,
        COUNT(l.id) FILTER (WHERE l.type = 'QUIZ') AS total_quizzes
      FROM modules m
      JOIN chapters ch ON ch.module_id = m.id
      JOIN lessons l ON l.chapter_id = ch.id
      GROUP BY m.course_id
    ) ld ON ld.course_id = c.id

    LEFT JOIN (
      SELECT 
        course_id,
        AVG(rating)::numeric(3,2) AS avg_rating,
        COUNT(*) AS total_reviews
      FROM course_reviews
      GROUP BY course_id
    ) rv ON rv.course_id = c.id
  `;

    const filterMap = {
      level: "c.level",
      category: "c.category_id",
      skill: "c.slug",
      rating: "rv.avg_rating",
      duration: "ld.total_duration",
      isFree: "c.access_type",
    };

    const sortMap = {
      created_at: "c.created_at",
      avg_rating: "rv.avg_rating",
      total_duration: "ld.total_duration",
    };

    const features = new AdvancedQuery({
      baseQuery,
      queryString,
      filterMap,
      sortMap,
    });

    features.select = `
    c.*,
    COALESCE(ld.total_duration, 0) AS total_duration,
    COALESCE(rv.avg_rating, 0) AS avg_rating,
    COALESCE(rv.total_reviews, 0) AS total_reviews,
    COALESCE(ld.total_lessons, 0) AS total_lessons,
    COALESCE(ld.total_quizzes, 0) AS total_quizzes
  `;

    await features
      .filter()
      .search(["c.name", "c.description"])
      .sort()
      .paginate();

    const { sql, values, pagination } = features.build();

    const result = await pgPool.query(sql, values);

    return {
      data: result.rows,
      pagination,
    };
  }
  async findByCategoryId(category_id) {
    const query = `SELECT * FROM courses
      WHERE category_id = $1
      AND deleted_at IS NULL
    `;
    const values = [category_id];
    const result = await pgPool.query(query, values);
    return result.rows;
  }
  async findByInstructorId(instructorId) {
    const query = `SELECT * FROM courses
      WHERE instructor_id = $1
      AND deleted_at IS NULL
    `;
    const values = [instructorId];
    const result = await pgPool.query(query, values);
    return result.rows;
  }

  async getCourseDetailsById(courseId) {
    const query = `
    SELECT  
      c.*,

      -- 📊 total duration
      COALESCE(ld.total_duration, 0) AS total_duration,

      -- 📚 total lessons
      COALESCE(ld.total_lessons, 0) AS total_lessons,

      -- ⭐ rating
      COALESCE(rv.rating, 0) AS rating,
      COALESCE(rv.total_reviews, 0) AS total_reviews

    FROM courses c

    -- 📊 duration + lesson count
    LEFT JOIN (
      SELECT 
        m.course_id,
        SUM(l.duration_minutes) AS total_duration,
        COUNT(l.id) AS total_lessons
      FROM modules m
      JOIN chapters ch ON ch.module_id = m.id
      JOIN lessons l ON l.chapter_id = ch.id
      GROUP BY m.course_id
    ) AS ld ON ld.course_id = c.id

    -- ⭐ reviews
    LEFT JOIN (
      SELECT 
        course_id,
        AVG(rating)::NUMERIC(3,2) AS rating,
        COUNT(*) AS total_reviews
      FROM course_reviews
      GROUP BY course_id
    ) AS rv ON rv.course_id = c.id

    -- 🎯 specific course
    WHERE c.id = $1;
  `;
    const { rows } = await pgPool.query(query, [courseId]);
    return rows[0] || null;
  }
  async getLearningData(courseId) {
    const query = `
      WITH lesson_data AS (
        SELECT 
          ch.module_id,
          json_agg(
            jsonb_build_object(
              'id', l.id,
              'name', l.name,
              'type', l.type,
              'duration', l.duration_minutes,
              'xp', l.xp_points,
              'position', l.position,
              'access_type', l.access_type
            )
            ORDER BY l.position
          ) AS lessons
        FROM chapters ch
        JOIN lessons l ON l.chapter_id = ch.id
        GROUP BY ch.module_id
      ),
  
      module_data AS (
        SELECT 
          m.course_id,
          json_agg(
            jsonb_build_object(
              'id', m.id,
              'name', m.name,
              'position', m.position,
              'lessons', COALESCE(ld.lessons, '[]')
            )
            ORDER BY m.position
          ) AS modules
        FROM modules m
        LEFT JOIN lesson_data ld ON ld.module_id = m.id
        GROUP BY m.course_id
      ),
  
      duration_data AS (
        SELECT 
          m.course_id,
          SUM(l.duration_minutes) AS total_duration,
          COUNT(l.id) FILTER (WHERE l.type = 'TEXT') AS total_lessons,
          COUNT(l.id) FILTER (WHERE l.type = 'QUIZ') AS total_quizzes
        FROM modules m
        JOIN chapters ch ON ch.module_id = m.id
        JOIN lessons l ON l.chapter_id = ch.id
        GROUP BY m.course_id
      )
      

      SELECT  
        c.*,
        COALESCE(d.total_duration, 0) AS total_duration,
        COALESCE(d.total_lessons, 0) AS total_lessons,
        COALESCE(d.total_quizzes, 0) AS total_quizzes,
        COALESCE(md.modules, '[]') AS modules
        
      FROM courses c
      LEFT JOIN module_data md ON md.course_id = c.id
      LEFT JOIN duration_data d ON d.course_id = c.id
  
      WHERE c.id = $1;
    `;

    const result = await pgPool.query(query, [courseId]);
    return result.rows[0];
  }
  async getCourseIdByLessonId(lessonId) {
    const result = await pgPool.query(
      `
      SELECT c.id AS course_id
      FROM lessons l
      JOIN chapters ch ON ch.id = l.chapter_id
      JOIN modules m ON m.id = ch.module_id
      JOIN courses c ON c.id = m.course_id
      WHERE l.id = $1
      `,
      [lessonId],
    );

    return result.rows[0]?.course_id || null;
  }

  async getRecentlyViewed(userId) {
    const query = `
      SELECT 
         c.*,

         -- Learn progress
         lp.lesson_id AS last_lesson,
         lp.updated_at AS last_activity,

         -- Total duration (minutes)
         COALESCE(SUM(l.duration_minutes), 0) AS total_duration

      FROM learn_progress lp

      JOIN courses c 
           ON c.id = lp.course_id

      LEFT JOIN modules m 
           ON m.course_id = c.id

      LEFT JOIN chapters ch 
           ON ch.module_id = m.id

      LEFT JOIN lessons l 
           ON l.chapter_id = ch.id

      WHERE lp.user_id = $1

      GROUP BY 
          c.id,
          lp.lesson_id,
          lp.updated_at

      ORDER BY lp.updated_at DESC
      LIMIT 20;
    `;
    const result = await pgPool.query(query, [userId]);
    return result.rows;
  }
  async getRecommended(userId) {
    const query = `
      SELECT 
        c.*,
        COALESCE(d.total_duration, 0) AS total_duration
  
      FROM courses c
  
      -- ✅ duration subquery (correct way)
      LEFT JOIN (
        SELECT 
          m.course_id,
          SUM(l.duration_minutes) AS total_duration
        FROM modules m
        JOIN chapters ch ON ch.module_id = m.id
        JOIN lessons l ON l.chapter_id = ch.id
        GROUP BY m.course_id
      ) d ON d.course_id = c.id
  
      WHERE c.category_id IN (
        SELECT DISTINCT c2.category_id
        FROM lesson_completion lc
        JOIN courses c2 ON c2.id = lc.course_id
        WHERE lc.user_id = $1
      )
      AND c.id NOT IN (
        SELECT course_id 
        FROM lesson_completion 
        WHERE user_id = $1
      )
      AND c.status = 'PUBLISHED'
  
      LIMIT 10;
    `;

    const result = await pgPool.query(query, [userId]);
    return result.rows;
  }
  async getPopular() {
    const query = `
      SELECT 
        c.*,
        COUNT(DISTINCT lc.id) AS enroll_count,
        COALESCE(d.total_duration, 0) AS total_duration
  
      FROM courses c
  
      LEFT JOIN lesson_completion lc 
        ON lc.course_id = c.id
  
      LEFT JOIN (
        SELECT 
          m.course_id,
          SUM(l.duration_minutes) AS total_duration
        FROM modules m
        JOIN chapters ch ON ch.module_id = m.id
        JOIN lessons l ON l.chapter_id = ch.id
        GROUP BY m.course_id
      ) d ON d.course_id = c.id
  
      WHERE c.status = 'PUBLISHED'
  
      GROUP BY c.id, d.total_duration
      ORDER BY enroll_count DESC
      LIMIT 10;
    `;

    const result = await pgPool.query(query);
    return result.rows;
  }
  async getHighlyRated() {
    const query = `
      SELECT 
        c.*,
        COALESCE(AVG(r.rating), 0) AS average_rating,
        COUNT(DISTINCT r.id) AS total_reviews,
        COALESCE(d.total_duration, 0) AS total_duration
  
      FROM courses c
  
      LEFT JOIN course_reviews r 
        ON r.course_id = c.id
  
      LEFT JOIN (
        SELECT 
          m.course_id,
          SUM(l.duration_minutes) AS total_duration
        FROM modules m
        JOIN chapters ch ON ch.module_id = m.id
        JOIN lessons l ON l.chapter_id = ch.id
        GROUP BY m.course_id
      ) d ON d.course_id = c.id
  
      WHERE c.status = 'PUBLISHED'
  
      GROUP BY c.id, d.total_duration
      ORDER BY 
        average_rating DESC,
        total_reviews DESC
      LIMIT 10;
    `;

    const result = await pgPool.query(query);
    return result.rows;
  }
  async getXpEarning(userId) {
    const query = `
    SELECT 
      COALESCE(SUM(xp_earned), 0) AS total_xp,

      COALESCE(SUM(
    CASE 
      WHEN created_at >= CURRENT_DATE 
      THEN xp_earned 
      ELSE 0 
       END
      ), 0) AS today_xp

    FROM lesson_completion
    WHERE user_id = $1;
      `;
    const result = await pgPool.query(query, [userId]);
    return result.rows[0];
  }
}
const Course = new CourseRepository();

export default Course;
