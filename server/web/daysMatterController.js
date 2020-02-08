const daysMatterDao = require('../dao/daysMatterDao');
const respUtil = require('../util/respUtil');
const url = require('url');

var path = new Map();

function setMattter (request, response) {
    request.on('data', (data) => {
        data = JSON.parse(data.toString());
        daysMatterDao.insertMatter(data.username, data.type, data.time, data.content, (result) => {
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '添加成功', result));
            response.end();
        });
    });
}
path.set('/setMattter', setMattter);

function delMatterById (request, response) {
    request.on('data', (data) => {
        data = JSON.parse(data.toString());
        daysMatterDao.delMatterById(data.id, (result) => {
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '删除成功', result));
            response.end();
        });
    });
}
path.set('/delMatterById', delMatterById);


function getAllMatter (request, response) {
    const params = url.parse(request.url, true).query;
    daysMatterDao.queryAllMatter(params.username, parseInt(params.page), parseInt(params.pageSize), (result) => {
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
path.set('/getAllMatter', getAllMatter);

function getMatterCount (request, response) {
    const params = url.parse(request.url, true).query;
    daysMatterDao.queryMatterCount(params.username, (result) => {
        response.writeHead(200);
        response.write(respUtil.writeResult('error', '今日所有数据', result));
        response.end();
    });
}    
path.set('/getMatterCount', getMatterCount);


module.exports.path = path;