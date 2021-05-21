const models = require("../models");
const jwt = require('jsonwebtoken');
const { verifyUser } = require("../utils/verifyUser")



exports.getUserTasks = (req, res) => {
    verifyUser(req, res).then((data,err) => {
        if (!data.success) res.send(data.message)
        else {
           res.cookie('myCookie',data)
           console.log(req.cookie(),'lllllllllllllllllllllll')
            models.User.findAll({
                include: {
                    model: models.Task,
                    include: {
                        model: models.Work
                    }
                },
                where: {
                    email: data.authData.user.email
                }
            }).then((data) =>
                res.send(data)
            );
        }
    })
        .catch((err) => res.send({err}))
}


exports.checkToken = (req, res) => {
    verifyUser(req, res).then((data) => {
        if (!data.success) res.send(data.message)
        else {
            res.send( data )
        }
    })
        .catch((err) => res.status(401).send(err))
}

