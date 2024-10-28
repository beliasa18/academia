import { Router } from 'express';
import bcrypt from 'bcryptjs';
import Administrativo from '../entities/Administrativo.js';

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
      let dataAdmissao = new Date();
      const senha = await bcrypt.hash('InovaFit@123', 10);

      const novoAdministrativo = await Administrativo.create({
        nome,
        tipo_documento: tipoDocumento,
        n_documento: nDocumento,
        email,
        endereco,
        data_admissao: dataAdmissao,
        senha,
      });

      res.status(201).json({
        mensagem: 'Perfil administrativo cadastrado com sucesso',
        dados: novoAdministrativo,
      });
    } catch (error) {
      res.status(500).json({
        mensagem: error.message,
      })
    }
  })
  .get('/', async (req, res) => {
    const administrativos = await Administrativo.findAll();
    res.status(200).json(administrativos);
  })
  .get('/:id', async (req, res) => {
    const { id } = req.params;

    const administrativo = await Administrativo.findOne({
      where: { id },
    });

    res.status(200).json(administrativo);
  })
  .put('/:id',  async (req, res) => {
    const {
      nome,
      tipoDocumento,
      nDocumento,
      email,
      endereco,
    } = req.body;
    const { id } = req.params;
    try {
      await Administrativo.update({
        nome,
        tipo_documento: tipoDocumento,
        n_documento: nDocumento,
        email,
        endereco,
      }, {
        where: { id },
      });

      res.status(200).json({
        mensagem: 'Perfil administrativo atualizado com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        mensagem: error.message,
      })
    }
  })
  .delete('/:id', async (req, res) => {
    const { id } = req.params;

    await Administrativo.destroy({
      where: { id },
    });

    res.status(200).json({
      mensagem: 'Administrador deletado com sucesso',
    });
  });