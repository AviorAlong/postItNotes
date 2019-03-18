#!/usr/bin/env node

const yargs = require('yargs')
const Account = require('./cli/account')
const Translator = require('./cli/trans')
const print = require('./cli/print')
const baseConf = require('./config/base.json')

function showTip() {
    return yargs
        .usage('Usage: bdnote [options]')
        .option('word', {
            array: true,
            alias: 'w',
            describe: '需要翻译的单词,每次最多查询10个（英/汉）',
            type: 'array'
        })
        .option('appid', {
            alias: 'id',
            describe: '百度开发者帐号的appid',
            type: 'string'
        })
        .option('key', {
            alias: 'k',
            describe: '百度开发者帐号的密钥',
            type: 'string'
        })
        .option('clean', {
            describe: '清除本地缓存的词典',
        })
        .option('en', {
            default: false,
            describe: '默认汉译英，en=true为英译汉',
            type: 'string'
        })
        .argv
}


(async function main() {

    try {
        let argv = showTip()
        // 查看帮助文档
        if (argv.help) {
            return process.exit(0)
        }
        // 清除本地缓存
        if (argv.clean) {
            console.log('本地缓存已清除')
            return
        }
        // 使用个人百度帐号查询
        if (argv.appid && argv.key) {
            let account = new Account(argv)
            return account.toCheckAuth()
        }
        if (argv.word.length > baseConf.wordLimit) {
            console.log(`每次最多查询${baseConf.wordLimit}个单词`)
            throw new Error('词汇量大')
        }
        let trans = new Translator(argv)
        // 执行查询逻辑
        if (argv.word && Array.isArray(argv.word)) {

            let transResult = ''
            if (argv.en) {
                // 英译汉
                transResult = await trans.toTransZh(argv.word)
            } else {
                // 汉译英
                transResult = await trans.toTransEn(argv.word)
            }
            print.printStr(transResult)
        } else {
            console.log('请输入正确的参数')
        }
        process.exit(0)

    } catch (err) {
        console.log('猿猿，要不您再试试')
        process.exit(1)
    }
})()