const { check, validationResult } = require("express-validator")
let NeDB = require("nedb")
let db = new NeDB({
    filename: "users.db",
    autoload: true

})

module.exports = (app)=>{

    let route = app.route("/users")
    route.get((req, res)=>{

        db.find({}).sort({name:1}).exec((err, users)=>{
            if (err){
                app.utils.error.send(err, req, res)
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
        check("_name", "O nome é obrigatório.").notEmpty(),
        check("_email", "Email inválido.").notEmpty().isEmail()
        ], (req, res)=>{

        let errors = validationResult(req)
        if (!errors.isEmpty()){
            res.status(400).json({errors: errors.array()})
            return false
        }

        db.insert(req.body, (err, user)=>{

            if (err){
                app.utils.send(err, req, res)
                //res.status(400).json({errors: errors.array()})
                return false
            }else{
                res.status(200).json(user)
            }
        })
    })

    let routeId = app.route("/users/:id")

    routeId.get((req, res)=>{
        db.findOne({_id:req.params.id}).exec((err, user)=>{
            if (err){
                res.status(400).json({errors: errors.array()})
                return false
            }else{
                res.status(200).json(user)
            }
        })
    })

    routeId.put([
        check('_name','Você tem que inserir um nome').notEmpty(),
        check('_email','Digite um email válido').isEmail()],(req, res)=>{

            let errors = validationResult(req)
            if (!errors.isEmpty()){
                app.utils.send(err, req, res)
                //res.status(400).json({errors: errors.array()})
                return false
            }

        db.update({_id:req.params.id}, req.body, err=>{

            if (err){
                res.status(400).json({errors: errors.array()})
                return false
            }else{
                res.status(200).json(Object.assign(req.params, req.body))
            }
        })
    })

    routeId.delete((req, res)=>{
        db.remove({_id: req.params.id}, {}, err=>{
            if (err){
                app.utils.send(err, req, res)
                //res.status(400).json({errors: errors.array()})
                return false
            }else{
                res.status(200).json(req.params)
            }
        })
    })
}