import aluno from './AlunoRoutes.js';
import administrativo from './AdministrativoRoutes.js';
import entradaSaida from './EntradaSaidaRoutes.js';
import pagamento from './PagamentoRoutes.js';
import auth from './AuthRoutes.js';
import autenticacao from '../middlewares/autenticacao.js';

export default function routes(app) {
  app
    .use('/inova-fit/api/auth/', auth)
    .use(autenticacao)
    .get('/', (req, res) => res.redirect('/inova-fit/api/'))
    .get('/inova-fit/api/', (req, res) => {
      res.status(200).json({
        mensagem: 'Inova Fit API',
      });
    })
    .use('/inova-fit/api/aluno/', aluno)
    .use('/inova-fit/api/administrativo/', administrativo)
    .use('/inova-fit/api/entrada-saida/', entradaSaida)
    .use('/inova-fit/api/pagamento/', pagamento);
}