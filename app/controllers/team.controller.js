const mongoose = require("mongoose");
const Team = require("../models/team.models");

exports.getAllTeam = async (req, res, next) => {
    try {
        const teams = await Team.find();
        return res.json(teams);
    } catch (ex) {
        return next(
            res.status(500).json({ Message: 'không  thể  lấy getAllTeam' })
        )
    }
};

exports.createTeam = async (req, res, next) => {
    const team = new Team({
        name: req.body.name,
    })
    try {
        const document = team.save();
        return res.status(200).json({ Message: 'thêm thành công' + team.name })
    } catch (ex) {
        return next(
            res.status(500).json({ Message: 'không  thể  lấy getAllUsersByTeam' })
        )
    }

}

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(
            res.status(400).json({ Message: "thông tin không thế thay đổi" })
        )
    }
    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try {
        const document = await Team.findByIdAndUpdate(condition, req.body, {
            new: true
        });
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy user" }));
        }
        return res.send({ message: "đã update thành công", body: req.body });
    }
    catch (error) {
        console.log(error);
        return next(
            res.status(500).json({ Message: ` không thể update user với id = ${req.params.id} ` })
        )
    }
}

exports.delete = async (req, res, next) => {
    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try {
        const document = await Team.findOneAndDelete(condition);
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy Team" }));
        }
        return res.send({ message: "đã xóa Team thành công" });
    }
    catch (error) {
        return next(
            res.status(500).json({ Message: ` không thể xóa Team với id = ${req.params.id} ` })
        )
    }
}
exports.deleteAll = async (req, res, next) => {
    try {
        const data = await Team.deleteMany({});
        return res.send({ message: `${data.deletedCount}  Team đã xóa thành công` });
    }
    catch (error) {
        return next(
            res.status(500).json({ Message: ` có lỗi khi đang xóa tất cả Team` })
        )
    }
}



