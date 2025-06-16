const mongoose = require("mongoose");
const yup = require("yup");

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 1500,
    trim: true,
  },
  email: {
    type: String,
    require: true,
  },
  accEmail: {
    type: Boolean,
    default: false,
  },
  time: {
    type: Date,
  },
  password: {
    type: String,
    rqeuired: true,
  },
  role: {
    type: String,
    default: "user",
    required: true,
    enum: ["user", "admin", "boss", "consultant"],
  },
  notifications: {
    type: Boolean,
    default: true,
  },
  saveAd: {
    type: Array,
    default: []
  },
  createAt: {
    type: Date,
  },
});

Schema.statics.validateUser = function (body) {
  return yup
    .object()
    .shape({
      name: yup
        .string()
        .required({
          msg: "این فیلد اجباری می باشد",
          fild: "name",
          value: body.name,
        })
        .min(3, {
          msg: "کاراکتر های بیشتری وارد کنید",
          fild: "name",
          value: body.name,
        })
        .max(100, {
          msg: "حجم این فیلد بسیار زیاد است",
          fild: "name",
          value: body.name,
        }),
      email: yup
        .string()
        .email({
          msg: "فرمت ایمیل نادرست است",
          fild: "email",
          value: body.email,
        })
        .required({
          msg: "این فیلد اجباری می باشد",
          fild: "email",
          value: body.email,
        })
        .max(100, {
          msg: "حجم این فیلد بسیار زیاد است",
          fild: "email",
          value: body.email,
        }),
      password: yup
        .string()
        .required({
          msg: "این فیلد اجباری می باشد",
          fild: "password",
          value: body.password,
        })
        .min(6, {
          msg: "رمز عبور شما خیلی کوتاه است",
          fild: "password",
          value: body.password,
        })
        .max(100, {
          msg: "حجم این فیلد بسیار زیاد است",
          fild: "password",
          value: body.password,
        }),
      confirmPassword: yup
        .string()
        .required({
          msg: "این فیلد اجباری می باشد",
          fild: "confirmPassword",
          value: body.confirmPassword,
        })
        .oneOf([yup.ref("password"), null], {
          msg: "تکرار رمز عبور نادرست است",
          fild: "confirmPassword",
          value: body.confirmPassword,
        }),
    })
    .validate(body, {
      abortEarly: false,
    });
};


module.exports = mongoose.model("user", Schema);
