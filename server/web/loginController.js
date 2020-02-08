const loginDao = require('../dao/loginDao');
const respUtil = require('../util/respUtil');
const crypto = require('crypto');
const url = require('url');

var path = new Map();

function getUsernameById (request, response) {
    const params = url.parse(request.url, true).query;
    loginDao.queryUsernameById(params.cookieId, (result) => {
        if(result == null || result.length == 0){
            response.writeHead(200);
            response.write(respUtil.writeResult('error', '查询失败', null));
            response.end();
        }else{
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '查询成功', result));
            response.end();
        }
    });
}    
path.set('/getUsernameById', getUsernameById);

function login (request, response) {
    request.on('data', (data) => {
        data = JSON.parse(data.toString());
        let newPas = md5(md5(data.password));
        loginDao.queryUsername({
            username: data.username,
            password: newPas,
            status: 1
        }, (result) => {
            if(result == null || result.length == 0){
                response.writeHead(200);
                response.write(respUtil.writeResult('error', '用户名或密码错误', result));
                response.end();
            }else{
                // response.cookie('cookieId',result[0]._id);
                response.writeHead(200);
                response.write(respUtil.writeResult('success', '登陆成功', result));
                response.end();
            }
        });
    });
}
path.set('/login', login);

// 密码加密处理
function md5(data){
    const hash = crypto.createHash('md5');
    return hash.update(data).digest('hex');
}

module.exports.path = path;
