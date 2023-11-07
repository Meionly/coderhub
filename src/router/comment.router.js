const KoaRouter = require("@koa/router");
const { verifyAuth } = require("../middleware/login.middleware");
const { commentCreate, replyComment, deleteComment } = require("../controller/comment.controller");
const { verifyPermission } = require("../middleware/permission.middleware");

const commentRouter = new KoaRouter({ prefix: "/comments" });

// 增: .新增评论
commentRouter.post("/", verifyAuth, commentCreate);
// 增:回复评论
commentRouter.post("/reply", verifyAuth, replyComment);
// 删:删除评论
commentRouter.delete("/:commentId", verifyAuth, verifyPermission, deleteComment);

module.exports = commentRouter;
