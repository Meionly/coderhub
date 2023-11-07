const labelService = require("../service/label.service");

const verifyLabelExists = async (ctx, next) => {
  // 1.获取客户端传递过来所有的Labels
  const { labels } = ctx.request.body;

  // 2.判断所有的labels中的name是否已经存在无label表
  const newLabels = [];
  for (const name of labels) {
    const result = await labelService.queryLabelByName(name);
    const labelObj = { name };
    if (result) {
      //获取name对应的abel的id
      labelObj.id = result.id; //=> {name:'篮球',id: 1}
    } else {
      //插入name,并且获取插入之后的id
      const insertResult = await labelService.labelCreate(name);
      labelObj.id = insertResult.insertId; // =>{ name: ‘篮球',id: 7]
    }
    newLabels.push(labelObj);
  }
  // 3.所有的labeLs都变成[{name:'爱情'，id: 7},{ name:'友情'，id: 8 }]
  ctx.labels = newLabels;

  await next();
};

module.exports = {
  verifyLabelExists,
};
