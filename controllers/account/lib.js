const User = require('../../schema/schemaUser.js');
const passwordHash = require("password-hash");
const config = require('../../config/config');

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
            account: "user",
            sub: []
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
                        "text": "Succes",
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

function getProfile(req, res) {
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
            res.status(200).json({
                "text": "Succès",
                "email": user.email,
                "lastname": user.lastname,
                "firstname": user.firstname
            })
        }
    })
}

function changeProfile(req, res) {
    //On vérifie que l'email est bien soumise en tant qu'ID
    if (!req.body.id) {
        res.status(400).json({
            "text": "Requête invalide"
        })
    } else {
        // On vérifie si l'utilisateur essaye de changer d'adresse email
        if (req.body.id === req.body.email) {
            // --- Le cas où l'utilisateur n'essaye pas de changer d'adresse email ---
            User.findOne({
                email: req.body.id
            }, function (err, user) {
                if (err) {
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
                } else if (!user) {
                    res.status(401).json({
                        'text': "L'utilisateur n'existe pas"
                    })
                } else {
                    // On vérifie si l'association email/mdp correspond
                    if (user.authenticate(req.body.password)) {
                        // On effectue les modification de l'utilisateur
                        User.update({email: req.body.id}, {
                                $set: {
                                    lastname: req.body.lastname,
                                    firstname: req.body.firstname
                                }
                            },
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
                                        "text": "Adresse email modifiée",
                                        "id": req.body.id
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
            // --- Le cas où l'utilisateur essaye de changer d'adresse email ---
            User.findOne({
                email: req.body.email
            }, function (err, user2) {
                if (!user2) {
                    User.findOne({
                        email: req.body.id
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
                                User.update({email: req.body.id}, {
                                        $set: {
                                            email: req.body.email,
                                            lastname: req.body.lastname,
                                            firstname: req.body.firstname
                                        }
                                    },
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
                                                "id": req.body.email
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

function applyCompany(req, res) {
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

            var msg = "L'utilisateur " + req.body.email + " souhaite avoir un compte entreprise";
            var info ={
                nom: req.body.nom,
                numSiret: req.body.numSiret,
                numTel: req.body.numTel,
                adresse: req.body.adresse,
                codePostal: req.body.codePostal,
                ville: req.body.ville
            }
            User.update({email: req.body.email},{$addToSet: {infoCompany:[req.body.nom,
                    req.body.numSiret,
                    req.body.numTel,
                    req.body.adresse,
                    req.body.codePostal,
                    req.body.ville]}},
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
                            "text": "Demande ajouté"
                        })
                    }
                })


            const mailOptions = {
                from: "Server@gmail.com",
                //to: req.body.email,
                to: req.body.email,
                subject: "Demande Entreprise",
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
            if (user.account == "company") {
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

//On exporte nos fonctions

exports.login = login;
exports.signup = signup;
exports.getProfile = getProfile;
exports.changeProfile = changeProfile;
exports.changeEmail = changeEmail;
exports.changePassword = changePassword;
exports.resetPassword = resetPassword;
exports.applyCompany = applyCompany;
exports.isCompany = isCompany;