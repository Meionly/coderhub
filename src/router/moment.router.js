const KoaRouter = require("@koa/router");
const { createMoment, getList, momentDetail, updateMoment, deleteMoment } = require("../controller/moment.controller");
const { verifyAuth } = require("../middleware/login.middleware");
const { verifyPermission } = require("../middleware/permission.middleware");

const momentRouter = new KoaRouter({ prefix: "/moments" });

// 编写接口
// 1.增:新增动态
momentRouter.post("/", verifyAuth, createMoment);
// 2.查:查询动态(列表/id)
momentRouter.get("/list", getList);
momentRouter.get("/:momentId", momentDetail);
// 3.改:修改动态
// 验证:登录的用户才能修改动态
// momentRouter.patch("/:momentId", verifyAuth, verifyMomentPermission, updateMoment);
momentRouter.patch("/:momentId", verifyAuth, verifyPermission, updateMoment);
// 4.删:删除动态
// momentRouter.delete("/:momentId", verifyAuth, verifyMomentPermission, deleteMoment);
momentRouter.delete("/:momentId", verifyAuth, verifyPermission, deleteMoment);

module.exports = momentRouter;
