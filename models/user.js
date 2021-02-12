const db = require("../db");

class User {
  /** Register user with data. Returns new user data. */

  static async update(user) {
    const { login, node_id } = user;

    const doesExist = await db.query(
      `SELECT * 
       FROM users
       WHERE user_id = $1
       `,
      [node_id]
    );

    if (doesExist.rows[0]) {
      const result = await db.query(
        `UPDATE users
        SET username = $2
        WHERE user_id = $1
        RETURNING user_id, username
        `,
        [node_id, login]
      );
      return result.rows[0];
    } else {
      const result = await db.query(
        `INSERT INTO users 
          (user_id, username) 
        VALUES ($1, $2) 
        RETURNING user_id, username`,
        [node_id, login]
      );
      return result.rows[0];
    }

    return result.rows[0];
  }

  static async usernameFromID(user_id) {
    const result = await db.query(
      `SELECT username
            FROM users
            WHERE user_id = $1
            `,
      [user_id]
    );
    return result.rows[0].username;
  }

  /** Returns user info: {user_id, username, pet_id}
   *
   * If user cannot be found, should raise a 404.
   *
   **/

  static async get(username) {
    const result = await db.query(
      `SELECT *
         FROM users
         WHERE username = $1`,
      [username]
    );

    return result.rows[0];
  }

  /** Selectively updates user from given data
   *
   * Returns all data about user.
   *
   * If user cannot be found, should raise a 404.
   *
   **/

  static async set_pet(user_id, pet_id) {
    const result = await db.query(
      `UPDATE users
        SET pet_id=$1
        WHERE user_id=$2
        RETURNING user_id, pet_id`,
      [user_id, pet_id]
    );

    return result.rows[0];
  }
}

module.exports = User;
