const User = require('../../schema/schemaUser.js');
const passwordHash = require("password-hash");
const config = require('../../config/config');
const jwt = require('jwt-simple');

function signup(req, res) {
    if (!req.body.email || !req.body.password) {
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
        res.status(400).json({
            "text": "Requête invalide"
        })
    } else {
        var user = {
            email: req.body.email,
            password: passwordHash.generate(req.body.password),
            account: "user"
        };
        var findUser = new Promise(function (resolve, reject) {
            User.findOne({
                email: user.email
            }, function (err, result) {
                if (err) {
                    reject(500);
                } else {
                    if (result) {
                        reject(204)
                    } else {
                        resolve(true)
                    }
                }
            })
        });

        findUser.then(function () {
            var _u = new User(user);
            _u.save(function (err, user) {
                if (err) {
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
                } else {
                    res.status(200).json({
                        "text": "Succès",
                        "token": user.getToken(),
                        "id": req.body.email
                    })
                }
            })
        }, function (error) {
            switch (error) {
                case 500:
                    res.status(500).json({
                        "text": "Erreur interne"
                    });
                    break;
                case 204:
                    res.status(204).json({
                        "text": "L'adresse email existe déjà"
                    });
                    break;
                default:
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
            }
        })
    }
}

function login(req, res) {
    if (!req.body.email || !req.body.password) {
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
        res.status(400).json({
            "text": "Requête invalide"
        })
    } else {
        User.findOne({
            email: req.body.email
        }, function (err, user) {
            if (err) {
                res.status(500).json({
                    "text": "Erreur interne"
                })
            } else if (!user) {
                res.status(401).json({
                    "text": "L'utilisateur n'existe pas"
                })
            } else {
                if (user.authenticate(req.body.password)) {
                    res.status(200).json({
                        "token": user.getToken(),
                        "id": req.body.email,
                        "text": "Authentification réussi"
                    })
                } else {
                    res.status(401).json({
                        "text": "Mot de passe incorrect"
                    })
                }
            }
        })
    }
}

function changeEmail(req, res) {
    if (!req.body.email || !req.body.password) {
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
        res.status(400).json({
            "text": "Requête invalide"
        })
    } else {
        User.findOne({
            email: req.body.nemail
        }, function (err, user2) {
            if (!user2) {
                User.findOne({
                    email: req.body.email
                }, function (err, user) {
                    if (err) {
                        res.status(500).json({
                            "text": "Erreur interne"
                        })
                    } else if (!user) {
                        res.status(401).json({
                            "text": "L'utilisateur n'existe pas"
                        })
                    } else {
                        if (user.authenticate(req.body.password)) {
                            User.update({email: req.body.email}, {$set: {email: req.body.nemail}},
                                function (err, user) {
                                    if (err) {
                                        res.status(500).json({
                                            "text": "Erreur interne"
                                        })
                                    } else if (!user) {
                                        res.status(401).json({
                                            "text": "L'utilisateur n'existe pas"
                                        })

                                    } else {
                                        res.status(200).json({
                                            "text": "Adresse mail modifiée",
                                            "id": req.body.nemail
                                        })
                                    }
                                })


                        } else {
                            res.status(401).json({
                                "text": "Mot de passe incorrect"
                            })
                        }
                    }
                })
            } else {
                res.status(500).json({
                    "text": "adresse mail deja utilisée"
                })
            }
        })
    }
}


function changePassword(req, res) {
    if (!req.body.email || !req.body.password) {
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
        res.status(400).json({
            "text": "Requête invalide"
        })
    } else {
        User.findOne({
            email: req.body.email
        }, function (err, user) {
            if (err) {
                res.status(500).json({
                    "text": "Erreur interne"
                })
            } else if (!user) {
                res.status(401).json({
                    "text": "L'utilisateur n'existe pas"
                })
            } else {
                if (user.authenticate(req.body.password)) {
                    var pwd = passwordHash.generate(req.body.npassword);

                    User.update({email: req.body.email}, {$set: {password: pwd}},
                        function (err, user) {
                            if (err) {
                                res.status(500).json({
                                    "text": "Erreur interne"
                                })
                            } else if (!user) {
                                res.status(401).json({
                                    "text": "L'utilisateur n'existe pas"
                                })

                            } else {
                                res.status(200).json({
                                    "text": "Le mot de passe a bien été modifié",
                                    "id": req.body.nemail
                                })
                            }
                        })


                } else {
                    res.status(401).json({
                        "text": "Mot de passe incorrect"
                    })
                }
            }
        })
    }
}

/*
 * npm install generate-password --save
 * npm install nodemailer
 * https://mailtrap.io/inboxes
 *
 * Remplacez ces valeurs par celles vous correspondants
 * user: "b33959999592f9",
 * pass: "95f4bc01d93054"
 *
 */
function resetPassword(req, res) {
    //Start Here

    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) {
            res.status(500).json({
                "text": "Erreur interne"
            })
        } else if (!user) {
            res.status(401).json({
                "text": "L'utilisateur n'existe pas"
            })
        } else {
            // Si l'utilisateur existe
            var nodemailer = require("nodemailer");
            var transporter = nodemailer.createTransport({
                host: "smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: config.mtusername,
                    pass: config.mtpassword
                }
            });

            var generator = require('generate-password');

            var newpwd = generator.generate({
                length: 10,
                numbers: true
            });
            var msg = "Vous mot de passe a été changé. \nVoici votre nouveau mot de passe : \n" + newpwd;


            const mailOptions = {
                from: "Server@gmail.com",
                //to: req.body.email,
                to: req.body.email,
                subject: "Email Test",
                text: msg
            };


            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    //console.log(err);
                    //return next(err);
                    res.status(500).json({
                        "text": "erreur interne"
                    })
                } else {
                    var pwdhash = passwordHash.generate(newpwd);
                    User.update({email: req.body.email}, {$set: {password: pwdhash}},
                        function (err, user) {
                            if (err) {
                                res.status(500).json({
                                    "text": "Erreur interne"
                                })
                            } else if (!user) {
                                res.status(401).json({
                                    "text": "L'utilisateur n'existe pas"
                                })

                            } else {
                                res.status(200).json({
                                    "text": "mot de passe reset"
                                })
                            }
                        })
                }

                transporter.close();
            });
        }
    })

}

function isCompany(req,res) {
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (user) {
            if (user.account == "company"){
                res.status(200).json({
                    "response": true
                })
            }else{
                res.status(200).json({
                    "response": false
                })
            }

        }else{
            res.status(500).json({
                "response": "Erreur qui n'est pas censée se produire"
            })
        }
    })
}

function token(req,res) {
    var token = req.body.token;
    if (!token){
        res.status(200).json({
            "response": yyyy
        })
    }
    try {

        let decoded = jwt.decode(req.body.token, config.secret);

        User.findOne({
            email: decoded.email,
            _id:decoded._id
        }, function (err, user) {
               if(user){
                   res.status(200).json({
                       "response": "true"
                   })
               }else{
                   res.status(500).json({
                       "response": "false"
                   })
               }
        })


    } catch (e) {
        //console.error(e)
        console.error(token);
        res.status(500).json({
            "response": "false"
        })
    }
}
//On exporte nos deux fonctions

exports.login = login;
exports.signup = signup;
exports.changeEmail = changeEmail;
exports.changePassword = changePassword;
exports.resetPassword = resetPassword;
exports.isCompany = isCompany;
exports.token = token;