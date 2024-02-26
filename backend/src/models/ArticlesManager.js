const AbstractManager = require("./AbstractManager");

class articlesManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "articles" as configuration
    super({ table: "articles" });
  }

  // The C of CRUD - Create operation

  async create(articles) {
    // Execute the SQL INSERT query to add a new article to the "articles" table
    const [result] = await this.database.query(
      `insert into ${this.table} (title, description, created_at, author_id, content, image_src, image_alt, caption, category) values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        articles.title,
        articles.description,
        articles.created_at,
        articles.author_id,
        articles.content,
        articles.image_src,
        articles.image_alt,
        articles.caption,
        articles.category,
      ]
    );

    // Return the ID of the newly inserted articles
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific article by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the articles
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all articles from the "articles" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of articles
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing article

  async update(id, articles) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET ? WHERE id = ?`,
      [articles, id]
    );
    return result.insertId;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an article by its ID

  async delete(id) {
    const result = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return result;
  }
}

module.exports = articlesManager;
