const AbstractManager = require("./AbstractManager");


class PersonalityManager extends AbstractManager {
    constructor() {
        super({ table: "personalities"});
    }

    // C - CRUD - Create
    async createPersonality(personality) {
        const [personalityCreated] = await this.database.query(
            `INSERT INTO ${this.table} (fullname, picture, birthdate, deathdate, nationality, profession, notable_works, sexe, biography) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                personality.fullname,
                personality.picture,
                personality.birthdate,
                personality.deathdate,
                personality.nationality,
                personality.profession,
                personality.notable_works,
                personality.sexe,
                personality.biography,
            ]
        );
        return personalityCreated;
    }

    // R - CRUD - Read
    async readPersonalities() {
        const [personalities] = await this.database.query(`SELECT * FROM ${this.table}`);
        return personalities;
    }

    async readPersonalityId(id) {
        const [personality] = await this.database.query(
            `SELECT * FROM ${this.table} WHERE id = ?`,
            [id]
        );
        return personality[0];
    }

    // U - CRUD - Update
    async updatePersonality(id, personality) {
        const [updatedPersonality] = await this.database.query(
            `UPDATE ${this.table} SET fullname = ?, picture = ?, birthdate = ?, deathdate = ?, nationality = ?, profession = ?, notable_works = ?, sexe = ?, biography = ? WHERE id = ?`,
            [
                personality.fullname,
                personality.picture,
                personality.birthdate,
                personality.deathdate,
                personality.nationality,
                personality.profession,
                personality.notable_works,
                personality.sexe,
                personality.biography,
                id,
            ]
        );
        return updatedPersonality;
    }

    // D - CRUD - DELETE 
    async deletePersonality(id) {
        const [deletedPersonality] = await this.database.query(
            `DELETE FROM ${this.table} WHERE id = ?`,
            [id]
        );
        return deletedPersonality;
    }

}

module.exports = PersonalityManager;