const todayInHistoryDao = require('../dao/todayInHistoryDao');
const respUtil = require('../util/respUtil');
const url = require('url');

var path = new Map();

function getAllToday (request, response) {
    const params = url.parse(request.url, true).query;
    todayInHistoryDao.queryAllByToday(params.date, parseInt(params.page), parseInt(params.pageSize), (result) => {
        if(result == null || result.length == 0){
            response.writeHead(200);
            response.write(respUtil.writeResult('error', '无今日相关数据', null));
            response.end();
        }else{
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '查询成功', result));
            response.end();
        }
    });
}    
path.set('/getAllToday', getAllToday);

function getAllCount (request, response) {
    const params = url.parse(request.url, true).query;
    todayInHistoryDao.queryAllCount(params.date, (result) => {
        response.writeHead(200);
        response.write(respUtil.writeResult('error', '今日所有数据', result));
        response.end();
    });
}    
path.set('/getAllCount', getAllCount);

function getAllTodayByType (request, response) {
    const params = url.parse(request.url, true).query;
    todayInHistoryDao.queryAllByType(params.date, params.type, parseInt(params.page), parseInt(params.pageSize), (result) => {
        if(result == null || result.length == 0){
            response.writeHead(200);
            response.write(respUtil.writeResult('error', '无今日相关数据', null));
            response.end();
        }else{
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '查询成功', result));
            response.end();
        }
    });
}    
path.set('/getAllTodayByType', getAllTodayByType);

function getCountByType (request, response) {
    let params = url.parse(request.url, true).query;
    todayInHistoryDao.queryCountByType(params.date, params.type, (result) => {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '数据条数', result));
        response.end();
    });
}    
path.set('/getCountByType', getCountByType);


module.exports.path = path;
