const express = require("express");
const time = require("../controllers/time.controller");

module.exports = (app) => {
    const router = express.Router();

    router.route("/")
        .get(time.getAllTime)
        .post(time.createTime)
        .delete(time.deleteAll)

    router.route("/:id")
        .put(time.update)
        .delete(time.delete)

    app.use("/api/time", router);
};