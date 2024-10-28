import { Router } from 'express';
import bcrypt from 'bcryptjs';
import Aluno from '../entities/Aluno.js';
import EntradaSaida from '../entities/EntradaSaida.js';
import Pagamento from '../entities/Pagamento.js';

export default Router()
  .post('/', async (req, res) => {
    const {
      nome,
      tipoDocumento,
      nDocumento,
      email,
      endereco,
    } = req.body;
    try {
      let dataInscricao = new Date();
      const senha = await bcrypt.hash('InovaFit@123', 10);

      const novoAluno = await Aluno.create({
        nome,
        tipo_documento: tipoDocumento,
        n_documento: nDocumento,
        email,
        endereco,
        data_inscricao: dataInscricao,
        senha,
      });

      res.status(201).json({
        mensagem: 'Aluno cadastrado com sucesso',
        dados: novoAluno,
      });
    } catch (error) {
      res.status(500).json({
        mensagem: error.message,
      })
    }
  })
  .get('/', async (req, res) => {
    const alunos = await Aluno.findAll();
    res.status(200).json(alunos);
  })
  .get('/:id', async (req, res) => {
    const { id } = req.params;

    const aluno = await Aluno.findOne({
      where: { id },
    });

    res.status(200).json(aluno);
  })
  .put('/:id', async (req, res) => {
    const {
      nome,
      tipoDocumento,
      nDocumento,
      email,
      endereco,
    } = req.body;
    const { id } = req.params;
    try {
      await Aluno.update({
        nome,
        tipo_documento: tipoDocumento,
        n_documento: nDocumento,
        email,
        endereco,
      }, {
        where: { id },
      });

      res.status(200).json({
        mensagem: 'Aluno atualizado com sucesso',
      });
    } catch (error) {
      res.status(500).json({
        mensagem: error.message,
      })
    }
  })
  .delete('/:id', async (req, res) => {
    const { id } = req.params;

    await EntradaSaida.destroy({
      where: {
        id_aluno: id,
      },
    });
    await Pagamento.destroy({
      where: {
        id_aluno: id,
      },
    });
    await Aluno.destroy({
      where: { id },
    });

    res.status(200).json({
      mensagem: 'Aluno deletado com sucesso',
    });
  });