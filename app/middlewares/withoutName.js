const db = require('../models')
const User = db.user;
exports.checkDuplicateName = (req, res, next) => {
    // Username
    User.findOne({
        name: req.body.name,
    }).exec((err, Name) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (Name) {
            res.status(400).send({ message: "Failed! Name đã được sử dụng!" });
            return;
        }
        next();
    });
};


