const fs = require('fs');

const globalConfig = {};

let conf = fs.readFileSync(__dirname + '/server.conf');
let confArr = conf.toString().split('\n');

for(let i = 0; i < confArr.length; i++){
    globalConfig[confArr[i].split('=')[0]] = confArr[i].split('=')[1].trim();
}

globalConfig.web_path = __dirname + globalConfig.web_path;

module.exports = globalConfig;