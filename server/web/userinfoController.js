const userinfoDao = require('../dao/userinfoDao');
const respUtil = require('../util/respUtil');
const crypto = require('crypto');
const url = require('url');
const nodemailer = require('../nodemailer');

var path = new Map();

function active (request, response) {
    const params = url.parse(request.url, true).query;
    const nowtime = new Date().getTime();
    userinfoDao.queryUsername({token: params.verify, status: 0}, (result) => {
        if(result == null || result.length == 0){
            response.writeHead(200);
            response.write('请尝试将链接复制到你的浏览器地址栏中进入访问');
            response.end();
        }else{
            if(nowtime > result[0].tokenExptime){
                response.writeHead(404);
                response.write('您的激活有效期已过，请重新注册');
                response.end();
            }else{
                userinfoDao.updateStatusById(result[0]._id, () => {
                    response.writeHead(200);
                    response.write('激活成功!');
                    response.end();
                });
            }
        }
    })
}
path.set('/active', active);

function register (request, response) {
    request.on('data', (data) => {
        data = JSON.parse(data.toString());
        testUsername(data.username).then(() => {
            response.writeHead(200);
            response.write(respUtil.writeResult('error', '该用户名已被占用', null));
            response.end();
            return;
        }, () => {
            let newPas = md5(md5(data.password));
            let ctime = new Date().getTime();  // 注册时间
            let tokenExptime = ctime + 60 * 60 * 24 * 1000;   // 过期时间为24小时后
            let token = md5(data.username + newPas + ctime);  // 创建用于激活识别码
            userinfoDao.insertUserinfo({
                username: data.username,
                password: newPas,
                email: data.email,
                ctime: ctime,
                token: token,
                tokenExptime: tokenExptime,
                status: 0,
                passctime: ctime,
                passExptime: tokenExptime,
                code: 0,
            }, (result) => {
                response.writeHead(200);
                response.write(respUtil.writeResult('success', '注册成功, 请与24小时内前往注册邮箱激活账号', result));
                response.end();
                activateEmail(data.email, data.username, token);
            });
        });
    });
}    
path.set('/register', register);


// 检测是否存在该用户
function testUsername (name) {
    return new Promise((res, rej) => {
        userinfoDao.queryUsername({username: name}, (result) => {
            if(result == null || result.length == 0){
                rej();
            }else{
                res();
            }
        });
    })
}

// 密码加密处理
function md5(data){
    const hash = crypto.createHash('md5');
    return hash.update(data).digest('hex');
}

// 激活邮箱
function activateEmail (email, username, token) {
    let mailOptions = {
        from: '1301498523@qq.com',
        to: email,
        subject: 'time用户帐号激活',
        html: `亲爱的 ${username} ：<br/>
               感谢您在我站注册了新帐号。<br/>
               请点击链接激活您的帐号。<br/>
               <a href='http://127.0.0.1:12306/active?verify=${token} target='_blank'>
               http://127.0.0.1:12306/active?verify=${token}</a><br/>
               如果以上链接无法点击,请将它复制到你的浏览器地址栏中进入访问，该链接24小时内有效。<br/>如果此次激活请求非你本人所发，请忽略本邮件。<br/>
               <p style='text-align:right'>-------- time 敬上</p>`
    }
    nodemailer.sendMail(mailOptions);
}

module.exports.path = path;
