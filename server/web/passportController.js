const passportDao = require('../dao/passportDao');
const respUtil = require('../util/respUtil');
const crypto = require('crypto');
const url = require('url');
const nodemailer = require('../nodemailer');

var path = new Map();

function updatePas (request, response) {
    request.on('data', (data) => {
        data = JSON.parse(data.toString());
        let nowtime = new Date().getTime();
        let newPas = md5(md5(data.password));
        queryCode(data.username, data.code).then((result) => {
            if(nowtime > result[0].passExptime){
                response.writeHead(200);
                response.write(respUtil.writeResult('error', '验证码有效期已过，请重新发送', null));
                response.end();
            }else{
                passportDao.updatePasById(result[0]._id, newPas, (result) => {
                    response.writeHead(200);
                    response.write(respUtil.writeResult('success', '修改成功', result));
                    response.end();
                });
            }
        }, () => {
            response.writeHead(200);
            response.write(respUtil.writeResult('error', '验证码错误', null));
            response.end();
        });
    });
}
path.set('/updatePas', updatePas);

// 查询对比code
function queryCode (name, code) {
    return new Promise((res, rej) => {
        passportDao.queryCodeByName(name, code, (result) => {
            if(result == null || result.length == 0){
                rej();
            }else{
                res(result);
            }
        })
    });
}

function getCode (request, response) {
    let params = url.parse(request.url, true).query;
    testUsername(params.username, params.email).then((res) => {
        let email = params.email;
        let username = params.username;
        let ctime = new Date().getTime();
        let exptime = ctime + 60 * 1000;
        let code = randomNum();
        updateCode(username, ctime, exptime, code).then(() => {
            activateEmail(email, username, code);
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '验证码以发送, 请到邮箱获取', res));
            response.end();
        }, () => {
            response.writeHead(200);
            response.write(respUtil.writeResult('error', '验证码发送失败', res));
            response.end();
        });
    }, () => {
        response.writeHead(200);
        response.write(respUtil.writeResult('error', '用户名或邮箱错误', null));
        response.end();
    });
}    
path.set('/getCode', getCode);

// 修改数据库code
function updateCode (username, ctime, exptime, code) {
    return new Promise((res, rej) => {
        passportDao.updateCode(username, ctime, exptime, code, (result) => {
            if(result.result.ok == 1){
                res();
            }else{
                rej();
            }
        });
    });
}

// 检测是否存在该用户
function testUsername (name, email) {
    return new Promise((res, rej) => {
        passportDao.queryUserinfoByNameEmail(name, email, (result) => {
            if(result == null || result.length == 0){
                rej();
            }else{
                res(result);
            }
        });
    })
}

// 密码加密处理
function md5(data){
    const hash = crypto.createHash('md5');
    return hash.update(data).digest('hex');
}

// 邮箱验证
function activateEmail (email, username, code) {
    let mailOptions = {
        from: '1301498523@qq.com',
        to: email,
        subject: 'time密码重置',
        html: `亲爱的 ${username}: <br/>
               你的验证码是: ${code}<br/>
               有效期为10分钟, 请及时更改<br/>
               <p style='text-align:right'>-------- time 敬上</p>`
    }
    nodemailer.sendMail(mailOptions);
}

// 随机数
function randomNum () {
    let num = '';
    for(let i = 0; i < 6; i++){
        num += Math.floor(Math.random() * 10)
    }
    return num;
}

module.exports.path = path;
