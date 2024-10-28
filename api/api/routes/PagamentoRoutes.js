import { Router } from 'express';
import Pagamento from '../entities/Pagamento.js';
import Aluno from '../entities/Aluno.js';

export default Router()
  .post('/', async (req, res) => {
    const {
      idAluno,
      servico,
      valor,
      dataVencimento,
    } = req.body;
    try {
      const novoPagamento = await Pagamento.create({
        id_aluno: idAluno,
        servico,
        valor,
        metodo_pagamento: null,
        data_vencimento: dataVencimento,
        data_pagamento: null,
      });

      res.status(201).json({
        mensagem: 'Pagamento gerado com sucesso',
        dados: novoPagamento,
      });
    } catch (error) {
      res.status(500).json({
        mensagem: error.message,
      })
    }
  })
  .get('/', async (req, res) => {
    const pagamentos = await Pagamento.findAll({
      order: [
        ['id', 'ASC']
      ],
      include: [
        {
          model: Aluno,
          attributes: ['id', 'nome']
        }
      ]
    });
    res.status(200).json(pagamentos);
  })
  .get('/aluno/:id', async (req, res) => {
    const { id } = req.params;
    const pagamentos = await Pagamento.findAll({
      order: [
        ['id', 'ASC']
      ],
      where: {
        id_aluno: id,
      },
    });
    res.status(200).json(pagamentos);
  })
  .get('/:id', async (req, res) => {
    const { id } = req.params;

    const pagamento = await Pagamento.findOne({
      where: { id },
    });

    res.status(200).json(pagamento);
  })
  .put('/:id', async (req, res) => {
    const {
      idAluno,
      servico,
      valor,
      dataVencimento,
    } = req.body;
    const { id } = req.params;
    try {
      await Pagamento.update({
        id_aluno: idAluno,
        servico,
        valor,
        data_vencimento: dataVencimento,
      }, {
        where: { id },
      });

      res.status(200).json({
        mensagem: 'Pagamento atualizado com sucesso',
      });
    } catch (error) {
      res.status(500).json({
        mensagem: error.message,
      })
    }
  })
  .patch('/pagar/', async (req, res) => {
    const {
      idPagamento,
      metodoPagamento,
    } = req.body;
    try {
      const dataPagamento = new Date();
       await Pagamento.update({
         metodo_pagamento: metodoPagamento,
         data_pagamento: dataPagamento,
       }, {
         where: { 
          id: idPagamento,
        },
       });

      res.status(200).json({
        mensagem: 'Pagamento efetuado com sucesso',
        metodoPagamento,
        dataPagamento,
      });
    } catch (error) {
      res.status(500).json({
        mensagem: error.message,
      })
    }
  })
  .delete('/:id', async (req, res) => {
    const { id } = req.params;

    await Pagamento.destroy({
      where: { id },
    });

    res.status(200).json({
      mensagem: 'Pagamento deletado com sucesso',
    });
  });