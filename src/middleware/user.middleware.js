const userService = require("../service/user.service.js");
const { NAME_OR_PASSWORD_IS_REQUIRE, NAME_IS_ALREADY_EXISTS } = require("../config/error.js");
const { md5Password } = require("../utils/handle-password.js");

async function verifyUser(ctx, next) {
  // 验证客户端传递过来的user是否可以保存到数据库中
  // 1.验证用户名和密码是否为空
  const { name, password } = ctx.request.body;
  if (!name || !password) {
    // ctx.body = {
    //   code: -1001,
    //   message: "用户名和密码不能为空",
    // };
    return ctx.app.emit("error", NAME_OR_PASSWORD_IS_REQUIRE, ctx);
  }
  // 2.判断name是否在数据库中已经存在;
  const findName = await userService.findUserByName(name);
  if (findName.length) {
    // ctx.body = {
    //   code: -1002,
    //   message: "用户名已经存在",
    // };
    return ctx.app.emit("error", NAME_IS_ALREADY_EXISTS, ctx);
  }

  // 3.执行下一个中间件
  await next();
}

const handlePassword = async (ctx, next) => {
  // 密码进行加密
  // 1.取出密码
  const { password } = ctx.request.body;

  // 2.对密码进行加密(md5)
  ctx.request.body.password = md5Password(password);

  // 3.执行下一个中间件
  await next();
};

module.exports = {
  verifyUser,
  handlePassword,
};
