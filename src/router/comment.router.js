const KoaRouter = require("@koa/router");
const { verifyAuth } = require("../middleware/login.middleware");
const { commentCreate, replyComment } = require("../controller/comment.controller");

const commentRouter = new KoaRouter({ prefix: "/comments" });

// 增: .新增评论
commentRouter.post("/", verifyAuth, commentCreate);
// 增:回复评论
commentRouter.post("/reply", verifyAuth, replyComment);

module.exports = commentRouter;
