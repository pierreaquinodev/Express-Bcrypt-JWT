const jwt = require("jsonwebtoken")
const { promisify } = require('util')

module.exports = {
    eAdmin: async function (req, res, next){
        const authHeader = req.headers.authorization
        console.log(authHeader)
        if(!authHeader){
            return res.status(400).json({
                error: true,
                msg: 'Usuario não autenticado'
            })
        }

        const [bearer, token] = authHeader.split(" ");
        console.log(`Token: ${token}`)

        if(!token){
            return res.status(400).json({
                error: true,
                msg: "Erro, favor efetuar o login usando o token"
            })
        }

        try {
            const decode = await promisify(jwt.verify)(token, "A1S2D3FR4F43F3F43")
            req.userId = decode.id
            return next()

        } catch (error) {
            return res.status(400).json({
                error: true,
                msg: "Erro, Token invalido"
            })
        }
    }
}