const dbUtil = require('./dbUtil');

function queryCodeByName (name, code, success) {
    dbUtil.find('userinfo', {username: name, code: code}, success);
}

function queryUserinfoByNameEmail (name, email, success) {
    dbUtil.find('userinfo', {username: name, email: email}, success);
}

function updateCode (name, ctime, exptime, code, success) {
    dbUtil.update('userinfo', {username: name}, {$set: {passctime: ctime, passExptime: exptime, code: code}}, success);
}

function updatePasById (id, newPas, success) {
    dbUtil.update('userinfo', {_id: require('mongodb').ObjectID(id)}, {$set: {password: newPas}}, success);
}

module.exports = {
    queryCodeByName,
    updateCode,
    queryUserinfoByNameEmail,
    updatePasById
}