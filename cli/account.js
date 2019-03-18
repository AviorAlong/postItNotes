/**
 * 百度帐号管理
 */
const fs = require('fs')
const accountConf = require('../config/account.json')
const inquirer = require('inquirer')
const path = require('path')
class Account {
    constructor(args) {
        this.args = args
    }
    async toCheckAuth() {
        if (this.isBaiDuAuth()) {
            let answers = await inquirer.prompt([{
                type: 'expand',
                message: '已存在生效的百度帐号，确认覆盖？',
                name: 'overwrite',
                choices: [{
                    key: 'y',
                    name: 'Overwrite',
                    value: 'overwrite'
                }, {
                    key: 'n',
                    name: 'Abort',
                    value: 'abort'
                }]
            }])
            if (answers.overwrite === 'overwrite') {
                this.toSaveConfig(JSON.stringify({
                    url: accountConf.url,
                    appid: this.args.appid,
                    key: this.args.key
                }))
            } else if (answers.overwrite === 'abort') {
                process.exit(0)
            }
        } else {
            throw new Error('无效参数')
        }
    }

    toSaveConfig(content) {
        try {
            let src = path.resolve('config/account.json')
            fs.writeFileSync(src, Buffer.from(content))
        } catch (err) {
            throw new Error(err)
        }
    }

    isBaiDuAuth() {
        return accountConf && accountConf.url && accountConf.appid && accountConf.key
    }

}

module.exports = Account