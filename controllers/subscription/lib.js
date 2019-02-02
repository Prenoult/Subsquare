const Subscription = require('../../schema/schemaSubscription.js');
const User = require('../../schema/schemaUser.js');

function get(req, res) {
    if(!req.body.email){
        res.status(400).json({
            "text": "Requête invalide"
        })
    }else {
        User.findOne({
            email: req.body.email
        }, function (err, user) {
            if(user){
                Subscription.find({ _id: { $in: user.sub } }, function (err, s){
                    if (s){
                        res.status(200).json({
                            "text": "succees",
                            "dd":s
                        })
                    }
                });
            }else{
                res.status(500).json({
                    "text": "Erreur interne"
                })
            }
        })


    }
}

function allSubs(req,res){
    if(!req.body.email){
        res.status(400).json({
            "text": "Requête invalide"
        })
    }else {
        User.findOne({
            email: req.body.email
        }, function (err, user) {
            if(user){
                Subscription.find({ _id: { $nin: user.sub } }, function (err, s){
                    if (s){
                        res.status(200).json({
                            "text": "succees",
                            "sub":s
                        })
                    }
                });
            }else{
                res.status(500).json({
                    "text": "Erreur interne"
                })
            }
        })


    }
}

function create(req, res) {
    if (!req.body.name || !req.body.price || !req.body.category || !req.body.descri || !req.body.mensu || !req.body.engage) {
        //Le cas ou il manque des champs
        res.status(400).json({
            "text": "Requête invalide"
        })
    } else {
        var com="";
        User.findOne({
            email: req.body.user
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
                var subs = {
                    name: req.body.name,
                    company: user.infoCompany[0],
                    category: req.body.category,
                    price: req.body.price,
                    descri: req.body.descri,
                    mensu: req.body.mensu,
                    engage: req.body.engage
                };
                var findSubscription = new Promise(function (resolve, reject) {
                    Subscription.findOne({
                        name: subs.name,
                        company: subs.company
                    }, function (err, result) {
                        if (err) {
                            reject(500);
                        } else {
                            if (result) {
                                res.status(204).json({
                                    "text": "L'abonnement existe deja"
                                });
                            } else {
                                resolve(true)
                            }
                        }
                    })
                });


                findSubscription.then(function () {
                    var _s = new Subscription(subs);
                    _s.save(function (err, subs) {
                        if (err) {
                            res.status(500).json({
                                "text": "Erreur interne"
                            })
                        } else {
                            if (subs) {
                                //Rercherche de l'utilisateur
                                User.findOne({
                                    email: req.body.user
                                }, function (err, user) {
                                    if (err) {
                                        res.status(500).json({
                                            "text": "Erreur interne"
                                        })
                                    } else if (user) {

                                        // Ajout de l'abonnement
                                        User.update({email: req.body.user}, {$push: {sub: subs._id}},
                                            function (err, user1) {
                                                if (err) {
                                                    res.status(500).json({
                                                        "text": "Erreur interne"
                                                    })
                                                } else if (!user1) {
                                                    res.status(401).json({
                                                        "text": "L'utilisateur n'existe pas"
                                                    })

                                                } else {
                                                    res.status(200).json({
                                                        "text": "succees"
                                                    })
                                                }
                                            })

                                    } else {
                                        res.status(401).json({
                                            "text": "L'utilisateur n'existe pas"
                                        })

                                    }
                                })
                            }
                        }
                    })
                },
                function (error) {
                    res.status(200).json({
                        "text": error
                    });
                    switch (error) {
                        case 500:
                            res.status(500).json({
                                "text": "Erreur interne"
                            });
                            break;
                        case 204:
                            res.status(204).json({
                                "text": "Le nom de l'abonnement existe déjà"
                            });
                            break;
                        default:
                            res.status(500).json({
                                "text": "Erreur interne"
                            })
                    }
                })
            }
        })
    }
}


exports.get = get;
exports.create = create;
exports.allSubs = allSubs;