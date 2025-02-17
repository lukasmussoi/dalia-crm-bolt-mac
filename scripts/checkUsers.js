const db = require('../db/database');

// Função para listar todos os usuários no banco de dados
function listarUsuarios() {
  db.all('SELECT * FROM usuarios', [], (err, rows) => {
    if (err) {
      console.error('Erro ao consultar usuários:', err.message);
    } else {
      console.log('Usuários cadastrados:');
      rows.forEach((row) => {
        console.log(`ID: ${row.id}, Nome: ${row.nome}, Nível: ${row.nivel}`);
      });
    }
  });
}

// Executa a função para listar usuários
listarUsuarios();
