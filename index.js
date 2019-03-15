import {
    request
} from 'request'
const URL = 'http://api.fanyi.baidu.com/api/trans/vip/translate'
const apiForm = {
    q: '',
    from: 'zh',
    to: 'en',
    appid: 20190315000277486,
    salt: 123,
    sign: ''
}

const apiForm = {
    q: '', // 请求查询的字符串
    from: '', // 翻译源语言 默认‘zh’
    to: '', // 翻译语言 默认‘en’
    appid: 0, // appid
    salt: 123, // 随机数
    sign: '' // 签名
}

class PostItNotes {
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

        return Object.assign(apiForm, )
    }

    // 解析请求结果
    toResolveResult() {

    }

    // 语音解读
    toReadResult() {

    }
}