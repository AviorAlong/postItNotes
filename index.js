#!/usr/bin/env node

const request = require('request');
const crypto = require('crypto');
const querystring = require('querystring');
const md5 = crypto.createHash('md5');
const URL = 'http://api.fanyi.baidu.com/api/trans/vip/translate'
const key = 'PoLccfhuLquGTBsYMC_B'
const appid = '20190315000277486'
const apiForm = {
    q: '', // 请求查询的字符串
    from: 'zh', // 翻译源语言 默认‘zh’
    to: 'en', // 翻译语言 默认‘en’
    appid: appid, // appid
    salt: 123, // 随机数
    sign: '' // 签名
}

class BdApiForm {
    constructor(config) {
        this.config = config
    }
    // 检查是否符合百度翻译api的请求参数
    isBaiduApiForm(arr) {
        let keys = arr.keys();
        for (key in keys) {
            if (!apiForm[key]) {
                return false
            }
        }
        return true
    }

    // 解析命令
    toResolveCli(str) {
        if (!str) {
            throw new Error('input error')
        }
        let salt = Math.ceil(Math.random() * 10000000)
        let b = md5.update(`${appid}${str}${salt}${key}`).digest('hex');

        return querystring.stringify(
            Object.assign(apiForm, {
                q: str,
                salt: salt,
                sign: b
            })
        )
    }

    // 解析请求结果
    toResolveResult(ret) {
        return JSON.parse(ret)['trans_result']
    }

    // 语音解读
    toReadResult() {

    }
}

class PostItNotes {
    constructor() {}

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

async function main() {
    const src = process.argv[2];
    if (!src) {
        console.log('请输入正确的参数')
        return process.exit(0)
    }
    if (src == '--help') {
        console.log('英语菜鸟你来啦')
        return process.exit(0)
    }

    let bd = new BdApiForm(apiForm)
    let note = new PostItNotes()
    let url = `${URL}?${bd.toResolveCli(src)}`
    try {
        let ret = await note.getTransRet(url)
        let result = bd.toResolveResult(ret)
        console.log(result)
        process.exit(0)
    } catch (err) {
        process.exit(1)
    }
}

main()