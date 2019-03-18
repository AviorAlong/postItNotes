exports.printStr = contents => {
    for (let con of contents) {
        console.log(`${con.src}->${con.dst}`)
    }
}