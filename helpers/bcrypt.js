const bcrypt = require("bcryptjs")

const hashPassword = password => {
    const salt = bcrypt.genSaltSync(8)
    const hash = bcrypt.hashSync(password, salt)

    return hash
}
const formatDate = date => {
    
}

module.exports = {hashPassword}
