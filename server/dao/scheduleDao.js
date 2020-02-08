const dbUtil = require('./dbUtil');

function queryAllByToday (name, date, skip, limit, success) {
    dbUtil.findPage('schedule', {username: name, addDate: date}, skip * limit, limit, success);
}

function queryAllCount (name, date, success) {
    dbUtil.findCount('schedule', {username: name, addDate: date}, success);
}

function queryAllByType (date, name, type, skip, limit, success) {
    dbUtil.findPage('schedule', {username: name, addDate: date, isFinish: type}, skip * limit, limit, success);
}

function queryCountByType (date, name, type, success) {
    dbUtil.findCount('schedule', {username: name, addDate: date, isFinish: type}, success);
}

function insertTask (username, date, task, success) {
    dbUtil.insertOne('schedule', {username: username, addDate: date, task: task, isFinish: 0}, success);
}

function updateTaskIsfinish (id, success) {
    dbUtil.update('schedule', {_id: require('mongodb').ObjectID(id)}, {$set: {isFinish: 1}}, success);
}

function deltaskById (id, success) {
    dbUtil.deleteDate('schedule', {_id: require('mongodb').ObjectID(id)}, success);
}

function queryNoFinCount (name, date, success) {
    dbUtil.findCount('schedule', {username: name, addDate: date, isFinish: 0}, success);
}

module.exports = {
    queryAllByToday,
    queryAllCount,
    queryAllByType,
    queryCountByType,
    insertTask,
    updateTaskIsfinish,
    deltaskById,
    queryNoFinCount
}