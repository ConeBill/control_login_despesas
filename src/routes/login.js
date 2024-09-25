const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../model/usuarioModel');

const JWT_SECRET = 'baibibaibidobirulaibi2024';

router.post('/', async (req, res) => {
    const { Usr, SenhaUsr } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { Usr: Usr } });
        if (!usuario) {
            return res.status(404).json({ msg: 'Usuário não encontrado' });
        }

        const senhaValida = await bcrypt.compare(SenhaUsr, usuario.SenhaUsr);
        if (!senhaValida) {
            return res.status(401).json({ msg: 'Senha inválida' });
        }

        const token = jwt.sign(
            { id: usuario.id, Usr: usuario.Usr },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ aut: token, usr: usuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao fazer login', detalhes: error });
    }
});

module.exports = router;
