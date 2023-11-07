const KoaRouter = require("@koa/router");
const { createMoment, getList, momentDetail, updateMoment, deleteMoment } = require("../controller/moment.controller");
const { verifyAuth } = require("../middleware/login.middleware");
const { verifyPermission } = require("../middleware/permission.middleware");
const { verifyLabelExists } = require("../middleware/label.middleware");

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

//5.添加标整签
/**中间件:
  1.是否登录
  2.验证是否有操作这个动态的权限
  3.额外中间件:缉证Label 的name是否已经存在于LabeL表中
    *如果存在，那么直接使用即可
    *如果没有存在那么需要先将LabeL 的name添加Label表
  4.最终步骤
    * 所有的Labels都在已经在label表
    * 动态 2，和LabeLs关系添加到关系表中
*/
momentRouter.post("/:momentId/labels", verifyAuth, verifyPermission,verifyLabelExists, (ctx, next) => {
  ctx.body = "ooooooooooooooooooooooooo";
});

module.exports = momentRouter;
