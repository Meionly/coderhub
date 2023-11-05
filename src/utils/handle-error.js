// 错误统一处理

const app = require("../app");
const { NAME_IS_ALREADY_EXISTS, NAME_OR_PASSWORD_IS_REQUIRE } = require("../config/error");

app.on("error", (error, ctx) => {
  let code, message;

  switch (error) {
    case NAME_OR_PASSWORD_IS_REQUIRE:
      code = -1001;
      message = "用户名和密码不能为空";
      break;
    case NAME_IS_ALREADY_EXISTS:
      code = -1002;
      message = "用户名已经存在";
      break;
  }

  ctx.body = { code, message };
});
