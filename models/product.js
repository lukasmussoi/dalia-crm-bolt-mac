const db = require('../db/database');

// Cria a tabela de produtos no banco de dados
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT,
    preco REAL NOT NULL,
    quantidade INTEGER NOT NULL
  )`);
});

// Função para adicionar um novo produto
function adicionarProduto(nome, descricao, preco, quantidade) {
  const stmt = db.prepare('INSERT INTO produtos (nome, descricao, preco, quantidade) VALUES (?, ?, ?, ?)');
  stmt.run(nome, descricao, preco, quantidade, function(err) {
    if (err) {
      console.error('Erro ao adicionar produto:', err.message);
    } else {
      console.log(`Produto adicionado com ID: ${this.lastID}`);
    }
  });
  stmt.finalize();
}

module.exports = {
  adicionarProduto
};
