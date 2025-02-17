const db = require('../db/database');

// Cria a tabela de usuários no banco de dados
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    senha TEXT NOT NULL,
    nivel TEXT NOT NULL CHECK(nivel IN ('Administrador', 'Promotora', 'Revendedora'))
  )`);
});

// Função para verificar se existe um administrador
function verificarAdministrador(callback) {
  db.get('SELECT COUNT(*) AS count FROM usuarios WHERE nivel = ?', ['Administrador'], (err, row) => {
    if (err) {
      console.error('Erro ao verificar administrador:', err.message);
      callback(false);
    } else {
      callback(row.count > 0);
    }
  });
}

// Função para criar um novo administrador
function criarAdministrador(nome, senha, callback) {
  const stmt = db.prepare('INSERT INTO usuarios (nome, senha, nivel) VALUES (?, ?, ?)');
  stmt.run(nome, senha, 'Administrador', function(err) {
    if (err) {
      console.error('Erro ao criar administrador:', err.message);
      callback(false);
    } else {
      console.log(`Administrador criado com ID: ${this.lastID}`);
      callback(true);
    }
  });
  stmt.finalize();
}

module.exports = {
  verificarAdministrador,
  criarAdministrador
};
