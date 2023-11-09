const KoaRouter = require("@koa/router");
const { verifyAuth } = require("../middleware/login.middleware");
const { fileCreate } = require("../controller/file.controller");
const { handleAvatar } = require("../middleware/file.middleware");

const fileRouter = new KoaRouter({ prefix: "/file" });

fileRouter.post("/avatar", verifyAuth, handleAvatar, fileCreate);

module.exports = fileRouter;
