const express = require('express');
const router = express.Router();
const Usuario = require('../model/usuarioModel');
const gerarHash = require('../util/gerarHash');

router.post('/novo', async (req, res) => {
    const Usr = req.body.Usr;
    const NomeUsr = req.body.NomeUsr;
    const SenhaUsr = req.body.SenhaUsr;
    const Email = req.body.Email;

    try {
        const senhaHash = await gerarHash(SenhaUsr);

        const novoUsuario = await Usuario.create({
            Usr: Usr,
            NomeUsr: NomeUsr,
            SenhaUsr: senhaHash,
            Email: Email,
            NivelUsr: 1
        });

        res.status(201).json({
            status: 201,
            usuario: novoUsuario,
            msg: "Sucesso"
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            error: 'Erro ao criar o usuário',
            detalhes: error
        });
    }
});

module.exports = router;