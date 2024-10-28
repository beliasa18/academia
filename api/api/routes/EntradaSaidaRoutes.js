import { Router } from 'express';
import EntradaSaida from '../entities/EntradaSaida.js';
import Aluno from '../entities/Aluno.js';

export default Router()
  .post('/', async (req, res) => {
    const {
      idAluno,
      entradaSaida,
    } = req.body;
    try {
      let dataHora = new Date();

      const novaEntradaSaida = await EntradaSaida.create({
        id_aluno: idAluno,
        entrada_saida: entradaSaida,
        data_hora: dataHora,
      });

      res.status(201).json({
        mensagem: 'Entrada ou saída cadastrado com sucesso',
        dados: novaEntradaSaida,
      });
    } catch (error) {
      res.status(500).json({
        mensagem: error.message,
      })
    }
  })
  .get('/', async (req, res) => {
    const entradasSaidas = await EntradaSaida.findAll({
      include: [
        {
          model: Aluno,
          attributes: ['nome']
        }
      ]
    });
    res.status(200).json(entradasSaidas);
  });