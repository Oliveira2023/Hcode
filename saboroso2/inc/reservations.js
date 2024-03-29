var conn = require('./db')
module.exports = {
    
    render(req, res, error, success){
        res.render('reservations', {
            title: 'Reservas',
            background: 'images/img_bg_2.jpg',
            h1: 'Reserve uma Mesa!',
            isHome: false,
            body: req.body,
            error,
            success
        })
    },
    save(fields){

        return new Promise((resolve, reject) => {

            let date = fields.date.split('/');
            fields.date = `${date[2]}-${date[1]}-${date[0]}`;
            conn.query(`
            insert into tb_reservations(name, email, people, date, time) values(?,?,?,?,?)
            `, [
                fields.name,
                fields.email,
                fields.people,
                fields.date,
                fields.time],
                function(err, results){
                if (err) {
                    reject(err)
                }else{
                    resolve(results)
                }
            })
        })

    }
}