import jwt from 'jsonwebtoken';
import segredo from '../config/segredo.js';

export default function autenticacao(req, res, next) {
  const { authorization } = req.headers;
  try {
    jwt.verify(authorization, segredo);

    next()
  } catch (error) {
    res.status(401).json({
      mensagem: `Não autorizado: ${error.message}`,
    })
  }
} 