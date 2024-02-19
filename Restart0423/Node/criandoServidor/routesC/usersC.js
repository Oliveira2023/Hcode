const { check, validationResult } = require('express-validator')

let NeDB = require('nedb')
let db = new NeDB({
    filename: 'user.db',
    autoload:true
})

module.exports = (app)=>{

    let route = app.route('/users')

    route.get((req, res)=>{

        db.find({}).sort({name:1}).exec((err, users)=>{
            if (err){
                app.utilsC.error.send(err, req, res)
            }else {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json({
                    users
                })           
            }
        })


    })
    route.post(
        [
            check("name", "O nome é obrigatório.").notEmpty(),
            check("email", "Email inválido.").notEmpty().isEmail() 
        ],(req, res)=>{

            let errors = validationResult(req)

            if (!errors.isEmpty()){
                app.utilsC.error.send(errors, req, res)
                return false
            }
        
        db.insert(req.body, (err, user)=>{

            if(err){
                app.utilsC.error.send(err, req, res)
            }else{
                res.status(200).json(user)
            }
        })
    })
    let routeId = app.route('/users/:id')
    
    routeId.get((req, res)=>{
        db.findOne({_id:req.params.id}).exec((err, user)=>{
            if(err){
                app.utilsC.error.send(err, req, res)
            }else{
                res.status(200).json(user)
            }
        })
    })

    routeId.put(        
        [
        check("name", "O nome é obrigatório.").notEmpty(),
        check("email", "Email inválido.").notEmpty().isEmail() 
        ],(req, res)=>{
            let errors = validationResult(req)

            if (!errors.isEmpty()){
                app.utilsC.error.send(errors, req, res)
                return false
            }
        db.update({_id:req.params.id}, req.body, err=>{
            if(err){
                console.log("entrou no erro do update")
                app.utilsC.error.send(err, req, res)
            }else{
                res.status(200).json(Object.assign(req.body, req.params))
            }
        })
    })

    routeId.delete((req, res)=>{
        db.remove({_id: req.params.id}, {}, err=>{
            if(err){
                app.utilsC.error.send(err, req, res)
            }else{
                res.status(200).json(req.params)
            } 
        })
    })
}