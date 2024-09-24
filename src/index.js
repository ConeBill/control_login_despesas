const express = require('express');
const app = express();
const cadastro = require('./routes/cadastro');
const login = require('./routes/login');
const { json } = require('sequelize');

app.use(express.json());

app.use('/cadastro', cadastro);
app.use('/login', login);

app.listen(3000, ()=> {
    console.log('escutando na porta 3000');
});