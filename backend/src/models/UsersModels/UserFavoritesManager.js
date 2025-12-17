const AbstractManager = require("../AbstractManager");

class UserFavoritesManager extends AbstractManager {
    constructor() {
        super({ table: "userFavorites" });
    }

    // MOVIES //

    // C - CRUD - Create / ADD
    async addFavoriteMovie(favoriteMovie) {
        // Vérifier si l'entrée existe déjà (même user, même film, même status)
        const [existing] = await this.database.query(
            `SELECT id FROM ${this.table} WHERE user_id = ? AND movie_id = ? AND status = ?`,
            [favoriteMovie.user_id, favoriteMovie.movie_id, favoriteMovie.status]
        );

        if (existing.length > 0) {
            // Déjà existant, retourner un message
            const statusMessages = {
                liked: "aimé",
                favorite: "en favoris",
                seen: "vu",
                toWatch: "à voir",
                isWatching: "en cours de visionnage"
            };
            return { 
                alreadyExists: true, 
                id: existing[0].id,
                message: `Ce film est déjà marqué comme "${statusMessages[favoriteMovie.status] || favoriteMovie.status}"`
            };
        } else {
            // INSERT si n'existe pas
            const [inserted] = await this.database.query(
                `INSERT INTO ${this.table} (user_id, movie_id, status) VALUES (?, ?, ?)`,
                [favoriteMovie.user_id, favoriteMovie.movie_id, favoriteMovie.status]
            );
            return { ...inserted, alreadyExists: false };
        }
    }

    // R - CRUD - READ / GET
    async getUserFavoritesMovies(userId) {
        const [favoritesMovies] = await this.database.query(
            `SELECT user_id, users.username AS user_username, movies.id AS movie_id, movies.title AS movie_title, movies.poster AS movie_poster, ${this.table}.status AS favorite_status 
            FROM ${this.table}
            JOIN users ON ${this.table}.user_id = users.id
            JOIN movies ON ${this.table}.movie_id = movies.id 
            WHERE user_id = ? AND movie_id IS NOT NULL`,
            [userId]
        );
        return favoritesMovies;
    }

    // D - CRUD - Delete / REMOVE
    async removeFavoriteMovie(favoriteMovie) {
        const [removed] = await this.database.query(
            `DELETE FROM ${this.table} WHERE user_id = ? AND movie_id = ? AND status = ?`,
            [favoriteMovie.user_id, favoriteMovie.movie_id, favoriteMovie.status]
        );
        return removed;
    }

    // SERIES //

        // C - CRUD - Create / ADD
    async addFavoriteSerie(favoriteSerie) {
        // Vérifier si l'entrée existe déjà (même user, même film, même status)
        const [existing] = await this.database.query(
            `SELECT id FROM ${this.table} WHERE user_id = ? AND serie_id = ? AND status = ?`,
            [favoriteSerie.user_id, favoriteSerie.serie_id, favoriteSerie.status]
        );

        if (existing.length > 0) {
            // Déjà existant, retourner un message
            const statusMessages = {
                liked: "aimé",
                favorite: "en favoris",
                seen: "vu",
                toWatch: "à voir",
                isWatching: "en cours de visionnage"
            };
            return { 
                alreadyExists: true, 
                id: existing[0].id,
                message: `Cette série est déjà marquée comme "${statusMessages[favoriteSerie.status] || favoriteSerie.status}"`
            };
        } else {
            // INSERT si n'existe pas
            const [inserted] = await this.database.query(
                `INSERT INTO ${this.table} (user_id, serie_id, status) VALUES (?, ?, ?)`,
                [favoriteSerie.user_id, favoriteSerie.serie_id, favoriteSerie.status]
            );
            return { ...inserted, alreadyExists: false };
        }
    }

    // R - CRUD - READ / GET
    async getUserFavoritesSeries(userId) {
        const [favoritesSeries] = await this.database.query(
            `SELECT user_id, users.username AS user_username, series.id AS serie_id, series.title AS serie_title, series.poster AS serie_poster, ${this.table}.status AS favorite_status 
            FROM ${this.table}
            JOIN users ON ${this.table}.user_id = users.id
            JOIN series ON ${this.table}.serie_id = series.id 
            WHERE user_id = ? AND serie_id IS NOT NULL`,
            [userId]
        );
        return favoritesSeries;
    }

    // D - CRUD - Delete / REMOVE
    async removeFavoriteSerie(favoriteSerie) {
        const [removed] = await this.database.query(
            `DELETE FROM ${this.table} WHERE user_id = ? AND serie_id = ? AND status = ?`,
            [favoriteSerie.user_id, favoriteSerie.serie_id, favoriteSerie.status]
        );
        return removed;
    }

        // PERSONALITIES //

        // C - CRUD - Create / ADD
    async addFavoritePersonality(favoritePersonality) {
        // Vérifier si l'entrée existe déjà (même user, même personnalité, même status)
        const [existing] = await this.database.query(
            `SELECT id FROM ${this.table} WHERE user_id = ? AND personality_id = ? AND status = ?`,
            [favoritePersonality.user_id, favoritePersonality.personality_id, favoritePersonality.status]
        );

        if (existing.length > 0) {
            // Déjà existant, retourner un message
            const statusMessages = {
                liked: "aimé",
                favorite: "en favoris",
                seen: "vu",
                toWatch: "à voir",
                isWatching: "en cours de visionnage"
            };
            return { 
                alreadyExists: true, 
                id: existing[0].id,
                message: `Cette personnalité est déjà marquée comme "${statusMessages[favoritePersonality.status] || favoritePersonality.status}"`
            };
        } else {
            // INSERT si n'existe pas
            const [inserted] = await this.database.query(
                `INSERT INTO ${this.table} (user_id, personality_id, status) VALUES (?, ?, ?)`,
                [favoritePersonality.user_id, favoritePersonality.personality_id, favoritePersonality.status]
            );
            return { ...inserted, alreadyExists: false };
        }
    }

    // R - CRUD - READ / GET
    async getUserFavoritesPersonalities(userId) {
        const [favoritesPersonalities] = await this.database.query(
            `SELECT user_id, users.username AS user_username, personalities.id AS personality_id, personalities.fullname AS personality_fullname, personalities.picture AS personality_picture, ${this.table}.status AS favorite_status 
            FROM ${this.table}
            JOIN users ON ${this.table}.user_id = users.id
            JOIN personalities ON ${this.table}.personality_id = personalities.id 
            WHERE user_id = ? AND personality_id IS NOT NULL`,
            [userId]
        );
        return favoritesPersonalities;
    }

    // D - CRUD - Delete / REMOVE
    async removeFavoritePersonality(favoritePersonality) {
        const [removed] = await this.database.query(
            `DELETE FROM ${this.table} WHERE user_id = ? AND personality_id = ? AND status = ?`,
            [favoritePersonality.user_id, favoritePersonality.personality_id, favoritePersonality.status]
        );
        return removed;
    }
}

module.exports = UserFavoritesManager;