const mongoose = require("mongoose");
const yup = require("yup");

const Schema = new mongoose.Schema({
  name: {
    type: String,
    reqruid: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
  },
});

Schema.statics.validateCounseling = function (body) {
  return yup
    .object()
    .shape({
      name: yup.string().required({
        msg: "این فیلد اجباری است",
        fild: "name",
        value: body.name,
      }),
      phone: yup
        .string()
        .required({
          msg: "این فیلد اجباری است",
          fild: "phone",
          value: body.phone,
        })
        .max(11, {
          msg: "فرمت شماره شما درست نیست",
          fild: "phone",
          value: body.phone,
        }),
      description: yup
        .string()
        .required({
          msg: "این فیلد اجباری است",
          fild: "description",
          value: body.description,
        })
        .max(2000, {
          msg: "شما بیش از حد کاراکتر وارد کرده اید",
          fild: "description",
          value: body.description,
        }),
    })
    .validate(body, {
      abortEarly: false,
    });
};

module.exports = mongoose.model("counseling", Schema);
