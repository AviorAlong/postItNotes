exports.printStr = contents => {
    console.log('------------------------------------------')
    for (let con of contents) {
        console.log(`${con.src}<----->${con.dst}`)
    }
    console.log('------------------------------------------')
}