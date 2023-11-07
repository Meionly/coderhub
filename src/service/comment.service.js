const connection = require("../app/database");

class CommentService {
  async saveComment(content, momentId, userId) {
    const statement = `INSERT INTO comment (content,moment_id,user_id) VALUES (?,?,?);`;
    const [result] = await connection.execute(statement, [content, momentId, userId]);
    return result;
  }
  async reply(content, momentId, commentId, userId) {
    const statement = `INSERT INTO comment (content,moment_id,comment_id,user_id) VALUES (?,?,?,?);`;
    const [result] = await connection.execute(statement, [content, momentId, commentId, userId]);
    return result;
  }
  async deleteById(commentId) {
    const statement = `DELETE FROM comment WHERE id = ?;`;
    const [result] = await connection.execute(statement, [commentId]);
    return result;
  }
}

module.exports = new CommentService();
