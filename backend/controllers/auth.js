const { validationResult } = require('express-validator');

const bcryp = require('bcryptjs');

const User = require('../modèles/user');

exports.signup = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) return

    const nom = req.body.nom;
    const email = req.body.email;
    const secret = req.body.secret;

    try{
        const hashedSecret = await bcryp.hash(secret,12);
        
        const userDetails = {
            nom: nom,
            email: email,
            secret: hashedSecret
        }

        const result = await User.save(userDetails);

        res.status(201).json({message: 'utilisateur enregisté'});
    }catch(err){
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    }
}