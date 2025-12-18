const AbstractManager = require("../AbstractManager");

class UserReviewManager extends AbstractManager {
  constructor() {
    super({ table: "userReviews" });
  }

  // USERS MOVIES REVIEWS //

  // C - CRUD - Create Movie Review
  async createMovieReview(userMovieReview) {
    const [resultUserMovieReview] = await this.database.query(
      `INSERT INTO ${this.table} (user_id, movie_id, review, rating, created_at) VALUES (?, ?, ?, ?, NOW())`,
      [
        userMovieReview.user_id,
        userMovieReview.movie_id,
        userMovieReview.review,
        userMovieReview.rating,
        userMovieReview.created_at,
      ]
    );
    return resultUserMovieReview.insertId;
  }

  // R - CRUD - Read User Movie Reviews
  async readMovieReviews(movieId) {
    const [movieReviews] = await this.database.query(
      `SELECT ${this.table}.id, movie_id, movies.title AS movie_title, movies.poster AS movie_poster, users.username AS user_username, ${this.table}.rating, ${this.table}.review, ${this.table}.created_at, ${this.table}.updated_at
        FROM ${this.table}
        JOIN movies ON ${this.table}.movie_id = movies.id
        JOIN users ON ${this.table}.user_id = users.id
        WHERE ${this.table}.movie_id = ?`,
      [movieId]
    );
    return movieReviews;
  }

  async readByUserAndMovie(userId, movieId) {
    const [userMovieReview] = await this.database.query(
      `SELECT ${this.table}.id, movies.title AS movie_title, users.username AS user_username, movie_id, user_id, review, rating, ${this.table}.created_at, ${this.table}.updated_at
        FROM ${this.table}
        JOIN movies ON ${this.table}.movie_id = movies.id
        JOIN users ON ${this.table}.user_id = users.id
        WHERE ${this.table}.user_id = ? AND ${this.table}.movie_id = ?`,
      [userId, movieId]
    );
    return userMovieReview[0];
  }

  async readUserMoviesReviews(userId) {
    const [userMoviesReviews] = await this.database.query(
      `SELECT ${this.table}.id, movies.title AS movie_title, users.username AS user_username, movie_id, user_id, review, rating, ${this.table}.created_at, ${this.table}.updated_at
        FROM ${this.table}
        JOIN movies ON ${this.table}.movie_id = movies.id
        JOIN users ON ${this.table}.user_id = users.id
        WHERE ${this.table}.user_id = ?`,
      [userId]
    );
    return userMoviesReviews;
  }

  // U - CRUD - Update Movie Review
  async updateMovieReview(userMovieReview) {
    const [updateUserMovieReview] = await this.database.query(
      `UPDATE ${this.table} SET rating = ?, review = ?, updated_at = NOW() WHERE id = ? AND user_id = ? AND movie_id = ?`,
      [
        userMovieReview.rating,
        userMovieReview.review,
        userMovieReview.id,
        userMovieReview.user_id,
        userMovieReview.movie_id,
      ]
    );
    return updateUserMovieReview.affectedRows;
  }

   // USERS SERIES REVIEWS //

  // C - CRUD - Create Serie Review
  async createSerieReview(userSerieReview) {
    const [resultUserSerieReview] = await this.database.query(
      `INSERT INTO ${this.table} (user_id, serie_id, review, rating, created_at) VALUES (?, ?, ?, ?, NOW())`,
      [
        userSerieReview.user_id,
        userSerieReview.serie_id,
        userSerieReview.review,
        userSerieReview.rating,
        userSerieReview.created_at,
      ]
    );
    return resultUserSerieReview.insertId;
  }

  // R - CRUD - Read User Serie Reviews
  async readSerieReviews(serieId) {
    const [serieReviews] = await this.database.query(
      `SELECT ${this.table}.id, serie_id, series.title AS serie_title, series.poster AS serie_poster, users.username AS user_username, ${this.table}.rating, ${this.table}.review, ${this.table}.created_at, ${this.table}.updated_at
        FROM ${this.table}
        JOIN series ON ${this.table}.serie_id = series.id
        JOIN users ON ${this.table}.user_id = users.id
        WHERE ${this.table}.serie_id = ?`,
      [serieId]
    );
    return serieReviews;
  }
  
  async readByUserAndSerie(userId, serieId) {
    const [userSerieReview] = await this.database.query(
      `SELECT ${this.table}.id, series.title AS serie_title, users.username AS user_username, serie_id, user_id, review, rating, ${this.table}.created_at, ${this.table}.updated_at
        FROM ${this.table}
        JOIN series ON ${this.table}.serie_id = series.id
        JOIN users ON ${this.table}.user_id = users.id
        WHERE ${this.table}.user_id = ? AND ${this.table}.serie_id = ?`,
      [userId, serieId]
    );
    return userSerieReview[0];
  }

  async readUserSeriesReviews(userId) {
    const [userSeriesReviews] = await this.database.query(
      `SELECT ${this.table}.id, series.title AS serie_title, users.username AS user_username, serie_id, user_id, review, rating, ${this.table}.created_at, ${this.table}.updated_at
        FROM ${this.table}
        JOIN series ON ${this.table}.serie_id = series.id
        JOIN users ON ${this.table}.user_id = users.id
        WHERE ${this.table}.user_id = ?`,
      [userId]
    );
    return userSeriesReviews;
  }

  // U - CRUD - Update Serie Review
  async updateSerieReview(userSerieReview) {
    const [updateUserSerieReview] = await this.database.query(
      `UPDATE ${this.table} SET rating = ?, review = ?, updated_at = NOW() WHERE id = ? AND user_id = ? AND serie_id = ?`,
      [
        userSerieReview.rating,
        userSerieReview.review,
        userSerieReview.id,
        userSerieReview.user_id,
        userSerieReview.serie_id,
      ]
    );
    return updateUserSerieReview.affectedRows;
  }

     // USERS PERSONALITIES REVIEWS //

  // C - CRUD - Create Personality Review
  async createPersonalityReview(userPersonalityReview) {
    const [resultUserPersonalityReview] = await this.database.query(
      `INSERT INTO ${this.table} (user_id, personality_id, review, rating, created_at) VALUES (?, ?, ?, ?, NOW())`,
      [
        userPersonalityReview.user_id,
        userPersonalityReview.personality_id,
        userPersonalityReview.review,
        userPersonalityReview.rating,
        userPersonalityReview.created_at,
      ]
    );
    return resultUserPersonalityReview.insertId;
  }

  // R - CRUD - Read User Personality Reviews
  async readPersonalityReviews(personalityId) {
    const [personalityReviews] = await this.database.query(
      `SELECT ${this.table}.id, personality_id, personalities.fullname AS personality_fullname, personalities.picture AS personality_picture, users.username AS user_username, ${this.table}.rating, ${this.table}.review, ${this.table}.created_at, ${this.table}.updated_at
        FROM ${this.table}
        JOIN personalities ON ${this.table}.personality_id = personalities.id
        JOIN users ON ${this.table}.user_id = users.id
        WHERE ${this.table}.personality_id = ?`,
      [personalityId]
    );
    return personalityReviews;
  }
  
  async readByUserAndPersonality(userId, personalityId) {
    const [userPersonalityReview] = await this.database.query(
      `SELECT ${this.table}.id, personalities.fullname AS personality_fullname, users.username AS user_username, personality_id, user_id, review, rating, ${this.table}.created_at, ${this.table}.updated_at
        FROM ${this.table}
        JOIN personalities ON ${this.table}.personality_id = personalities.id
        JOIN users ON ${this.table}.user_id = users.id
        WHERE ${this.table}.user_id = ? AND ${this.table}.personality_id = ?`,
      [userId, personalityId]
    );
    return userPersonalityReview[0];
  }

  async readUserPersonalitiesReviews(userId) {
    const [userPersonalitiesReviews] = await this.database.query(
      `SELECT ${this.table}.id, personalities.fullname AS personality_fullname, users.username AS user_username, personality_id, user_id, review, rating, ${this.table}.created_at, ${this.table}.updated_at
        FROM ${this.table}
        JOIN personalities ON ${this.table}.personality_id = personalities.id
        JOIN users ON ${this.table}.user_id = users.id
        WHERE ${this.table}.user_id = ?`,
      [userId]
    );
    return userPersonalitiesReviews;
  }

  // U - CRUD - Update Personality Review
  async updatePersonalityReview(userPersonalityReview) {
    const [updateUserPersonalityReview] = await this.database.query(
      `UPDATE ${this.table} SET rating = ?, review = ?, updated_at = NOW() WHERE id = ? AND user_id = ? AND personality_id = ?`,
      [
        userPersonalityReview.rating,
        userPersonalityReview.review,
        userPersonalityReview.id,
        userPersonalityReview.user_id,
        userPersonalityReview.personality_id,
      ]
    );
    return updateUserPersonalityReview.affectedRows;
  }

}

module.exports = UserReviewManager;
