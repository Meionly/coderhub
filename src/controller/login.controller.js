const jwt = require("jsonwebtoken");
const { PRIVATE_KEY, PUBLIC_KEY } = require("../config/secret");
const { EXPIRED_TK_OR_UNAUTHORIZED } = require("../config/error");

class LoginController {
  signTK(ctx, next) {
    // 1.获取用户信息
    const { id, name } = ctx.user;
    // 2.颁发令牌token
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: "1d",
      algorithm: "RS256",
    });
    // 3.返回用户信息
    ctx.body = { code: 200, data: { id, name, token } };
  }

  testLogin(ctx, next) {
    ctx.body = "身份验证通过";
  }
}
module.exports = new LoginController();
