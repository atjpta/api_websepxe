const express = require("express");
const team = require("../controllers/team.controller");

module.exports = (app) => {
    const router = express.Router();

    router.route("/")
        .get(team.getAllTeam)
        .post(team.createTeam)
        .delete(team.deleteAll)

    router.route("/:id")
        .put(team.update)
        .delete(team.delete)

    app.use("/api/team", router);
};