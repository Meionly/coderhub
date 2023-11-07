const connection = require("../app/database");

class LabelService {
  async labelSave(name) {
    const statement = `INSERT INTO label (name) VALUES (?);`;
    const [result] = await connection.execute(statement, [name]);
    return result;
  }
  async queryLabelByName(name) {
    const statement = `SELECT * FROM label WHERE name = ?;`;
    const [result] = await connection.execute(statement, [name]);
    return result[0];
  }
  async labelCreate(name) {
    const statement = `INSERT INTO label (name) VALUES (?);`;
    const [result] = await connection.execute(statement, [name]);
    return result;
  }
  async queryLabelList(offset = 0, size = 10) {
    const statement = `SELECT * FROM label LIMIT ?,?`;
    const [result] = await connection.execute(statement, [String(offset), String(size)]);
    return result;
  }
}

module.exports = new LabelService();
