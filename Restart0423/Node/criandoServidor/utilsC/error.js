module.exports = {
    send: (err, req, res, code = 400)=>{
        console.log(`errour: ${err}`)
        res.status(code).json({error: err})
        error: err
    }
}