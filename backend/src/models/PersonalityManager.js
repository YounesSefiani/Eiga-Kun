const AbstractManager = require("./AbstractManager");

class PersonalityManager extends AbstractManager {
    constructor() {
        super({ table: "personalities" });
    }

    // C - CRUD - CREATE
    async createPersonality(personality) {
        const [personalityCreated] = await this.database.query(
            `INSERT INTO ${this.table} (fullname, personality_picture, birth_date, death_date, notable_movies, notable_series, profession, biography) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                personality.fullname,
                personality.personality_picture,
                personality.birth_date,
                personality.death_date,
                personality.notable_movies,
                personality.notable_series,
                personality.profession,
                personality.biography
            ]
        );
        return personalityCreated;
    }
    // R - CRUD - READ
    async readPersonalities() {
        const [personalities] = await this.database.query(
            `SELECT * FROM ${this.table}`
        );
        return personalities;
    }

    async readPersonalityById(id) {
        const [personality] = await this.database.query(
            `SELECT * FROM ${this.table} WHERE id = ?`,
            [id]
        );
        return personality[0];
    }

    // U - CRUD - UPDATE
    async updatePersonality(id, personality) {
        const [personalityUpdated] = await this.database.query(
            `UPDATE ${this.table} SET fullname = ?, personality_picture = ?, birth_date = ?, death_date = ?, notable_movies = ?, notable_series = ?, profession = ?, biography = ? WHERE id = ?`,
            [
                personality.fullname,
                personality.personality_picture,
                personality.birth_date,
                personality.death_date,
                personality.notable_movies,
                personality.notable_series,
                personality.profession,
                personality.biography,
                id
            ]
        );
        return personalityUpdated;
    }
    // D - CRUD - DELETE
    async deletePersonality(id) {
        const [personalityDeleted] = await this.database.query(
            `DELETE FROM ${this.table} WHERE id = ?`,
            [id]
        );
        return personalityDeleted;
    }
}

module.exports = PersonalityManager;