const request = require('request');

// 请求封装
class PostItNotes {
    constructor() {}
    // 发送http请求
    getTransRet(url) {
        return new Promise((resolve, reject) => {
            request({
                url: url,

            }, (err, res, body) => {
                if (err) {
                    return reject(err)
                }
                return resolve(body)
            })
        });
    }
}

module.exports = PostItNotes