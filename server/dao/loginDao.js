const dbUtil = require('./dbUtil');

function queryUsername (obj, success) {
    dbUtil.find('userinfo', obj, success);
}

function queryUsernameById (id, success) {
    dbUtil.find('userinfo', {_id: require('mongodb').ObjectID(id)}, success);
}

function updateStatus (where, update, success) {
    dbUtil.update('userinfo', where, {$set: update}, success);
}

module.exports = {
    queryUsername,
    updateStatus,
    queryUsernameById
}