const db = require('../config');
const File = require('./file');

const User = db.Model.extend({
    tableName: 'users',
    hasTimestamps: true,
    files(){
        return this.hasMany(File);
    }
});

module.exports = User;
