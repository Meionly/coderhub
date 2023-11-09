const jwt = require("jsonwebtoken");
const userService = require("../service/user.service");
const { md5Password } = require("../utils/handle-password");
const { NAME_OR_PASSWORD_IS_REQUIRE, NAME_IS_NOT_EXISTS, PASSWORD_IS_INCORRENT, EXPIRED_TK_OR_UNAUTHORIZED } = require("../config/error");
const { PUBLIC_KEY } = require("../config/secret");

const verifyLogin = async (ctx, next) => {
  // 1.判断用户名和密码是否为空
  const { name, password } = ctx.request.body;
  if (!name || !password) {
    return ctx.app.emit("error", NAME_OR_PASSWORD_IS_REQUIRE, ctx);
  }
  // 2.查询该用户是否在数据库中存在
  const users = await userService.findUserByName(name);
  const user = users[0];
  if (!user) {
    return ctx.app.emit("error", NAME_IS_NOT_EXISTS, ctx);
  }
  // 3.查询数据库中密码和用户传递的密码是否一致
  if (user.password !== md5Password(password)) {
    return ctx.app.emit("error", PASSWORD_IS_INCORRENT, ctx);
  }
  // 4.将user对象保存在ctx
  ctx.user = user;

  // 执行下一个中间件
  await next();
};

const verifyAuth = async (ctx, next) => {
  // 1.获取token
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    return ctx.app.emit("error", EXPIRED_TK_OR_UNAUTHORIZED, ctx);
  }
  const token = authorization.replace("Bearer ", "");
  // 2.验证token是否有效
  try {
    // 1.获取token中的信息
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    // 2.将token的信息保留下来
    ctx.user = result;
    // 3.执行下一个中间件
    await next();
  } catch (error) {
    ctx.app.emit("error", EXPIRED_TK_OR_UNAUTHORIZED, ctx);
  }
};

module.exports = {
  verifyLogin,
  verifyAuth,
};
