const labelService = require("../service/label.service");
const momentService = require("../service/moment.service");

class MomentController {
  async createMoment(ctx, next) {
    // 1.获取动态的内容
    const { content } = ctx.request.body;
    // 2.动态谁发布的(token=>id/name)
    const { id } = ctx.user;
    // 3.将动态的相关数据保存到数据库中
    const values = await momentService.saveMoment(content, id);
    ctx.body = {
      code: 200,
      message: "用户动态发布成功",
      data: values,
    };
  }

  async getList(ctx, next) {
    // 获取offset,size
    const { offset, size } = ctx.query;
    // 从数据库中查询列表
    const result = await momentService.queryList(offset, size);
    ctx.body = {
      code: 200,
      message: "获取动态列表成功",
      data: result,
    };
  }

  async momentDetail(ctx, next) {
    // 1.获取动态的id
    const { momentId } = ctx.params;
    // 2.根据id查询动态详情
    const result = await momentService.queryDetail(momentId);
    // 返回数据
    ctx.body = {
      code: 200,
      message: "获取动态详情成功",
      data: result[0],
    };
  }

  async updateMoment(ctx, next) {
    // 1.获取要修改的id
    const { momentId } = ctx.params;
    // 2.修改的内容
    const { content } = ctx.request.body;
    // 3.执行数据库操作
    const result = await momentService.updateById(content, momentId);
    // 返回数据
    ctx.body = {
      code: 200,
      message: "修改动态成功",
      data: result,
    };
  }
  async deleteMoment(ctx, next) {
    // 1获取要删除的动态id
    const { momentId } = ctx.params;
    // 2.执行数据库操作
    const result = await momentService.deleteById(momentId);
    ctx.body = {
      code: 200,
      message: "删除动态成功",
      data: result,
    };
  }
  // 为moment添加abeL
  async addLabel(ctx, next) {
    // 1.获取要添加的标签&要添加动态的id
    const { momentId } = ctx.params;
    const { labels } = ctx;
    // 2.将moment_id和Label_id添力moment_LabeL关系表
    if (!labels.length) return (ctx.body = { code: 0, message: "请输入标签名称~" });
    try {
      const newLabels = [];
      const allResult = [];
      for (const label of labels) {
        // 2.1.判断Labe_id是否已经和moment_id己经存在该数据;
        const isExists = await labelService.hasLabel(momentId, label.id);
        if (!isExists) {
          // 2.2.不存该moment_id和Label_id的关系数据;
          const result = await labelService.addLabelById(momentId, label.id);
          allResult.push(result);
        }
        newLabels.push(label);
        allResult.push(isExists);
      }
      if (newLabels.length === labels.length) {
        ctx.body = {
          code: 200,
          message: "添加标签成功",
          data: allResult,
        };
      }
    } catch (error) {
      ctx.body = {
        code: 500,
        message: "添加标签失败",
        data: error,
      };
    }
  }
}

module.exports = new MomentController();
