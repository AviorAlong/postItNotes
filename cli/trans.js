const request = require('request');
const querystring = require('querystring')
const crypto = require('crypto')
const Account = require('./account')
const accountConf = require('../config/account.json')
const baseConf = require('../config/base.json')
const baiduApiForm = baseConf && baseConf.baiduApiForm
// 请求封装
class Translator {
    constructor(argv) {
        this.argv = argv
        this.account = new Account()
    }
    // 发送http请求
    getTransRet(url) {
        return new Promise((resolve, reject) => {
            request({
                url: url,
                timeout: 10000,
                headers: {
                    'User-Agent': 'request'
                }
            }, (err, res, body) => {
                if (err || res.statusCode !== 200) {
                    return reject(err || res.statusCode)
                }
                return resolve(body)
            })
        });
    }

    // 解析命令
    toResolveCli(str) {
        if (!str) {
            throw new Error('input error')
        }
        const md5 = crypto.createHash('md5')
        let salt = Math.ceil(Math.random() * 10000000)
        let b = md5.update(`${accountConf.appid}${str}${salt}${accountConf.key}`).digest('hex');

        return querystring.stringify(
            Object.assign(baiduApiForm, {
                q: str,
                salt: salt,
                sign: b,
                appid: accountConf.appid,
                key: accountConf.key
            })
        )
    }

    // 解析请求结果
    toResolveResult(ret) {

        let tmp = JSON.parse(ret)
        let realRet = tmp && tmp['trans_result']
        return realRet && realRet[0] ? realRet[0] :
    }

    // url处理，调起翻译
    async toTrans() {
        let url = baseConf && baseConf.url
        let words = this.argv.word
        let results = []
        let isAuth = this.account.isBaiDuAuth()
        try {
            if (isAuth) {
                url = accountConf.url
                for (let word in words) {
                    let uri = `${url}?${this.toResolveCli(words[word])}`
                    let transRet = await this.getTransRet(uri)
                    if (transRet) {
                        results.push(this.toResolveResult(transRet))
                    }

                }
            } else {
                let uri = `${url}?${querystring.stringify({words: words})}`
                let transRet = await this.getTransRet(uri)
                if (transRet) {
                    results.push(this.toResolveResult(transRet))
                }
            }
            return results
        } catch (err) {
            throw new Error(err)
        }

    }
    // 汉译英
    async toTransEn() {
        baiduApiForm["from"] = 'zh'
        baiduApiForm["to"] = 'en'
        return await this.toTrans()
    }
    // 英译汉
    async toTransZh() {
        baiduApiForm["from"] = 'en'
        baiduApiForm["to"] = 'zh'
        return await this.toTrans()
    }


}

module.exports = Translator