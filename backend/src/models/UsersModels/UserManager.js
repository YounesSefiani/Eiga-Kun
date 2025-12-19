const AbstractManager = require("../AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  // C - CRUD - Create
  async createUser(user) {
    try {
      const errors = [];
      const age =
        new Date().getFullYear() - new Date(user.birthdate).getFullYear();
      if (age < 18) {
        errors.push("Vous devez avoir au moins 18 ans pour vous inscrire.");
      }

      if (!user.username || user.username.trim() === "") {
        errors.push("Le nom d'utilisateur est requis.");
      }

      const [existingUsername] = await this.database.query(
        `SELECT id FROM ${this.table} WHERE username = ?`,
        [user.username]
      );
      if (existingUsername.length > 0) {
        errors.push("Ce nom d'utilisateur est déjà pris.");
      }

      if (!user.email || user.email.trim() === "") {
        errors.push("L'email est requis.");
      }

      const [existingEmail] = await this.database.query(
        `SELECT id FROM ${this.table} WHERE email = ?`,
        [user.email]
      );
      if (existingEmail.length > 0) {
        errors.push("Cet email est déjà utilisé.");
      }

      if (!user.password || user.password.trim() === "") {
        errors.push("Le mot de passe est requis.");
      }

      if (errors.length > 0) {
        throw new Error(errors.join(" // "));
      }
      const [userCreated] = await this.database.query(
        `INSERT INTO ${this.table} (username, birthdate, avatar, email, password, created_at ) VALUES (?, ?, ?, ?, ?, NOW())`,
        [
          user.username,
          user.birthdate,
          user.avatar,
          user.email,
          user.password,
          user.created_at,
        ]
      );
      return userCreated;
    } catch (error) {
      throw error;
    }
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

  async findUserByEmail(email) {
    const [user] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE email = ?`,
      [email]
    );
    return user[0];
  }

  // U - CRUD - Update
  async updateUser(id, user) {
    const fieldsToUpdate = [];
    const values = [];

    if (user.username) {
      fieldsToUpdate.push("username = ?");
      values.push(user.username);
    }
    if (user.email) {
      fieldsToUpdate.push("email = ?");
      values.push(user.email);
    }
    if (user.birthdate) {
      fieldsToUpdate.push("birthdate = ?");
      values.push(user.birthdate);
    }
    if (user.avatar) {
      fieldsToUpdate.push("avatar = ?");
      values.push(user.avatar);
    }
    if (typeof user.isValidated !== "undefined") {
      fieldsToUpdate.push("isValidated = ?");
      values.push(user.isValidated);
    }
    if (typeof user.password === "string" && user.password.trim() !== "") {
      fieldsToUpdate.push("password = ?");
      values.push(user.password);
    }
    if (user.role) {
      fieldsToUpdate.push("role = ?");
      values.push(user.role);
    }

    if (fieldsToUpdate.length === 0) {
      throw new Error("Aucune donnée à mettre à jour.");
    }

    values.push(id);

    const query = `UPDATE ${this.table} SET ${fieldsToUpdate.join(
      ", "
    )} WHERE id = ?`;
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
