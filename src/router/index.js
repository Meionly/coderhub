const fs = require("fs");

const registerRouters = (app) => {
  // 1.读取当前文件夹下的所有文件
  const files = fs.readdirSync(__dirname);

  // 2.遍历所有的文件
  for (const file of files) {
    // 3.判断当前文件是否是.router.js文件
    if (!file.endsWith(".router.js")) continue;
    // 4.加载当前文件
    const router = require(`./${file}`);
    // 5.挂载路由
    app.use(router.routes());
    app.use(router.allowedMethods());
  }
};

module.exports = registerRouters;
