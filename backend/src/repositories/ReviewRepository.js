import pgPool from "../configs/database.js";
import AdvancedQuery from "../utils/AdvaceQuery.js";

class ReviewRepository {
  async getReviews(queryString, courseId, userId) {
    const baseQuery = `
    FROM course_reviews cr
    LEFT JOIN users u ON u.id = cr.user_id
    LEFT JOIN review_helpful_votes rhv 
      ON rhv.review_id = cr.id 
      AND ($1::uuid IS NULL OR rhv.user_id = $1)
  `;

    const features = new AdvancedQuery({
      baseQuery,
      queryString: { ...queryString, course_id: courseId },
      filterMap: {
        rating: "cr.rating",
        course_id: "cr.course_id",
      },
      sortMap: {
        created_at: "cr.created_at",
        rating: "cr.rating",
      },
      startIndex: 2,
    });

    features.select = `
    cr.id,
    cr.user_id,
    cr.course_id,
    cr.rating,
    cr.review,
    cr.created_at,
    u.name AS user_name,
    u.image_url AS user_profile,
    COALESCE(rhv.is_helpful, null) AS is_helpful
  `;

    await features.filter().search(["cr.review"]).sort().paginate([userId]);

    const { sql, values, pagination } = features.build();

    const result = await pgPool.query(sql, [userId, ...values]);

    return {
      data: result.rows,
      pagination,
    };
  }
  async getReviewsDetail(courseId) {
    const query = `
    SELECT json_build_object(
    'total', COUNT(*),
    'average', ROUND(AVG(rating), 2),
    'ratings', json_build_object(
    '5', COUNT(*) FILTER (WHERE rating = 5),
    '4', COUNT(*) FILTER (WHERE rating = 4),
    '3', COUNT(*) FILTER (WHERE rating = 3),
    '2', COUNT(*) FILTER (WHERE rating = 2),
    '1', COUNT(*) FILTER (WHERE rating = 1)
   )
   ) AS review_summary
   FROM course_reviews
   WHERE course_id = $1;
    `;
    const result = await pgPool.query(query, [courseId]);
    return result.rows;
  }

  async createReview({ userId, courseId, rating, review }) {
    const query = `
    INSERT INTO course_reviews (user_id, course_id, rating, review)
    VALUES ($1, $2, $3, $4)
    RETURNING id, user_id, course_id, rating, review, helpful_count, created_at;
    `;
    const result = await pgPool.query(query, [
      userId,
      courseId,
      rating,
      review,
    ]);
    return result.rows[0];
  }
}

const Review = new ReviewRepository();

export default Review;
