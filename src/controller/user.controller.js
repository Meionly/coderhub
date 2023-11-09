const fs = require("fs");
const path = require("path");
const fileService = require("../service/file.service");
const userService = require("../service/user.service");
const { UPLOAD_PATH } = require("../config/path");
const { RESOURCE_IS_NOT_EXISTS } = require("../config/error");

class UserController {
  async create(ctx, next) {
    // 1.获取用户传递过来信息
    const user = ctx.request.body;

    // 2.将user信息存储到数据库中
    const result = await userService.save(user);

    // 3.查看存储的结果,告知前段创建成功
    ctx.body = {
      message: "创建用户成功~",
      data: result,
    };
  }

  async userAvatar(ctx, next) {
    // 1.获取用户的id
    const { userId } = ctx.params;
    // 2.获取userId对应的头像信息
    const avatarInfo = await fileService.queryUserAvatar(userId);
    if (avatarInfo.length === 0) return ctx.app.emit("error", RESOURCE_IS_NOT_EXISTS, ctx);
    // if (avatarInfo.length === 0) {
      //   ctx.body = {
    //     code: 0,
    //     message: "RESOURCE_IS_NOT_EXISTS",
    //     data: avatarInfo,
    //   };
    // }
    const { filename, mimetype } = avatarInfo;
    // 3.读取头像所在的文件
    ctx.type = mimetype;
    ctx.body = fs.createReadStream(`${UPLOAD_PATH}/${filename}`);
    // ctx.body = {
    //   code: 200,
    //   message: "获取头像成功~",
    //   data: result,
    // };
  }
}

module.exports = new UserController();
