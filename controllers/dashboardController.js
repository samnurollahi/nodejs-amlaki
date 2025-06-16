const path = require("path");

const multer = require("multer");
const sharp = require("sharp");
const jwt = require("jsonwebtoken");
const moment = require("jalali-moment");

const User = require("../models/user");
const Notifications = require("../models/notifications");
const Counseling = require("../models/counseling");
const Apartment = require("../models/apartment");
const Villa = require("../models/villa");
const RentApartman = require("../models/rentApartment");
const RentVilla = require("../models/rentVilla");
const Karshnas = require("../models/karshnas");
const UserController = require("../models/userController");
const { sendMail } = require("../utils/sendMail");
const { error404, error500 } = require("../errors/error");
const sendNF = require("../utils/sendNtifications");
const News = require("../models/news");
const TamasBaMa = require("../models/tamasBaMa");

exports.dashboard = async (req, res) => {
  if (req.user.role == "user") {
    res.render("user/userEdit", {
      pageTitle: "پنل مدیریت",
      path: "/dashboard",
      user: req.user,
      layout: "./layout/userDashboardLayout.ejs",
      isLogin: req.isAuthenticated(),
    });
  } else if (req.user.role == "boss") {
    function separate(Number) {
      Number += "";
      Number = Number.replace(",", "");
      x = Number.split(".");
      y = x[0];
      z = x.length > 1 ? "." + x[1] : "";
      var rgx = /(\d+)(\d{3})/;
      while (rgx.test(y)) y = y.replace(rgx, "$1" + "," + "$2");
      return y + z;
    }

    let users = await User.find().countDocuments();

    const today = new Date();
    const tenDaysAgo = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 10
    );

    const visites = await UserController.find({
      createAt: {
        $gte: tenDaysAgo,
        $lt: today,
      },
    });
    let ipTow = [];
    let views = [];
    let itemView = [];
    for (let i = 0; i < 10; i++) {
      itemView = [
        ...visites.filter((item) => {
          if (!ipTow.includes(item.ip)) {
            if (
              item.createAt.getDate() == today.getDate() - i &&
              item.createAt.getMonth() == today.getMonth() &&
              item.createAt.getFullYear() == today.getFullYear()
            ) {
              ipTow.push(item.ip);
              return item;
            }
          }
        }),
      ];
      views.push(itemView.length);
      ipTow = [];
    }

    const ads = [
      ...(await Apartment.find({
        createAt: {
          $gte: tenDaysAgo,
          $lt: today,
        },
      })),
      ...(await RentApartman.find({
        createAt: {
          $gte: tenDaysAgo,
          $lt: today,
        },
      })),
      ...(await Villa.find({
        createAt: {
          $gte: tenDaysAgo,
          $lt: today,
        },
      })),
      ...(await RentVilla.find({
        createAt: {
          $gte: tenDaysAgo,
          $lt: today,
        },
      })),
    ];
    let adsResult = [];
    let itemAd = [];
    for (let i = 0; i < 10; i++) {
      itemAd = [
        ...ads.filter((item) => {
          if (
            item.createAt.getDate() == today.getDate() - i &&
            item.createAt.getMonth() == today.getMonth() &&
            item.createAt.getFullYear() == today.getFullYear()
          ) {
            return item;
          }
        }),
      ];
      adsResult.push(itemAd.length);
    }

    let adToday = [
      ...(await Apartment.find()),
      ...(await RentApartman.find()),
      ...(await Villa.find()),
      ...(await RentVilla.find()),
    ];
    adToday = adToday.filter((item) => {
      if (
        item.createAt.getDate() == today.getDate() &&
        item.createAt.getMonth() == today.getMonth() &&
        item.createAt.getFullYear() == today.getFullYear()
      ) {
        return item;
      }
    }).length;

    const ip = [];
    let viewToday = await UserController.find();
    viewToday = viewToday.filter((item) => {
      if (!ip.includes(item.ip)) {
        if (
          item.createAt.getDate() == today.getDate() &&
          item.createAt.getMonth() == today.getMonth() &&
          item.createAt.getFullYear() == today.getFullYear()
        ) {
          ip.push(item.ip);
          return item;
        }
      }
    }).length;

    res.render("admin/amar.ejs", {
      pageTitle: "پنل مدیریت",
      isLogin: req.isAuthenticated(),
      path: "/dashboard",
      user: req.user,
      viewToday,
      users,
      views,
      adsResult,
      separate,
      adToday,
      layout: "./layout/bossDashboardLayout.ejs",
    });
  } else if (req.user.role == "admin") {
    function separate(Number) {
      Number += "";
      Number = Number.replace(",", "");
      x = Number.split(".");
      y = x[0];
      z = x.length > 1 ? "." + x[1] : "";
      var rgx = /(\d+)(\d{3})/;
      while (rgx.test(y)) y = y.replace(rgx, "$1" + "," + "$2");
      return y + z;
    }

    let users = await User.find().countDocuments();

    const today = new Date();
    const tenDaysAgo = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 10
    );

    const visites = await UserController.find({
      createAt: {
        $gte: tenDaysAgo,
        $lt: today,
      },
    });
    const ipTow = [];
    let views = [];
    let itemView = [];
    for (let i = 0; i < 10; i++) {
      itemView = [
        ...visites.filter((item) => {
          if (!ipTow.includes(item.ip)) {
            if (
              item.createAt.getDate() == today.getDate() - i &&
              item.createAt.getMonth() == today.getMonth() &&
              item.createAt.getFullYear() == today.getFullYear()
            ) {
              ipTow.push(item.ip);
              return item;
            }
          }
        }),
      ];
      views.push(itemView.length);
    }

    const ads = [
      ...(await Apartment.find({
        createAt: {
          $gte: tenDaysAgo,
          $lt: today,
        },
      })),
      ...(await RentApartman.find({
        createAt: {
          $gte: tenDaysAgo,
          $lt: today,
        },
      })),
      ...(await Villa.find({
        createAt: {
          $gte: tenDaysAgo,
          $lt: today,
        },
      })),
      ...(await RentVilla.find({
        createAt: {
          $gte: tenDaysAgo,
          $lt: today,
        },
      })),
    ];
    let adsResult = [];
    let itemAd = [];
    for (let i = 0; i < 10; i++) {
      itemAd = [
        ...ads.filter((item) => {
          if (
            item.createAt.getDate() == today.getDate() - i &&
            item.createAt.getMonth() == today.getMonth() &&
            item.createAt.getFullYear() == today.getFullYear()
          ) {
            return item;
          }
        }),
      ];
      adsResult.push(itemAd.length);
    }

    let adToday = [
      ...(await Apartment.find()),
      ...(await RentApartman.find()),
      ...(await Villa.find()),
      ...(await RentVilla.find()),
    ];
    adToday = adToday.filter((item) => {
      if (
        item.createAt.getDate() == today.getDate() &&
        item.createAt.getMonth() == today.getMonth() &&
        item.createAt.getFullYear() == today.getFullYear()
      ) {
        return item;
      }
    }).length;

    const ip = [];
    let viewToday = await UserController.find();
    viewToday = viewToday.filter((item) => {
      if (!ip.includes(item.ip)) {
        if (
          item.createAt.getDate() == today.getDate() &&
          item.createAt.getMonth() == today.getMonth() &&
          item.createAt.getFullYear() == today.getFullYear()
        ) {
          ip.push(item.ip);
          return item;
        }
      }
    }).length;

    res.render("admin/amar.ejs", {
      pageTitle: "پنل مدیریت",
      path: "/dashboard",
      user: req.user,
      viewToday,
      users,
      isLogin: req.isAuthenticated(),
      views,
      adsResult,
      separate,
      adToday,
      layout: "./layout/adminDashboardLayout.ejs",
    });
  } else if (req.user.role == "consultant") {
    res.redirect("/dashboard/counseling");
  }
};

exports.uAd = (req, res) => {
  res.render("user/userAd", {
    pageTitle: "پنل مدیریت",
    path: "/dashboard/ad",
    user: req.user,
    isLogin: req.isAuthenticated(),
    layout: "./layout/userDashboardLayout.ejs",
  });
};

exports.getPageCounseling = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (req.user.role == "user") {
      res.render("user/userCounseling", {
        pageTitle: "پنل مدیریت",
        path: "/dashboard/counseling",
        isLogin: req.isAuthenticated(),
        error: req.flash("errors")[0] ?? {},
        dataPost: req.flash("body")[0] ?? {},
        user: req.user,
        msg: req.flash("msg")[0] ?? false,
        layout: "./layout/userDashboardLayout.ejs",
      });
    } else if (req.user.role == "boss" || req.user.role == "consultant") {
      const data = await Counseling.find().limit(10);
      const fun = function (date) {
        return moment(date).locale("fa").format("D MMM YYYY");
      };
      res.render("admin/counseling", {
        pageTitle: "پنل مدیریت",
        path: "/dashboard/counseling",
        isLogin: req.isAuthenticated(),
        user: req.user,
        data,
        fun,
        layout:
          req.user.role == "boss"
            ? "./layout/bossDashboardLayout.ejs"
            : "./layout/consultantDashboardLayout.ejs",
      });
    } else {
      error404(req, res);
    }
  } catch (err) {
    error500(req, res);
  }
};

exports.deleteCounseling = async (req, res) => {
  if (req.user.role == "boss" || req.user.role == "consultant") {
    try {
      const counseling = await Counseling.findById(req.body.id);
      await Counseling.findByIdAndDelete(req.body.id);
      sendNF("متاسفانه درخواست مشاوره شما رد شد", counseling.user, "warning");
      return res.status(200).send();
    } catch (err) {
      res.status(404).send();
    }
  }
  res.status(500).send();
};

exports.accCounseling = async (req, res) => {
  if (req.user.role == "boss" || req.user.role == "consultant") {
    try {
      const counseling = await Counseling.findById(req.body.id);
      await Counseling.findByIdAndDelete(req.body.id);
      sendNF(
        "درخواست مشاوره شما تایید شد بزودی با شما تماس خواهیم گرفت",
        counseling.user,
        "success"
      );
      return res.status(200).send();
    } catch (err) {
      res.status(404).send();
    }
  }
  res.status(500).send();
};

exports.getCounseling = async (req, res) => {
  if (req.user.role == "boss") {
    const counseling = await Counseling.find()
      .skip(req.body.page * 10)
      .limit(10);
    res.status(200).json(counseling);
  }
  res.status(500).send();
};

exports.editProfile = async (req, res) => {
  if (req.body.name) {
    const user = await User.findById(req.user.id);
    user.name = req.body.name;
    await user.save();
  }
  res.redirect("back");
};

exports.counselingHandel = async (req, res) => {
  const { name, phone, description } = req.body;
  const error = {};
  try {
    await Counseling.validateCounseling(req.body);
    await Counseling.create({
      name,
      phone,
      description,
      user: req.user.id,
      createAt: new Date(),
    });
    req.flash(
      "msg",
      "درخواست شما ارسال شد بزودی مشاوران ما با شما تماس میگیرند"
    );
    res.redirect("back");
  } catch (err) {
    const fildName = [];
    err.errors.forEach((e) => {
      if (!fildName.includes(e.fild)) {
        fildName.push(e.fild);
        error[e.fild] = [e.msg, e.value];
      }
    });
    req.flash("errors", error);
    req.flash("body", req.body);
    res.redirect("back");
  }
};

exports.logout = (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
};

exports.uploadImg = (req, res) => {
  const upload = multer({
    limits: { fileSize: 10_000_000 }, //~5MB
    fileFilter: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      if (ext == ".jpg" || ext == ".jpeg" || ext == ".JPG" || ext == ".JPEG") {
        cb(null, true);
      } else {
        cb("این پسوند پشتیبانی نمی شود", false);
      }
    },
  }).single("img");

  upload(req, res, async (err) => {
    if (err) {
      if (err.code == "LIMIT_FILE_SIZE") {
        return res.status(400).send("حجم فایل ارسالی بسیار زیاد است");
      }
      res.status(400).send(err);
    } else {
      if (req.file) {
        const fileName = `${Date.now()}`;
        await sharp(req.file.buffer)
          .jpeg({
            quality: 60,
          })
          .toFile(`./public/uploads/img/${fileName}.jpg`);
        res.status(200).send(`/uploads/img/${fileName}.jpg`);
      } else {
        res.status(400).send("برای اپلود باید عکسی انتخاب کرده باشید");
      }
    }
  });
};

exports.apartman = async (req, res) => {
  const error = {};
  try {
    await Apartment.validateA(req.body);
    await Apartment.create({
      ...req.body,
      user: req.user.id,
      createAt: new Date(),
    });
    res.status(200).json({ msg: "اگهی شما باموفقیت ثبت شد" });
  } catch (err) {
    const fildName = [];
    err.errors.forEach((e) => {
      if (!fildName.includes(e.fild)) {
        fildName.push(e.fild);
        error[e.fild] = [e.msg, e.value];
      }
    });
    res.status(401).json(JSON.stringify({ error, fildName }));
  }
};

exports.villa = async (req, res) => {
  const error = {};
  try {
    await Villa.validateA(req.body);
    await Villa.create({
      ...req.body,
      user: req.user.id,
      createAt: new Date(),
    });
    res.status(200).json({ msg: "اگهی شما باموفقیت ثبت شد" });
  } catch (err) {
    const fildName = [];
    err.errors.forEach((e) => {
      if (!fildName.includes(e.fild)) {
        fildName.push(e.fild);
        error[e.fild] = [e.msg, e.value];
      }
    });
    res.status(401).json(JSON.stringify({ error, fildName }));
  }
};

exports.rentApartman = async (req, res) => {
  const error = {};
  try {
    await RentApartman.validateA(req.body);
    await RentApartman.create({
      ...req.body,
      user: req.user.id,
      createAt: new Date(),
    });
    res.status(200).json({ msg: "اگهی شما باموفقیت ثبت شد" });
  } catch (err) {
    const fildName = [];
    err.errors.forEach((e) => {
      if (!fildName.includes(e.fild)) {
        fildName.push(e.fild);
        error[e.fild] = [e.msg, e.value];
      }
    });
    res.status(401).json(JSON.stringify({ error, fildName }));
  }
};

exports.rentVilla = async (req, res) => {
  const error = {};
  try {
    await RentVilla.validateA(req.body);
    await RentVilla.create({
      ...req.body,
      user: req.user.id,
      createAt: new Date(),
    });
    res.status(200).json({ msg: "اگهی شما باموفقیت ثبت شد" });
  } catch (err) {
    const fildName = [];
    err.errors.forEach((e) => {
      if (!fildName.includes(e.fild)) {
        fildName.push(e.fild);
        error[e.fild] = [e.msg, e.value];
      }
    });
    res.status(401).json(JSON.stringify({ error, fildName }));
  }
};

exports.sendAccEmailUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.time.getTime() + 20 * 60 * 1000 <= Date.now()) {
      sendMail(
        user.email,
        "تایید ایمیل",
        `<p>من با این ایمیل وارد سایت پنجره شده ام</p><br><a href='https://panjerh.ir/dashboard/accEmailUser/${jwt.sign(
          { userId: user.id },
          process.env.SECRET_JWT
        )}'>برای تایید متن بالا (تایید ایمیل) کلید کنید</a>`
      );

      await User.findByIdAndUpdate(user.id, { time: new Date() });
      res.status(201).json();
    } else {
      console.log(user.time.getTime() + 20 * 60 * 1000 - Date.now());
      res
        .status(200)
        .json({ timer: user.time.getTime() + 20 * 60 * 1000 - Date.now() });
    }
  } catch (err) {
    console.log(err)
    res.status(401).json({ err });
  }
};

exports.accEmailUser = async (req, res) => {
  try {
    const decode = jwt.verify(req.params.jwt, process.env.SECRET_JWT);

    await User.findByIdAndUpdate(decode.userId, { accEmail: true });
    res.redirect("/dashboard");
  } catch (error) {}
};

exports.counselingInAdmins = async (req, res) => {
  try {
    if (req.user.role == "boss" && req.user.role == "consultant") {
    } else {
      error404(req, res);
    }
  } catch (err) {
    error500(req, res);
  }
};

exports.counselingInAdminsDelete = async (req, res) => {
  try {
    if (req.user.role == "boss" && req.user.role == "consultant") {
    } else {
      error404(req, res);
    }
  } catch (err) {
    error500(req, res);
  }
};

exports.getNotification = async (req, res) => {
  try {
    const notifications = await Notifications.find({ user: req.user.id });
    if (notifications.length > 0) {
      return res.status(200).json(JSON.stringify(notifications));
    }
    res.status(404).send();
  } catch (err) {}
};

exports.viewNotification = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { notifications: true });
    res.status(202).send();
  } catch (err) {}
};

exports.getPageAccAdvertising = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role == "boss" || user.role == "admin") {
      const fun = function (date) {
        return moment(date).locale("fa").format("D MMM YYYY");
      };

      const sellApartments = await Apartment.find({ acc: false });
      const sellVillas = await Villa.find({ acc: false });
      const rentApartments = await RentApartman.find({ acc: false });
      const rentVillas = await RentVilla.find({ acc: false });

      const data = [
        ...sellApartments,
        ...sellVillas,
        ...rentApartments,
        ...rentVillas,
      ];

      res.render("admin/advertising", {
        pageTitle: "درخواست های ثبت اگهی",
        path: "/dashboard/advertising",
        isLogin: req.isAuthenticated(),
        data,
        fun,
        user: req.user,
        layout:
          user.role == "boss"
            ? "./layout/bossDashboardLayout.ejs"
            : "./layout/adminDashboardLayout.ejs",
      });
    } else {
      error404(req, res);
    }
  } catch (err) {
    error500(req, res);
  }
};

exports.handelDeleteAdvertising = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role == "boss" || user.role == "admin") {
      const sellApartments = await Apartment.find({ _id: req.body.id });
      const sellVillas = await Villa.find({ _id: req.body.id });
      const rentApartments = await RentApartman.find({ _id: req.body.id });
      const rentVillas = await RentVilla.find({ _id: req.body.id });

      if (sellApartments.length > 0) {
        sendNF("اگهی شما رد شد", sellApartments[0].user, "warning");
        await Apartment.findByIdAndDelete(req.body.id);
        res.status(200).json();
      } else if (sellVillas.length > 0) {
        sendNF("اگهی شما رد شد", sellVillas[0].user, "warning");
        await Villa.findByIdAndDelete(req.body.id);
        res.status(200).json();
      } else if (rentApartments.length > 0) {
        sendNF("اگهی شما رد شد", rentApartments[0].user, "warning");
        await RentApartman.findByIdAndDelete(req.body.id);
        res.status(200).json();
      } else if (rentVillas.length > 0) {
        sendNF("اگهی شما رد شد", rentVillas[0].user, "warning");
        await RentVilla.findByIdAndDelete(req.body.id);
        res.status(200).json();
      } else {
        res.status(404).json({ msg: "در خواست شما انجام نشد" });
      }
    } else {
      console.log("not admin")
      error404(req, res);
    }
  } catch (err) {
    console.log(err)
    error500(req, res);
  }
};

exports.handelAccAdvertising = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user.role == "boss" || user.role == "admin") {
    const sellApartments = await Apartment.find({ _id: req.body.id });
    const sellVillas = await Villa.find({ _id: req.body.id });
    const rentApartments = await RentApartman.find({ _id: req.body.id });
    const rentVillas = await RentVilla.find({ _id: req.body.id });

    if (sellApartments.length > 0) {
      sendNF("اگهی شما تایید شد", sellApartments[0].user, "success");
      await Apartment.findByIdAndUpdate(req.body.id, { acc: true });
      res.status(200).json();
    } else if (sellVillas.length > 0) {
      sendNF("اگهی شما تایید شد", sellVillas[0].user, "success");
      await Villa.findByIdAndUpdate(req.body.id, { acc: true });
      res.status(200).json();
    } else if (rentApartments.length > 0) {
      sendNF("اگهی شما تایید شد", rentApartments[0].user, "success");
      await RentApartman.findByIdAndUpdate(req.body.id, { acc: true });
      res.status(200).json();
    } else if (rentVillas.length > 0) {
      sendNF("اگهی شما تایید شد", rentVillas[0].user, "success");
      await RentVilla.findByIdAndUpdate(req.body.id, { acc: true });
      res.status(200).json();
    } else {
      res.status(404).json({ msg: "در خواست شما انجام نشد" });
    }
  }
};

exports.admins = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role == "boss") {
      const admins = await User.find({ role: ["admin", "consultant"] });
      res.render("admin/admins", {
        pageTitle: "برسی ادمین ها",
        isLogin: req.isAuthenticated(),
        path: "/dashboard/admins",
        user,
        admins,
        layout: "./layout/bossDashboardLayout.ejs",
      });
    } else {
      error404(req, res);
    }
  } catch (err) {
    error500(req, res);
  }
};

exports.handelAddAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role == "boss") {
      await User.findOneAndUpdate(
        { email: req.body.email },
        { role: req.body.role }
      );
      res.redirect("back");
    } else {
      error404(req, res);
    }
  } catch (err) {
    error500(req, res);
  }
};

exports.handelRemoveAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role == "boss") {
      const userSelected = await User.find({ _id: req.params.id });

      if (!userSelected.length > 0) {
        return error404(req, res);
      }

      await User.findByIdAndUpdate(userSelected[0].id, { role: "user" });
      res.redirect("back");
    } else {
      error500(req, res);
    }
  } catch (err) {
    error500(req, res);
  }
};

exports.getPageDataUsers = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user.role == "boss" || user.role == "admin") {
    const users = await User.find();
    res.render("admin/users", {
      pageTitle: "پنل مدیریت",
      path: "/dashboard/users",
      user: req.user,
      users,
      isLogin: req.isAuthenticated(),
      layout:
        user.role == "boss"
          ? "./layout/bossDashboardLayout.ejs"
          : "./layout/adminDashboardLayout.ejs",
    });
  }
};

exports.removeUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role === "boss" || user.role == "admin") {
      await User.findByIdAndDelete(req.body.id);
      res.status(201).json({ msg: "  " });
    }
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

exports.accEmailUserAuto = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role == "boss" || user.role == "admin") {
      await User.findByIdAndUpdate(req.params.id, { accEmail: true });
      res.redirect("back");
    } else {
      error404(req, res);
    }
  } catch (err) {
    error500(req, res);
  }
};

exports.getPageSaveMa = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const ad = [];
    for (item of user.saveAd) {
      try{
        let itemAd =
          (await Apartment.findOne({ _id: item })) ||
          (await RentApartman.findOne({ _id: item })) ||
          (await Villa.findOne({ _id: item })) ||
          (await RentVilla.findOne({ _id: item }));
        itemAd && ad.push(itemAd);
      }catch(err) {
        err = err
      }
    }

    function separate(Number) {
      Number += "";
      Number = Number.replace(",", "");
      x = Number.split(".");
      y = x[0];
      z = x.length > 1 ? "." + x[1] : "";
      var rgx = /(\d+)(\d{3})/;
      while (rgx.test(y)) y = y.replace(rgx, "$1" + "," + "$2");
      return y + z;
    }
    res.render("user/saveMe", {
      pageTitle: "پنل مدیریت",
      path: "/dashboard/saveMe",
      user: req.user,
      ad,
      separate,
      layout: "./layout/userDashboardLayout.ejs",
      isLogin: req.isAuthenticated(),
    });
  } catch (err) {
    error500(req, res);
  }
};

exports.getPageMyMelk = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const ad = [
      ...(await Apartment.find({ user: user.id })),
      ...(await RentApartman.find({ user: user.id })),
      ...(await Villa.find({ user: user.id })),
      ...(await RentVilla.find({ user: user.id })),
    ];

    let viewObj = {};
    let ip = [];
    for (item of ad) {
      ip = []

      let sell = await UserController.find({
        pageView: `https://panjerh.ir/sell/${item.id}`,
      });

      sell = sell.filter((i) => {
        if (!ip.includes(i.ip)) {
          ip.push(i.ip);
          return i;
        }
      });


      let rent = await UserController.find({
        pageView: `https://panjerh.ir/rent/${item.id}`,
      });

      rent = rent.filter((i2) => {
        if (!ip.includes(i2.ip)) {
          ip.push(i2.ip);
          return i2;
        }
      });
      viewObj[item.id] = sell.length + rent.length;
    }
    console.log(viewObj);

    const fun = function (date) {
      return moment(date).locale("fa").format("D MMM YYYY");
    };
    function separate(Number) {
      Number += "";
      Number = Number.replace(",", "");
      x = Number.split(".");
      y = x[0];
      z = x.length > 1 ? "." + x[1] : "";
      var rgx = /(\d+)(\d{3})/;
      while (rgx.test(y)) y = y.replace(rgx, "$1" + "," + "$2");
      return y + z;
    }

    res.render("user/myMelk", {
      pageTitle: "پنل مدیریت",
      path: "/dashboard/myMelk",
      user: req.user,
      ad,
      fun,
      viewObj,
      separate,
      layout: "./layout/userDashboardLayout.ejs",
      isLogin: req.isAuthenticated(),
    });
  } catch (err) {
    console.log(err);
    error500(req, res);
  }
};

exports.handelDeleteAd = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const ad =
      (await Apartment.findOne({ _id: req.body.id })) ||
      (await RentApartman.findOne({ _id: req.body.id })) ||
      (await Villa.findOne({ _id: req.body.id })) ||
      (await RentVilla.findOne({ _id: req.body.id }));

    if (ad.user == user.id) {
      if (ad.type == "apartment") {
        await Apartment.findByIdAndDelete(ad._id);
        res.status(201).json({ msg: "عملیات موفقیت امیز بود" });
      } else if (ad.type == "rentApartment") {
        await RentApartman.findByIdAndDelete(ad._id);
        res.status(201).json({ msg: "عملیات موفقیت امیز بود" });
      } else if (ad.type == "villa") {
        await Villa.findByIdAndDelete(ad._id);
        res.status(201).json({ msg: "عملیات موفقیت امیز بود" });
      } else if (ad.type == "rentVilla") {
        await RentVilla.findByIdAndDelete(ad._id);
        res.status(201).json({ msg: "عملیات موفقیت امیز بود" });
      }
    } else {
      res.status(404).json({ msg: "همچین ادرسی وجود ندارد" });
    }
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

exports.getPageNews = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role == "boss") {
      const emails = await News.find();

      const fun = function (date) {
        return moment(date).locale("fa").format("D MMM YYYY");
      };

      res.render("admin/news", {
        pageTitle: "پنل مدیریت",
        fun,
        emails,
        path: "/dashboard/news",
        user: req.user,
        layout: "./layout/bossDashboardLayout.ejs",
        isLogin: req.isAuthenticated(),
      });
    } else {
      error404(req, res);
    }
  } catch (err) {
    error404(req, res);
  }
};

exports.sendEmailNews = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role == "boss") {
      const email = await News.find();
      email.forEach((item) => {
        sendMail(item.email, req.body.title, req.body.html);
      });
      res.status(200).send();
    } else {
      res.status(404).send();
    }
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};

exports.getPageRequests = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role == "boss" || user.role == "admin") {
      const data = await UserController.find()
        .sort({
          createAt: "desc",
        })
        .limit(10);

      res.render("admin/requests", {
        pageTitle: "پنل مدیریت",
        path: "/dashboard/requests",
        user: req.user,
        data,
        layout:
          user.role == "boss"
            ? "./layout/bossDashboardLayout.ejs"
            : "./layout/adminDashboardLayout.ejs",
        isLogin: req.isAuthenticated(),
      });
    } else {
      error404(req, res);
    }
  } catch (err) {
    error500(req, res);
  }
};

exports.getRequests = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user.role == "boss" || user.role == "admin") {
      const data = await UserController.find()
        .skip(req.body.page * 10)
        .sort({
          createAt: "desc",
        })
        .limit(10);

      // console.log(data)
      res.status(200).json({ msg: ":)", data });
    } else {
      // console.log(404)
      res.status(404).json({ msg: "همچین صفحه ای وجود ندارد" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
  }
};

exports.payams = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role == "boss") {
      const data = await TamasBaMa.find();
      const funcDate = function (date) {
        return moment(date).locale("fa").format("D MMM YYYY");
      };

      res.render("admin/payam", {
        pageTitle: "پنل ",
        path: "/dashboard/payam",
        user: req.user,
        data,
        funcDate,
        layout: "./layout/bossDashboardLayout.ejs",
        isLogin: req.isAuthenticated(),
      });
    } else {
      error404(req, res);
    }
  } catch (err) {
    error500(req, res);
  }
};

exports.handelDaletePayam = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role == "boss") {
      await TamasBaMa.findByIdAndDelete(req.params.id);
      res.redirect("back");
    } else {
      error404(req, res);
    }
  } catch (err) {
    res.redirect("back");
  }
};

exports.getPageKarshnas = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role == "boss" || user.role == "consultant") {
      const data = await Karshnas.find();

      const funcDate = function (date) {
        return moment(date).locale("fa").format("D MMM YYYY");
      };

      res.render("admin/karshnas", {
        pageTitle: "پنل",
        path: "/dashboard/karshnas",
        user: req.user,
        layout:
          user.role == "boss"
            ? "./layout/bossDashboardLayout.ejs"
            : "./layout/consultantDashboardLayout.ejs",
        data,
        funcDate,
        isLogin: req.isAuthenticated(),
      });
    } else {
      res.render("user/karshnas", {
        pageTitle: "درخواست کارشناس | پنجره",
        path: "/dashboard/karshnas",
        user: req.user,
        layout: "./layout/userDashboardLayout.ejs",
        errorFilde: [],
        error: {},
        value: {},
        isLogin: req.isAuthenticated(),
      });
    }
  } catch (err) {
    error500(req, res);
  }
};

exports.handelKarshnas = async (req, res) => {
  try {
    await Karshnas.validateKarshnas(req.body);
    await Karshnas.create({
      name: req.body.name,
      phone: req.body.phone,
      map: req.body.map,
      text: req.body.text,
      user: req.user.id,
      createAt: new Date(),
    });
    res.status(201).json({ msg: "عملیات موفقیت امیز بود" });
  } catch (err) {
    console.log(err);
    res.status(401).json(err.errors);
  }
};

exports.handelDeleteKarshnas = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user.role == "boss" || user.role == "consultant") {
      const request = await Karshnas.findById(req.params.id);
      sendNF("درخواست کارشناس شما رد شد", request.user, "warning");
      await Karshnas.findByIdAndDelete(req.params.id);
      res.redirect("back");
    } else {
      error404(req, res);
    }
  } catch (err) {
    error500(req, res);
  }
};

exports.handelAccKarshnas = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user.role == "boss" || user.role == "consultant") {
      const request = await Karshnas.findById(req.params.id);
      sendNF("درخواست کارشناس شما تایید شد", request.user, "success");
      await Karshnas.findByIdAndDelete(req.params.id);
      res.redirect("back");
    } else {
      error404(req, res);
    }
  } catch (err) {
    error500(req, res);
  }
};

exports.mapHandler = (req, res) => {
  //code
};
