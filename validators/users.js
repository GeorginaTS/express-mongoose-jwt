import  {check, validationResult} from "express-validator"
import jwt from "jsonwebtoken"

export const validatorUser = [
    check("name").exists().notEmpty().isLength({min:3, max:16}),
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty(),
    check("profile").exists().notEmpty(),
    check("active").exists().notEmpty().isBoolean(),
    (request, response, next) => {
        try {
            validationResult(request).throw()
            return next()
        } catch(error) {
            response.status(403).send({errors : error.array()})
        }
    }
]
//  MIDDLEWARE 

export const authenticateToken = (req, res, next) => {

    // Recibe el token mediante el header authorization
    const authHeader = req.headers['authorization']
  
    // obtiene el token 
    const token = authHeader && authHeader.split(' ')[1]
  
    // Se valida que el token sea enviado en caso contrario manda un error
    if (token == null) return res.status(401).send({msg : 'No token'})
  
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
  
      // VERIFICAMOS QUE EL TOKEN COINCIDA CON LA CONTRASENA
      if (err) return  res.status(403).send({msg : 'Token invalid'})
      req.token = user
      next()
    })
  }