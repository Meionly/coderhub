const KoaRouter = require("@koa/router");
const { verifyAuth } = require("../middleware/login.middleware");
const { verifyPermission } = require("../middleware/permission.middleware");
const { labelCreate, queryList } = require("../controller/label.controller");

const labelRouter = new KoaRouter({ prefix: "/labels" });

// 创建标签
labelRouter.post("/", verifyAuth, labelCreate);
// 标签列表
labelRouter.get("/list", verifyAuth, queryList);

module.exports = labelRouter;
