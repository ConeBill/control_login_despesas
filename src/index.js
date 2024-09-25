const express = require('express');
const app = express();
const cadastro = require('./routes/cadastro');
const login = require('./routes/login');
const cors = require('cors');
require('dotenv').config();

app.use(cors({
    origin: process.env.ORIGIN
}));

app.use(express.json());

app.use('/cadastro', cadastro);
app.use('/login', login);

app.listen(process.env.PORT, ()=> {
    console.log('escutando na porta 3000');
});