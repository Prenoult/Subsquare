const subscription = require('./subscription/sub.js');

module.exports = function (app) {
    app.post('/get', subscription.get);
};