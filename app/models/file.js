const db = require('../config');
const User = require('./user');

const File = db.Model.extend({
  tableName: 'files',
  hasTimestamps: true,
  defaults: {
    userId: 0,
  },
  user () {
    return this.belongsTo(User, 'UserId');
  }
});

module.exports = File;
