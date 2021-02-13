const db = require("../db");
const { userFromID } = require("./user");
const User = require("./user");

class Pet {
  static async update(user_id, petStats) {
    const user = await userFromID(user_id);
    const { food, play, love, mood } = petStats;
    const result = await db.query(
      `UPDATE pets
       SET food=$1, play=$2, love=$3, mood=$4
       WHERE pet_id = $5
       RETURNING *
      `,
      [food, play, love, mood, user.pet_id]
    );
    return result.rows[0];
  }

  static async petFromUserId(user_id) {
    let pet;
    await db
      .query(
        `SELECT * FROM pets
       LEFT JOIN users on pets.pet_id = users.pet_id
       WHERE user_id = $1
      `,
        [user_id]
      )
      .then((res) => (pet = { ...res.rows[0] }));
    return pet;
  }

  static async giveHeart(username) {
    const today = new Date().toISOString();
    const user = await User.get(username);
    const result = await db.query(
      `UPDATE pets
       SET lastHeart = $1
       WHERE pet_id = $2
       RETURNING lastHeart
       `,
      [today, user.pet_id]
    );
    return result.rows[0];
  }

  static async choosePet(user_id, species, name) {
    const doesExist = await this.petFromUserId(user_id);
    if (doesExist) {
      const result = await db.query(
        `UPDATE pets
             SET name = $1, species = $2
             WHERE pet_id = $3
             RETURNING pet_id
            `,
        [name, species, doesExist.pet_id]
      );
      return result.rows[0];
    } else {
      const lastHeart = new Date().toISOString();
      const pet_id = await db.query(
        `INSERT INTO pets
             (name, species, mood, love, play, food, lastHeart)
             VALUES ($1, $2, 'happy', 160, 160, 160, $3)
             RETURNING pet_id
            `,
        [name, species, lastHeart]
      );
      const result = await db.query(
        `UPDATE users
                SET pet_id = $2
                WHERE user_id=$1
                RETURNING pet_id
                `,
        [user_id, pet_id.rows[0].pet_id]
      );
      return result.rows[0];
    }
  }
}

module.exports = Pet;
