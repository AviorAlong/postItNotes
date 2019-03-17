#!/usr/bin/env node

const yargs = require('yargs');

function showTip() {
    return yargs
        .usage('Usage: bdnote [options]')
        .option('word', {
            array: true,
            alias: 'w',
            describe: '需要翻译的单词（英/汉）',
            type: 'array'
        })
        .option('appid', {
            alias: 'id',
            describe: '百度开发者帐号的appid',
            type: 'string'
        })
        .option('key', {
            alias: 'id',
            describe: '百度开发者帐号的密钥',
            type: 'string'
        })
        .option('clean', {
            describe: '清除本地缓存的词典',
        })
        .option('en', {
            default: false,
            describe: '默认汉译英，en=ture为英译汉',
            type: 'string'
        })
        .argv
}

async function main() {
    let argv = showTip()
    if (argv.help) {
        return process.exit(0)
    }
    try {
        process.exit(0)
    } catch (err) {
        process.exit(1)
    }
}

main()