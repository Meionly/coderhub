const connection = require("../app/database");

class PermissionService {
  // async momentPermission(momentId, user_id) {
  //   const statement = `SELECT * FROM moment WHERE id = ? AND user_id = ?;`;
  //   const [result] = await connection.execute(statement, [momentId, user_id]);
  //   return !!result.length;
  // }

  async checkPermission(resourceName, resourceId, userId) {
    const statement = `SELECT * FROM ${resourceName} WHERE id =? AND user_id =?;`;
    const [result] = await connection.execute(statement, [resourceId, userId]);
    return !!result.length;
  }

  async checkIsResource(resourceName, resourceId) {
    const statement = `SELECT * FROM ${resourceName} WHERE id = ?;`;
    const [result] = await connection.execute(statement, [resourceId]);
    return !!result.length;
  }
}

module.exports = new PermissionService();
