const mongoose = require("mongoose");
const User = require("../models/user.models");

exports.getAllUsersByTeam = async (req, res, next) => {
    try {
        const users = await User.find()
        return res.json(users);
    } catch (ex) {
        return next(
            res.status(500).json({ Message: 'không  thể  lấy getAllUsersByTeam' })
        )
    }
};

exports.createUser = async (req, res, next) => {
    const user = new User({
        name: req.body.name,
    })
    try {
        const document = user.save();
        return res.status(200).json({ Message: 'thêm thành công' + user.name})
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
        const document = await User.findByIdAndUpdate(condition, req.body, {
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
            res.status(500).json({ Message: ` không thể update user với id = ${req.params.id} ` + error })
        )
    }
}

// xóa follow 
exports.removeFollow = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(
            res.status(400).json({ Message: "thông tin không thế thay đổi" })
        )
    }
    const { id } = req.params;
    const { follow } = req.body;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };
    try {
        const document1 = await User.findByIdAndUpdate(condition, 
            { follow: null }
    );
        if (!document1) {
            return next(res.status(404).json({ Message: "không thể tìm thấy rempveFollow" }));
        }
        return res.send({ message: "đã rempveFollow thành công", body: req.body });
    }
    catch (error) {
        console.log(error);
        return next(
            res.status(500).json({ Message: ` không thể update rempveFollow ` + follow })
        )
    }
}


exports.delete = async (req, res, next) => {
    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try {
        const document = await User.findOneAndDelete(condition);
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy user" }));
        }
        return res.send({ message: "đã xóa user thành công" });
    }
    catch (error) {
        return next(
            res.status(500).json({ Message: ` không thể xóa user với id = ${req.params.id} ` })
        )
    }
}
exports.deleteAll = async (req, res, next) => {
    try {
        const data = await User.deleteMany({});
        return res.send({ message: `${data.deletedCount}  user đã xóa thành công` });
    }
    catch (error) {
        return next(
            res.status(500).json({ Message: ` có lỗi khi đang xóa tất cả user` })
        )
    }
}



