const labelService = require("../service/label.service");

class LabelController {
  async labelCreate(ctx, next) {
    //  1.获取标签的名称name
    const { name } = ctx.request.body;
    // 2.操作数据库存储name
    const result = await labelService.labelSave(name);
    // 3.返回结果
    ctx.body = {
      code: 200,
      message: "添加标签成功",
      data: result,
    };
  }
  async queryList(ctx, next) {
    // 获取offset,size
    const { offset, size } = ctx.query;
    // 从数据库中查询列表
    const result = await labelService.queryLabelList(offset, size);
    ctx.body = {
      code: 200,
      message: "获取标签列表成功",
      data: result,
    };
  }
}

module.exports = new LabelController();
