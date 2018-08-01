const connect = require('gulp-connect');
const reload = connect.reload;
const httpServer = connect.server;
const through2 = require('through2');
const pass = () => ( through2.obj());
module.exports = { pass, reload, httpServer };