const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const router = require("express").Router();
var models = require('../models');
const controllers = require('../controllers/controller')
const jwt = require('jsonwebtoken');



router.post("/signup", async (req, res, next) => {
    // console.log(next.toString(),'ppppppppppppppppppppppppp');
    try {

        if (!req.body.email) {
            return res.status(200).send({
                success: false,
                message: 'Error:email is not valid'
            })
        };
        if (!req.body.password) {
            return res.status(200).send({
                success: false,
                message: 'Error:password is not valid'
            })
        }
        if (!req.body.last_name) {
            return res.status(200).send({
                success: false,
                message: 'Error:name can not be blank'
            })
        };
        let finduser = await models.User.findOne({ where: { email: `${req.body.email}` } });
        if (finduser !== null) {
            return res.status(200).send({
                success: false,
                message: 'Error:Account alredy exist.',
                finduser
            })

        }
        const salt = genSaltSync(10);
        return await models.User.create({
            last_name: req.body.last_name,
            first_name: req.body.first_name,
            date: req.body.date,
            password: hashSync(req.body.password, salt),
            email: req.body.email,
            TaskId: req.body.TaskId
        }).then((users) => {
            if (users) {
                res.send({
                    success: true,
                    message: 'Signing Up.',
                })
            } else {
                response.status(200).send('Error in insert new record');
            }

        })
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
});

router.post("/signin", async (req, res) => {
    if (!req.body.email) {
        return res.status(200).send({
            success: false,
            message: 'Error:email cannot be blank'
        })
    };
    if (!req.body.password) {
        return res.status(200).send({
            success: false,
            message: 'Error:password cannot be blank'
        })
    }
    req.body.email = req.body.email.toLowerCase();

    await models.User.findOne({ where: { email: req.body.email } })
        .then((us) => {
            if (us) {
                if (compareSync(req.body.password, us.dataValues.password)) {

                    const user = {
                        email: req.body.email,
                        password: req.body.password
                    }
                    jwt.sign({ user }, 'secret', (err, token) => {
                        return res.send({
                            token,
                            last_name: us.last_name,
                            success: true,
                            message: 'ok'
                        })
                    });
                } else {
                    return res.status(200).send({
                        success: false,
                        message: 'Error:Invalid email or password'
                    })
                }
            } else {
                return res.status(200).send({
                    success: false,
                    message: 'Error:Invalid email or password'
                })
            }
        })
        .catch((err) => {
            if (err) {
                return res.status(400).send({
                    success: false,
                    message: 'Error:Server Error'
                })

            }
        })

})

router.get('/verify', controllers.checkToken)

router.get('/upload', async (req, res) => {
    try {
        await models.User.findAll().then((us) => {
            if (!us) {
                res.send({ message: 'user not found' })
            }
            (res.send({ username: us }))
        })
    }
    catch {
        (err) => res.send({ err })
    }
})

router.post("/posttask", async (req, res) => {
    await models.Task.create({
        title: req.body.title
    }).then((done) => res.send({ succes: true }))

})

router.get("/getUserTasks", controllers.getUserTasks)

module.exports = router;