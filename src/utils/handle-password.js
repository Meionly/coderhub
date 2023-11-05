// node中一个用于加密的库
const crypto = require("crypto");

// const md5Password = (password) => {
//   return crypto.createHash('md5').update(password).digest('hex');
// };

// 用md5进行加密
const md5Password = (password) => {
  const md5 = crypto.createHash("md5");
  const mdPassword = md5.update(password).digest("hex");
  return mdPassword;
};

module.exports = {
  md5Password,
};
