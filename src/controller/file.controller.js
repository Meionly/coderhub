const fileService = require("../service/file.service");
const userService = require("../service/user.service");
const { SERVER_HOST, SERVER_PORT } = require("../config/server");

class FileController {
  async fileCreate(ctx, next) {
    // // 1.获取对应的信息
    const { filename, mimetype, size } = ctx.request.file;
    const { id: userId } = ctx.user;
    // // 2.将图片信息和id结合起来进行存储
    const result = await fileService.fileSave(filename, mimetype, size, userId);
    // 3.将头像的地址信息，·保存到user表中
    const avatarUrl = `${SERVER_HOST}:${SERVER_PORT}/users/avatar/${userId}`;
    const avatar = await userService.updateUserAvatar(avatarUrl, userId);

    // 3.返回结果
    ctx.body = {
      code: 200,
      message: "文件上传成功~",
      data: avatarUrl,
    };
  }
}
module.exports = new FileController();
