const path = require('path');
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, '../db/monkey.sqlite'),
  },
  useNullAsDefault: true,
});
const db = require('bookshelf')(knex);

// Knex has a .createTableIfNotExists method, which we do not
// recommend using unless its implementation changes.
// See https://github.com/tgriesser/knex/issues/1303 for details.
db.knex.schema.hasTable('users').then((exists) => {
  if (!exists) {
    db.knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('name', 255);
      table.string('email', 255);
      table.string('code', 100);
      table.timestamps();
    }).then(() => {
      console.log('Created users table');
    }).catch((err) => {
      console.error('Error creating users table', err);
    });
  }
});

db.knex.schema.hasTable('files').then((exists) => {
  if (!exists) {
    db.knex.schema.createTable('files', (table) => {
      table.increments('id').primary();
      table.string('name', 255);
      table.string('path', 255);
      table.integer('userId');
      table.timestamps();
    }).then(() => {
      console.log('Created files table');
    }).catch((err) => {
      console.error('Error creating files table', err);
    });
  }
});

/************************************************************/
// Add additional schema definitions below
/************************************************************/


module.exports = db;
