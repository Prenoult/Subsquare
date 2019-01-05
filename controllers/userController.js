const account = require('./account/lib.js');

module.exports = function (app) {
    app.post('/login', account.login);
    app.post('/signup', account.signup);
    app.post('/change/email', account.changeEmail);
    app.post('/change/password', account.changePassword);
    app.post('/reset', account.resetPassword);
};