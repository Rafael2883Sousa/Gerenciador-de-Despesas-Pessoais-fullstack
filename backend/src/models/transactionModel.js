const db = require('../config/db');

class Transaction {
  static create(userId, data) {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO transactions 
        (user_id, type, amount, category, date, description) 
        VALUES (?, ?, ?, ?, ?, ?)`,
        [userId, data.type, data.amount, data.category, data.date, data.description],
        function(err) {
          if (err) reject(err);
          resolve(this.lastID);
        }
      );
    });
  }

  // TODO: Adicionar métodos getByUserId, update, delete
}