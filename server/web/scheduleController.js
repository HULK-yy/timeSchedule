const scheduleDao = require('../dao/scheduleDao');
const respUtil = require('../util/respUtil');
const url = require('url');

var path = new Map();

function setTask (request, response) {
    request.on('data', (data) => {
        data = JSON.parse(data.toString());
        scheduleDao.insertTask(data.username, data.date, data.task, (result) => {
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '添加任务成功', result));
            response.end();
        });
    });
}
path.set('/setTask', setTask);

function finishTaskById (request, response) {
    request.on('data', (data) => {
        data = JSON.parse(data.toString());
        scheduleDao.updateTaskIsfinish(data.id, (result) => {
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '完成任务', result));
            response.end();
        });
    });
}
path.set('/finishTaskById', finishTaskById);

function delTaskById (request, response) {
    request.on('data', (data) => {
        data = JSON.parse(data.toString());
        scheduleDao.deltaskById(data.id, (result) => {
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '删除成功', result));
            response.end();
        });
    });
}
path.set('/delTaskById', delTaskById);

function getNoFinishTask (request, response) {
    const params = url.parse(request.url, true).query;
    scheduleDao.queryNoFinCount(params.username, params.date, (result) => {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end(); 
    })
}
path.set('/getNoFinishTask', getNoFinishTask);


function getTaskAllToday (request, response) {
    const params = url.parse(request.url, true).query;
    scheduleDao.queryAllByToday(params.username, params.date, parseInt(params.page), parseInt(params.pageSize), (result) => {
        if(result == null || result.length == 0){
            response.writeHead(200);
            response.write(respUtil.writeResult('error', '无相关数据', null));
            response.end();
        }else{
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '查询成功', result));
            response.end();
        }
    });
}    
path.set('/getTaskAllToday', getTaskAllToday);

function getTaskAllCount (request, response) {
    const params = url.parse(request.url, true).query;
    scheduleDao.queryAllCount(params.username, params.date, (result) => {
        response.writeHead(200);
        response.write(respUtil.writeResult('error', '今日所有数据', result));
        response.end();
    });
}    
path.set('/getTaskAllCount', getTaskAllCount);



function getTaskAllTodayByType (request, response) {
    const params = url.parse(request.url, true).query;
    if(params.type == 'all'){
        scheduleDao.queryAllByToday(params.username, params.date, parseInt(params.page), parseInt(params.pageSize), (result) => {
            if(result == null || result.length == 0){
                response.writeHead(200);
                response.write(respUtil.writeResult('error', '无相关数据', null));
                response.end();
            }else{
                response.writeHead(200);
                response.write(respUtil.writeResult('success', '查询成功', result));
                response.end();
            }
        });
    }else if(params.type == 'noFin'){
        scheduleDao.queryAllByType(params.date, params.username, 0, parseInt(params.page), parseInt(params.pageSize), (result) => {
            if(result == null || result.length == 0){
                response.writeHead(200);
                response.write(respUtil.writeResult('error', '无相关数据', null));
                response.end();
            }else{
                response.writeHead(200);
                response.write(respUtil.writeResult('success', '查询成功', result));
                response.end();
            }
        });
    }else if(params.type == 'fin'){
        scheduleDao.queryAllByType(params.date, params.username, 1, parseInt(params.page), parseInt(params.pageSize), (result) => {
            if(result == null || result.length == 0){
                response.writeHead(200);
                response.write(respUtil.writeResult('error', '无相关数据', null));
                response.end();
            }else{
                response.writeHead(200);
                response.write(respUtil.writeResult('success', '查询成功', result));
                response.end();
            }
        });
    }
}    
path.set('/getTaskAllTodayByType', getTaskAllTodayByType);

function getTaskCountByType (request, response) {
    let params = url.parse(request.url, true).query;
    if(params.type == 'all'){
        scheduleDao.queryAllCount(params.username, params.date, (result) => {
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '今日所有数据', result));
            response.end();
        });
    }else if(params.type == 'noFin'){
        scheduleDao.queryCountByType(params.date, params.username, 0, (result) => {
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '今日所有数据', result));
            response.end();
        });
    }else if(params.type == 'fin'){
        scheduleDao.queryCountByType(params.date, params.username, 1, (result) => {
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '今日所有数据', result));
            response.end();
        });
    }
}    
path.set('/getTaskCountByType', getTaskCountByType);


module.exports.path = path;