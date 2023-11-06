const commentService = require("../service/comment.service");

class CommentController {
  async commentCreate(ctx, next) {
    // 1.获取body中参数
    const { content, momentId } = ctx.request.body;
    const { id: userId } = ctx.user;
    // 2.操作数据库, .将数据进行存储
    const result = await commentService.saveComment(content, momentId, userId);

    ctx.body = {
      code: 200,
      message: "发表评论成功",
      data: result,
    };
  }

  async replyComment(ctx, next) {
    const { content, momentId, commentId } = ctx.request.body;
    const { id: userId } = ctx.user;
    const result = await commentService.reply(content, momentId, commentId, userId);
    ctx.body = {
      code: 200,
      message: "回复评论成功",
      data: result,
    };
  }
}

module.exports = new CommentController();
