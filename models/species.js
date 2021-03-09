const db = require("../db");

class Species {
  static async getSpecies(id) {
    let species;
    await db
      .query(
        `SELECT * FROM species
       WHERE id = $1
      `,
        [id]
      )
      .then((res) => (species = res.rows[0]));
    return species;
  }

  static async getAll() {
    const res = await db.query(`SELECT * FROM species`);
    return res.rows;
  }
}

module.exports = Species;
