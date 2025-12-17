const AbstractManager = require("../AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  // C - CRUD - Create
  async createUser(user) {
    const [userCreated] = await this.database.query(
      `INSERT INTO ${this.table} (username, avatar, email, password_hash, created_at ) VALUES (?, ?, ?, ?, NOW())`,
      [
        user.username,
        user.avatar,
        user.email,
        user.password_hash,
        user.created_at,
      ]
    );
    return userCreated;
  }

  // R - CRUD - Read
  async readUsers() {
    const [users] = await this.database.query(`SELECT * FROM ${this.table}`);
    return users;
  }

  async readUserId(id) {
    const [user] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return user[0];
  }

  // U - CRUD - Update
  async updateUser(id, user) {
    const fieldsToUpdate = [];
    const values = [];

    if (user.username) {
      fieldsToUpdate.push('username = ?');
      values.push(user.username);
    }
    if (user.email) {
      fieldsToUpdate.push('email = ?');
      values.push(user.email);
    }
    if (user.birthdate) {
      fieldsToUpdate.push('birthdate = ?');
      values.push(user.birthdate);
    }
    if (user.avatar) {
      fieldsToUpdate.push('avatar = ?');
      values.push(user.avatar);
    }
    if (typeof user.isValidated !== "undefined") {
      fieldsToUpdate.push('isValidated = ?');
      values.push(user.isValidated);
    }
    if (
      typeof user.password === "string" &&
      user.password.trim() !== ""
    ) {
      fieldsToUpdate.push('password = ?');
      values.push(user.password);
    }
    if (user.role) {
      fieldsToUpdate.push('role = ?');
      values.push(user.role);
    }

    if (fieldsToUpdate.length === 0) {
      throw new Error('Aucune donnée à mettre à jour.');
    }

    values.push(id);

    const query = `UPDATE ${this.table} SET ${fieldsToUpdate.join(', ')} WHERE id = ?`;
    const [result] = await this.database.query(query, values);
    return result;
  }

  // D - CRUD - Delete
  async deleteUser(id) {
    const [deletedUser] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return deletedUser;
  }
}

module.exports = UserManager;
