const mongoose = require("mongoose")
const yup = require("yup")

const Schema = new mongoose.Schema({
    email: {
        type: String,
        max: 200,
        required: true,
    },
    createAt: {
        type: Date,
        required: true,
    }
})

Schema.statics.validYup = function(body) {
    return yup.object().shape({
        email: yup.string().email().required().max(200)
    }).validate(body)
}

module.exports = mongoose.model("news", Schema)