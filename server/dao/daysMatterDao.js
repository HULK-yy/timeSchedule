const dbUtil = require('./dbUtil');

function queryAllMatter (name, skip, limit, success) {
    dbUtil.findPage('daysmatter', {username: name}, skip * limit, limit, success);
}

function queryMatterCount (name, success) {
    dbUtil.findCount('daysmatter', {username: name}, success);
}

function insertMatter (username, type, time, content, success) {
    dbUtil.insertOne('daysmatter', {username, type, time, content}, success);
}

function delMatterById (id, success) {
    dbUtil.deleteDate('daysmatter', {_id: require('mongodb').ObjectID(id)}, success);
}

module.exports = {
    queryAllMatter,
    queryMatterCount,
    insertMatter,
    delMatterById
}
