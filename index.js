const express = require('express');
const cors = require('cors'); // Importa o módulo CORS
const app = express();
const port = 3000;
const authController = require('./controllers/authController');

// Configuração do middleware para processar dados JSON
app.use(express.json());

// Configuração do CORS para permitir requisições de qualquer origem
app.use(cors());

// Rota inicial para verificar se o servidor está funcionando
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/login.html');
});

// Rota para a dashboard
app.get('/dashboard', (req, res) => {
  res.sendFile(__dirname + '/views/dashboard.html');
});

// Usa o controlador de autenticação para gerenciar rotas relacionadas
app.use('/api', authController);

// Inicia o servidor na porta especificada
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
