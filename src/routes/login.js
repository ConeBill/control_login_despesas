const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../model/usuarioModel');

// Chave secreta usada para assinar o token
const JWT_SECRET = 'baibibaibidobirulaibi2024';

router.post('/', async (req, res) => {
    const { Usr, SenhaUsr } = req.body;

    try {
        // Verifica se o usuário existe no banco de dados
        const usuario = await Usuario.findOne({ where: { Usr: Usr } });
        if (!usuario) {
            return res.status(404).json({ msg: 'Usuário não encontrado' });
        }

        // Compara a senha fornecida com o hash armazenado
        const senhaValida = await bcrypt.compare(SenhaUsr, usuario.SenhaUsr);
        if (!senhaValida) {
            return res.status(401).json({ msg: 'Senha inválida' });
        }

        // Cria o token JWT contendo o ID do usuário
        const token = jwt.sign(
            { id: usuario.id, Usr: usuario.Usr },
            JWT_SECRET,
            { expiresIn: '1h' } // O token expira em 1 hora
        );

        // Retorna o token para o cliente
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao fazer login', detalhes: error });
    }
});

module.exports = router;
