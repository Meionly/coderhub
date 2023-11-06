const { OPERATION_IS_NOT_ALLOWED, RESOURCE_IS_NOT_EXISTS } = require("../config/error");
const permissionService = require("../service/permission.service");

// 验证: 验证登录用户是否有操作moment的权限
// const verifyMomentPermission = async (ctx, next) => {
//   // 1.获取登录用户id/修改动态的id
//   const { id: user_id } = ctx.user;
//   const { momentId } = ctx.params;
//   // 2.查询user的id是否有修改momentId的权限
//   const isPermission = await momentService.momentPermission(momentId, user_id);
//   if (!isPermission) {
//     return ctx.app.emit("error", OPERATION_IS_NOT_ALLOWED, ctx);
//   }

//   // 3.执行下一个中间件
//   await next();
// };

const verifyPermission = async (ctx, next) => {
  // 1.获取登录用户id
  const { id: user_id } = ctx.user;
  // 2.获取资源的name/id
  // console.log(ctx.params, "[][][][][][", Object.keys(ctx.params));
  // name。=> moment/user/comment/label
  // params: { momentId: 4 }
  // keyName => momentId
  const keyName = Object.keys(ctx.params)[0];
  const resourceId = ctx.params[keyName];
  const resourceName = keyName.replace("Id", "");
  // 3.查询数据库是否存在该资源
  const isHasResource = await permissionService.checkIsResource(resourceName, resourceId);
  if (!isHasResource) {
    return ctx.app.emit("error", RESOURCE_IS_NOT_EXISTS, ctx);
  }
  // 4.查询user的id是否有修改momentId的权限
  const isPermission = await permissionService.checkPermission(resourceName, resourceId, user_id);
  if (!isPermission) {
    return ctx.app.emit("error", OPERATION_IS_NOT_ALLOWED, ctx);
  }

  // 3.执行下一个中间件
  await next();
};

// module.exports = {verifyMomentPermission};
module.exports = { verifyPermission };
