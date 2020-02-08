let nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 25,
    auth: {
        user: '1301498523@qq.com',
        pass: 'osxqnvspszwigdge'
    }
});

function sendMail (config) { 
    transporter.sendMail(config, (err, info) => {
        if(err){
            throw new Error(err);
        }
        console.log('发送成功' + info);
    });
}

module.exports.sendMail = sendMail;


// let mailOptions = {
//     from: '1301498523@qq.com',
//     to: '3151425107@qq.com',
//     subject: 'nodemailer邮件发送',
//     html: `亲爱的 xxx ：<br/>
//            感谢您在我站注册了新帐号。<br/>
//            请点击链接激活您的帐号。<br/>
//            <a href='http://localhost/public/ershisi/Controller/active.php?verify=xxx  target='_blank'>
//            http://localhost/public/ershisi/Controller/active.php?verify=xxx</a><br/>
//            如果以上链接无法点击,请将它复制到你的浏览器地址栏中进入访问，该链接24小时内有效。<br/>如果此次激活请求非你本人所发，请忽略本邮件。<br/>
//            <p style='text-align:right'>-------- time 敬上</p>`
// }

// sendMail(mailOptions);
