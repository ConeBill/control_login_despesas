const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../model/usuarioModel');

router.post('/', async (req, res) => {
    const { Usr, SenhaUsr } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { Usr: Usr } });
        if (!usuario) {
            return res.status(404).json({
                status: 404,
                msg: 'Usuário não encontrado'
            });
        }

        const senhaValida = await bcrypt.compare(SenhaUsr, usuario.SenhaUsr);
        if (!senhaValida) {
            return res.status(401).json({
                status: 401,
                msg: 'Senha inválida'
            });
        }

        const token = jwt.sign(
            { id: usuario.id, Usr: usuario.Usr },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            status: 200,
            aut: token,
            usr: usuario.Usr,
            idusr: usuario.IdUsr
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            error: 'Erro ao fazer login',
            detalhes: error
        });
    }
});

module.exports = router;
