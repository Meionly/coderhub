const connection = require("../app/database");

class UserService {
  async save(user) {
    // console.log(user, "保存数据库");
    // 1.获取用户user
    const { name, password } = user;

    // 2.拼接statement
    const statement = `INSERT INTO user (name, password) VALUES(?,?)`;

    // 3.执行sql语句
    const result = await connection.execute(statement, [name, password]);
    return result;
  }

  async findUserByName(name) {
    // `用户是否存在~`
    const statement = `SELECT * FROM user WHERE name = ?;`;
    const [values] = await connection.execute(statement, [name]);
    return values;
  }
}

module.exports = new UserService();
