const mognoose = require("mongoose");
const yup = require("yup");

const Schema = new mognoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    max: 100,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    max: 12,
  },
  map: {
    type: mognoose.SchemaTypes.Array,
    required: true,
  },
  text: {
    type: String,
    max: 450,
  },
  user: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    required: true,
  },
});
Schema.statics.validateKarshnas = function (body) {
  return yup.object().shape({
    name: yup
      .string()
      .required({ name: "name", msg: "این فیلد اجباری است" })
      .max(100, { name: "name", msg: "این فیلد خیلی طولانی است" }),
    phone: yup
      .string()
      .required({ name: "phone", msg: "این فیلد اجباری است" })
      .max(11, { name: "phone", msg: "شماره درست نیست" }),
    map: yup.array().required({ name: "map", msg: "این فیلد اجباری است" }),
    text: yup
      .string()
      .required({ name: "text", msg: "این فیلد اجباری است" })
      .max(450, { name: "text", msg: "این فیلد خیلی طولانی است" }),
  }).validate(body, {
    abortEarly: false,
  });
};

module.exports = mognoose.model("karshnas", Schema);
