const connection = require("../app/database");

class MomentService {
  async saveMoment(content, userId) {
    const statement = `INSERT INTO moment (content,user_id) VALUES (?,?);`;
    const [result] = await connection.execute(statement, [content, userId]);
    return result;
  }
  async queryList(offset = 0, size = 10) {
    const statement = `
      SELECT 
          m.id id,m.content content,m.createAt createAt,m.updateAt updateAt,
          JSON_OBJECT('id',u.id,'name',u.name,'avatarURL',u.avatar_url,'createTime',u.createAt,'updateTime',u.updateAt) user,
          (SELECT COUNT(*) FROM comment WHERE comment.moment_id = m.id) commentCount,
          (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount
      FROM moment m
      LEFT JOIN user u ON u.id = m.user_id
      LIMIT ? OFFSET ?;`;
    const [result] = await connection.execute(statement, [String(size), String(offset)]);
    return result;
  }
  async queryDetail(id) {
    // const statement = `
    //   SELECT
    //     m.id id,m.content content,m.createAt createAt,m.updateAt updateAt,
    //     JSON_OBJECT('id',u.id,'name',u.name,'createTime',u.createAt,'updateTime',u.updateAt) user
    //   FROM moment m
    //   LEFT JOIN user u ON u.id = m.user_id
    //   WHERE m.id =?
    // `;
    const statement = `
      SELECT 
        m.id id,m.content content,m.createAt createAt,m.updateAt updateAt,
        JSON_OBJECT('id',u.id,'name',u.name,'createAt',u.createAt,'updateAt',u.updateAt) user,
        (
          JSON_ARRAYAGG(JSON_OBJECT(
            'id',c.id,'content',c.content,'commentId',c.comment_id,'createAt',c.createAt,'updateAt',c.updateAt,
            'user',JSON_OBJECT('id',cu.id,'name',cu.name,'avatarURL',cu.avatar_url) 
          ))
        ) comments
      FROM moment m 
      LEFT JOIN user u ON u.id = m.user_id
      LEFT JOIN comment c ON c.moment_id = m.id
      LEFT JOIN user cu ON cu.id = c.user_id
      WHERE m.id = ?
      GROUP BY m.id;
    `;
    const [result] = await connection.execute(statement, [id]);
    return result;
  }
  async updateById(content, id) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?`;
    const [result] = await connection.execute(statement, [content, id]);
    return result;
  }
  async deleteById(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?;`;
    const [result] = await connection.execute(statement, [momentId]);
    return result;
  }
}
module.exports = new MomentService();
