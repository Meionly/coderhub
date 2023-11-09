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
  async queryLabelList(offset = 0, size = 10) {
    const statement = `SELECT * FROM label LIMIT ?,?`;
    const [result] = await connection.execute(statement, [String(offset), String(size)]);
    return result;
  }
  async hasLabel(momentId, labelId) {
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ? `;
    const [result] = await connection.execute(statement, [momentId, labelId]);
    return !!result.length; //Boolean(result.length)
  }
  async addLabelById(momentId, labelId) {
    const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES (?,?);`;
    const [result] = await connection.execute(statement, [momentId, labelId]);
    return result;
  }
}

module.exports = new LabelService();
