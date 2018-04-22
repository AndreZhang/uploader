const db = require('../config');
const File = require('../models/file');

const Files = new db.Collection();

Files.model = File;

module.exports = Files;