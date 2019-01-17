/**
 * Created by Charles on 08/01/2019.
 */
const Subscription = require('../../schema/schemaSubscription.js');

function get(req, res) {
    res.status(200).json({
        "text": "Il n'existe pas d'abonnement dans la base de données"
    })
}

function create(req, res) {
    if (!req.body.name || !req.body.price || !req.body.descri || !req.body.mensu || !req.body.engage) {
        //Le cas ou il manque des champs
        res.status(400).json({
            "text": "Requête invalide"
        })
    } else {
        var subs = {
            name: req.body.name,
            company: "Netflix",
            price: req.body.price,
            descri: req.body.descri,
            mensu: req.body.mensu,
            engage: req.body.engage
        };


        var findSubscription = new Promise(function (resolve, reject) {
            Subscription.find({
                name: subs.name,
                company:subs.company
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


        findSubscription.then(function () {
            var _s = new Subscription(subs);
            _s.save(function (err, subs) {
                if (err) {
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
                } else {
                    res.status(200).json({
                        "text": "Succès"
                    })
                }
            })
        }, function (error) {
            res.status(200).json({
                "text": error
            })
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
}


exports.get = get;
exports.create = create;
