// 错误统一处理
const app = require("../app");
const {
  NAME_IS_ALREADY_EXISTS,
  NAME_OR_PASSWORD_IS_REQUIRE,
  PASSWORD_IS_INCORRENT,
  NAME_IS_NOT_EXISTS,
  EXPIRED_TK_OR_UNAUTHORIZED,
  OPERATION_IS_NOT_ALLOWED,
  RESOURCE_IS_NOT_EXISTS,
} = require("../config/error");

app.on("error", (error, ctx) => {
  let code, message;

  switch (error) {
    case NAME_OR_PASSWORD_IS_REQUIRE:
      code = -1001;
      message = "用户名和密码不能为空";
      break;
    case NAME_IS_ALREADY_EXISTS:
      code = -1002;
      message = "用户名已被占用";
      break;
    case NAME_IS_NOT_EXISTS:
      code = -1003;
      message = "用户名不存在";
      break;
    case PASSWORD_IS_INCORRENT:
      code = -1004;
      message = "输入密码不正确";
      break;
    case EXPIRED_TK_OR_UNAUTHORIZED:
      code = -1005;
      message = "token已过期或未授权token";
      break;
    case OPERATION_IS_NOT_ALLOWED:
      code = -2001;
      message = "操作权限不够";
      break;
    case RESOURCE_IS_NOT_EXISTS:
      code = -4001;
      message = "数据库不存在";
      break;
  }

  ctx.body = { code, message };
});
