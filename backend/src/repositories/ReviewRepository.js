import pgPool from "../configs/database.js";
import AdvancedQuery from "../utils/AdvaceQuery.js";

class ReviewRepository {
  async getReviews(queryString, courseId, userId) {
    const baseQuery = `
   FROM course_reviews cr
  LEFT JOIN users u ON u.id = cr.user_id
  LEFT JOIN review_helpful_votes rhv 
    ON rhv.review_id = cr.id 
    AND rhv.user_id = $1
  LEFT JOIN review_reports rr
    ON rr.review_id = cr.id
    AND rr.user_id = $1
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
  COALESCE(rhv.is_helpful, null) AS is_helpful,
  CASE 
    WHEN rr.id IS NOT NULL THEN true 
    ELSE false 
  END AS is_reported
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
    '5', COUNT(*) FILTER (WHERE rating >= 4.5 AND rating <= 5 ),
    '4', COUNT(*) FILTER (WHERE rating >= 4 AND rating < 4.5),
    '3', COUNT(*) FILTER (WHERE rating >= 3 AND rating < 4),
    '2', COUNT(*) FILTER (WHERE rating >= 2 AND rating < 3),
    '1', COUNT(*) FILTER (WHERE rating >= 1 AND rating < 2)
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
    RETURNING id, user_id, course_id, rating, review, created_at;
    `;
    const result = await pgPool.query(query, [
      userId,
      courseId,
      rating,
      review,
    ]);
    return result.rows[0];
  }

  async createReviewHelpfulVote({ userId, reviewId, isHelpful }) {
    const query = `
    INSERT INTO review_helpful_votes (user_id, review_id, is_helpful)
    VALUES ($1, $2, $3)
    RETURNING id, user_id, review_id, is_helpful, created_at;
    `;
    const result = await pgPool.query(query, [userId, reviewId, isHelpful]);
    return result.rows[0];
  }

  async updateReviewHelpfulVote({ reviewId, isHelpful }) {
    const query = `
    UPDATE review_helpful_votes
    SET is_helpful = $1
    WHERE id = $2
    RETURNING is_helpful;
    `;
    const result = await pgPool.query(query, [isHelpful, reviewId]);
    return result.rows[0];
  }

  async getReviewHelpfulVote({ userId, reviewId }) {
    const query = `
    SELECT *
    FROM review_helpful_votes
    WHERE user_id = $1 AND review_id = $2
    `;
    const result = await pgPool.query(query, [userId, reviewId]);
    return result.rows[0];
  }
  async deleteReviewHelpfulVote({ userId, reviewId }) {
    const query = `
    DELETE FROM review_helpful_votes
    WHERE user_id = $1 AND review_id = $2
    RETURNING id, user_id, review_id, is_helpful, created_at;
    `;
    const result = await pgPool.query(query, [userId, reviewId]);
    return result.rows[0];
  }
  async findById(id) {
    const query = `
    SELECT *
    FROM course_reviews
    WHERE id = $1
    `;
    const result = await pgPool.query(query, [id]);
    return result.rows[0];
  }

  async createReviewReport({ userId, reviewId, reason, description }) {
    const query = `
    INSERT INTO review_reports (user_id, review_id, reason, description)
    VALUES ($1, $2, $3, $4)
    RETURNING id, user_id, review_id, reason, description, created_at;
    `;
    const result = await pgPool.query(query, [
      userId,
      reviewId,
      reason,
      description,
    ]);
    return result.rows[0];
  }

  async getReviewReports({ userId, reviewId }) {
    const query = `
    SELECT *
    FROM review_reports
    WHERE user_id = $1 AND review_id = $2
    `;
    const result = await pgPool.query(query, [userId, reviewId]);
    return result.rows[0];
  }
  async getReview({ userId, courseId }) {
    const query = `
    SELECT *
    FROM course_reviews
    WHERE user_id = $1 AND course_id = $2
    `;
    const result = await pgPool.query(query, [userId, courseId]);
    return result.rows[0];
  }
}

const Review = new ReviewRepository();

export default Review;
