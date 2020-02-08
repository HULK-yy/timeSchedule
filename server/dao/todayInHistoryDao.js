const dbUtil = require('./dbUtil');

function queryAllByToday (date, skip, limit, success) {
    dbUtil.findPage('todayinhistory', {date}, skip * limit, limit, success);
}

function queryAllCount (date, success) {
    dbUtil.findCount('todayinhistory', {date}, success);
}

function queryAllByType (date, type, skip, limit, success) {
    dbUtil.findPage('todayinhistory', {date, type}, skip * limit, limit, success);
}

function queryCountByType (date, type, success) {
    dbUtil.findCount('todayinhistory', {date, type}, success);
}

module.exports = {
    queryAllByToday,
    queryAllCount,
    queryAllByType,
    queryCountByType
}