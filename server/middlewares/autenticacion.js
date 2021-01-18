//Verificar token
const jwt = require('jsonwebtoken');

let verificaToken = (req, res, next) => {
    let token = req.get('token');

    jwt.verify(token, 'Esta-es-la-semilla-de-desarrollo', (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: { message: 'token no válido' }
            })


        }
        req.usuario = decoded.usuario;
        next();
    })

};


//verifica admin role

let verificaAdmin_Role = (req, res, next) => {
    let usuario = req.usuario;
    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        res.json({
            ok: false,
            err: { message: 'Usted no es el usuario administrador' }
        })
    }


}

module.exports = {
    verificaToken,
    verificaAdmin_Role
}