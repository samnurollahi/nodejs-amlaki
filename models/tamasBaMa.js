const mongoose = require("mongoose");
const yup = require("yup");

const Schema = new mongoose.Schema({
  name: {
    type: String,
    max: 100,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    max: 100,
    required: true,
  },
  text: {
    type: String,
    max: 350,
    trim: true,
    required: true,
  },
  createAt: {
    type: Date,
    required: true,
  },
});

Schema.statics.validateYup = function (body) {
  return yup
    .object()
    .shape({
      name: yup
        .string()
        .required({
          name: "name",
          body,
          msg: "این فیلد اجباری است",
        })
        .max(100, {
          name: "name",
          body,
          msg: "اسم شما خیلی طولانی است",
        }),
      email: yup
        .string()
        .email({ name: "email", body, msg: "ایمیل شما درست نیست" })
        .required({
          name: "email",
          body,
          msg: "این فیلد اجباری است",
        })
        .max(100, {
          name: "email",
          body,
          msg: "ایمیل شما خیلی طولانی است",
        }),
      text: yup
        .string()
        .required({
          name: "text",
          body,
          msg: "این فیلد اجباری است",
        })
        .max(350, {
          name: "text",
          body,
          msg: "این فیلد خیلی طولانی است",
        }),
    })
    .validate(body, {
      abortEarly: false,
    });
};

module.exports = mongoose.model("tamasbama", Schema);
