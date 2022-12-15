const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {
        name: {
            type: String,
        },
        want: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        follow: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        xe: {
            type: String,
            default: false,
        },
        taylai: {
            type: String,
            default: false,
        },
        team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "team"
        },
        time_di: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "time"
        },
        time_ve: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "time"
        },
    },
);

schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model("user", schema);