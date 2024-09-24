const bcrypt = require('bcrypt');

const gerarHash = async (senha) => {
    return await bcrypt.hash(senha, 10);
}

module.exports = gerarHash;
