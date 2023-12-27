//Imports
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { eAdmin } = require('./middlewares/auth')

app.use(express.json())

//Private route
app.get('/', eAdmin, async (req, res) => {
    return res.json({
        error: false,
        msg: "Listar usuarios",
        id_usuario_logado: req.userId
    })
});

app.post('/cadastrar', async (req, res) => {
    const password = await bcrypt.hash('1234', 8)
    
    console.log(password)

    return res.json({
        error: false,
        msg: 'Cadastrar usuario'
    })
});

app.post('/login', async (req, res) => {
    console.log(req.body)

    //Retorno quando os dados estao errados
    if(req.body.email != "pierre@aquino.com"){
        return res.status(400).json({
            error: true,
            msg: "E-mail incorreto"
        })
    }

    encryptedPassword = "$2b$08$m/RDoPiP6O5le/dtLo/hhO7TlpLiHdkhSEIY/GDm56Wd7fG27SubG"
    if(!(await bcrypt.compare(req.body.password, encryptedPassword))){
        return res.status(400).json({
            error: true,
            msg: "Senha incorreta"
        })
    }

    //Return quando os dados estão corretos
    var token = jwt.sign({ id: 1 }, "A1S2D3FR4F43F3F43", {
        //expiresIn: 600 -> 10min
        expiresIn: '2d', // -> 2 Dias
    })

    return res.json({
        error: false,
        msg: "Login efetuado com sucesso",
        token: token
    })
});



//Server listeing
app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001')
})