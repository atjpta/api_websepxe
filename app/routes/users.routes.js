const express = require("express");
const users = require("../controllers/users.controller");
const { checkDuplicateName } = require("../middlewares/withoutName");

module.exports = (app) => {
    const router = express.Router();

    router.route("/")
        .get(users.getAllUsersByTeam)
        .post([checkDuplicateName], users.createUser)
        .delete(users.deleteAll)
    
    router.route("/:id")
        .put(users.update)
        .delete(users.delete)
    
    router.route("/:page")
        .get(users.get6Users)
    
    router.route("/max/page")
        .get(users.getMaxPage)
    
    router.route("/deletefollow/:id")
        .put(users.removeFollow)
    
    app.use("/api/users", router); 
};