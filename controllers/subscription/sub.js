/**
 * Created by Charles on 08/01/2019.
 */


function get(req, res) {
    res.status(200).json({
        "text": "Il n'existe pas d'abonnement dans la base de données"
    })
}


exports.get = get;