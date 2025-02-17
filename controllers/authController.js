const express = require('express');
const router = express.Router();
const { verificarAdministrador, criarAdministrador } = require('../models/user');
const db = require('../db/database');

// Rota para verificar se existe um administrador
router.get('/check-admin', (req, res) => {
  verificarAdministrador((hasAdmin) => {
    res.json({ hasAdmin });
  });
});

// Rota para criar um novo administrador
router.post('/create-admin', (req, res) => {
  const { username, password } = req.body;
  criarAdministrador(username, password, (success) => {
    if (success) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: 'Erro ao criar administrador.' });
    }
  });
});

// Rota para login de usuário
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT * FROM usuarios WHERE nome = ? AND senha = ?', [username, password], (err, row) => {
    if (err) {
      console.error('Erro ao realizar login:', err.message);
      res.json({ success: false, message: 'Erro no servidor.' });
    } else if (row) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: 'Credenciais inválidas.' });
    }
  });
});

module.exports = router;
