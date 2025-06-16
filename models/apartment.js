const mongoose = require("mongoose");
const yup = require("yup");

const schema = new mongoose.Schema({
  nameuser: {
    type: String,
    required: true,
    trim: true,
  },
  phoneuser: {
    type: String,
    required: true,
  },
  titlead: {
    type: String,
    required: true,
    trim: true,
  },
  provinces: {
    type: String,
    required: true,
    trim: true,
  },
  cities: {
    type: String,
    required: true,
    trim: true,
  },
  life: {
    type: String,
    required: true,
  },
  meterage: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    // required: true,
    trim: true,
    max: 700,
  },
  imgs: {
    type: mongoose.SchemaTypes.Array,
    required: true,
  },
  map: {
    type: mongoose.SchemaTypes.Array,
    required: true,
  },
  possibilities: {
    type: mongoose.SchemaTypes.Array,
    required: true,
  },
  conditions: {
    type: mongoose.SchemaTypes.Array,
    required: true,
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  acc: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "apartment",
  },
  createAt: {
    type: Date,
  },
});

schema.statics.validateA = function (body) {
  return yup
    .object()
    .shape({
      nameuser: yup
        .string()
        .required({
          msg: "این فیلد اجباری است",
          fild: "nameuser",
          value: body.nameuser,
        })
        .max(75, {
          msg: "تعداد کاراکتر ها خیلی زیاد است",
          fild: "username",
          value: body.nameuser,
        }),
      phoneuser: yup.string().required({
        msg: "این فیلد اجباری است",
        fild: "phoneuser",
        value: body.phoneuser,
      }),
      titlead: yup
        .string()
        .required({
          msg: "این فیلد اجباری است",
          fild: "titlead",
          value: body.titlead,
        })
        .max(100, {
          msg: "تعداد کاراکتر ها خیلی زیاد است",
          fild: "titlead",
          value: body.titlead,
        }),
      provinces: yup
        .string()
        .required({
          msg: "این فیلد اجباری است",
          fild: "provinces",
          value: body.provinces,
        })
        .max(100, {
          msg: "تعداد کاراکتر ها خیلی زیاد است",
          fild: "provinces",
          value: body.provinces,
        }),
      cities: yup
        .string()
        .required({
          msg: "این فیلد اجباری است",
          fild: "cities",
          value: body.cities,
        })
        .max(100, {
          msg: "تعداد کاراکتر ها خیلی زیاد است",
          fild: "cities",
          value: body.cities,
        }),
      life: yup.string().required({
        msg: "این فیلد اجباری است",
        fild: "life",
        value: body.life,
      }),
      room: yup.string().required({
        msg: "این فیلد اجباری است",
        fild: "room",
        value: body.room,
      }),
      meterage: yup.string().required({
        msg: "این فیلد اجباری است",
        fild: "meterage",
        value: body.meterage,
      }),
      price: yup.string().required({
        msg: "این فیلد اجباری است",
        fild: "price",
        value: body.price,
      }),
      // description: yup.string().required({
      //   msg: "این فیلد اجباری است",
      //   fild: "description",
      //   value: body.description,
      // }).max(500, {
      //   msg: "تعداد کاراکتر ها خیلی زیاد است",
      //   fild: "description",
      //   value: body.description,
      // }),
      imgs: yup.array().required({
        msg: "این فیلد اجباری است",
        fild: "imgs",
        value: body.imgs,
      }),
      map: yup.array().required({
        msg: "این فیلد اجباری است",
        fild: "map",
        value: body.map,
      }),
      possibilities: yup.array().required({
        msg: "این فیلد اجباری است",
        fild: "possibilities",
        value: body.possibilities,
      }),
      conditions: yup.array().required({
        msg: "این فیلد اجباری است",
        fild: "conditions",
        value: body.conditions,
      }),
    })
    .validate(body, {
      abortEarly: false,
    });
};

module.exports = mongoose.model("apartment", schema);
