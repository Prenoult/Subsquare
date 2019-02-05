const subscription = require('./subscription/lib.js');

module.exports = function (app) {
    app.post('/get', subscription.get);
    app.post('/create', subscription.create);
    app.post('/all', subscription.allSubs);
    app.post('/add', subscription.add);
    app.post('/del', subscription.del);
};