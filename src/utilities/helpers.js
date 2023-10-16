const bcrypt = require("bcryptjs");

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
};

const comparePassword = (raw, hashed) => {
    return bcrypt.compareSync(raw, hashed);
};

module.exports = { hashPassword, comparePassword };
