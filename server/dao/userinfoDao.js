const dbUtil = require('./dbUtil');


function insertUserinfo (obj, success) {
    dbUtil.insertOne('userinfo', obj, success);
}

function queryUsername (obj, success) {
    dbUtil.find('userinfo', obj, success);
}

function updateStatusById (id, success) {
    dbUtil.update('userinfo', {_id: require('mongodb').ObjectID(id)}, {$set: {status: 1}}, success);
}

module.exports = {
    insertUserinfo,
    queryUsername,
    updateStatusById
}