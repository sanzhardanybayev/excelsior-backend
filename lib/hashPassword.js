const bcrypt = require('bcrypt')


const hashPassword = (password) => {
  const saltRounds = 10
  let salt = bcrypt.genSaltSync(saltRounds)
  return bcrypt.hashSync(password, salt)
}

module.exports = hashPassword
