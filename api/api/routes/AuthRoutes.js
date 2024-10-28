import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import Aluno from "../entities/Aluno.js";
import segredo from '../config/segredo.js';
import Administrativo from "../entities/Administrativo.js";

export default Router()
  .post('/aluno', async (req, res) => {
    const {
      email,
      senha,
    } = req.body;
    try {
      if (!email) {
        throw new Error('Email é obrigatório')
      }

      if (!senha) {
        throw new Error('Senha é obrigatório')
      }

      const aluno = await Aluno.findOne({
        where: { email },
      });

      if (!aluno) {
        throw new Error('Aluno não cadastrado, Email ou senha inválidos');
      }

      const comparaSenha = await bcrypt.compare(senha, aluno.senha);

      if (!comparaSenha) {
        throw new Error('Senha incorreta');
      }

      const payload = {
        id: aluno.id,
        nome: aluno.nome,
        email: aluno.email,
      }

      const token = jwt.sign(payload, segredo, {
        expiresIn: 60 * 60 * 3, // 3 horas
      });

      res.status(202).json({
        mensagem: 'Aluno autorizado',
        token,
        payload,
      })
    } catch (error) {
      res.status(401).json({
        mensagem: `Não autorizado: ${error.message}`,
      })
    }
  })
  .post('/admin', async (req, res) => {
    const {
      email,
      senha,
    } = req.body;
    try {
      if (!email) {
        throw new Error('Email é obrigatório')
      }

      if (!senha) {
        throw new Error('Senha é obrigatório')
      }
      
      const administrativo = await Administrativo.findOne({
        where: { email },
      });

      if (!administrativo) {
        throw new Error('Admin não cadastrado, Email ou senha inválidos');
      }

      const comparaSenha = await bcrypt.compare(senha, administrativo.senha);

      if (!comparaSenha) {
        throw new Error('Senha incorreta');
      }

      const payload = {
        id: administrativo.id,
        nome: administrativo.nome,
        email: administrativo.email,
      }

      const token = jwt.sign(payload, segredo, {
        expiresIn: 60 * 60 * 3, // 3 horas
      });

      res.status(202).json({
        mensagem: 'Admin autorizado',
        token,
        payload
      })
    } catch (error) {
      res.status(401).json({
        mensagem: `Não autorizado: ${error.message}`,
      })
    }
  })