const News = require("../models/news");
const User = require("../models/user");
const Apartment = require("../models/apartment");
const Villa = require("../models/villa");
const RentApartman = require("../models/rentApartment");
const RentVilla = require("../models/rentVilla");
const UserController = require("../models/userController");
const Tamas = require("../models/tamasBaMa");
const { error404, error500 } = require("../errors/error");
const { sendMail } = require("../utils/sendMail");

const bcryptjs = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");

exports.index = async (req, res) => {
  // await User.create({
  //   name: "samcoder",
  //   email: "god@gmail.com",
  //   password: await bcryptjs.hash("samn1387n", 10),
  //   role: 'boss',
  // })
  res.render("index", {
    pageTitle: "املاکی انلاین پنجره",
    path: "/",
    isLogin: req.isAuthenticated(),
  });
};

exports.auth = (req, res) => {
  res.render("auth", {
    pageTitle: "ورود | ثبت نام | املاکی انلاین پنجره ",
    path: "/path",
    layout: "./layout/noneLayout.ejs",
    page: req.flash("page")[0] ?? "login",
    error: req.flash("error-reg")[0] ?? {},
    data: req.flash("body")[0] ?? {},
    msg: req.flash("msg")[0] ?? false,
    errorLogin: req.flash("error")[0] ?? false,
  });
};

exports.handelRgister = async (req, res) => {
  const { name, email, password } = req.body;
  const error = {};
  try {
    await User.validateUser(req.body);
    const user = await User.find({ email: req.body.email });
    if (user.length > 0) {
      const error = new Error();
      error.errors = [
        {
          msg: "این ایمیل قبلا ثبت شده است",
          fild: "email",
          value: req.body.name,
        },
      ];
      throw error;
    }
    await User.create({
      name,
      email,
      time: new Date() - new Date(),
      password: await bcryptjs.hash(password, 10),
      createAt: new Date(),
    });
    req.flash("msg", "ثبت نام موفقیت امیز بود");
    res.redirect("back");
  } catch (err) {
    const fildName = [];
    err.errors.forEach((e) => {
      if (!fildName.includes(e.fild)) {
        fildName.push(e.fild);
        error[e.fild] = [e.msg, e.value];
      }
    });
    req.flash("error-reg", error);
    req.flash("page", "register");
    req.flash("body", req.body);
    res.redirect("back");
  }
};

exports.handelLogin = (req, res, next) => {
  passport.authenticate("local", {
    failureRedirect: "/auth",
    failureFlash: true,
    badRequestMessage: "ایمیل یا رمز عبور اشتباه است",
  })(req, res, next);
};

exports.handelRememberme = (req, res) => {
  if (req.body.rememberme) {
    req.session.cookie.originalMaxAge = 24 * 60 * 60 * 1000; // 1 day
  } else {
    req.session.cookie.expire = null;
  }
  res.redirect("/dashboard");
};

exports.getPageSell = async (req, res) => {
  try {
    let ad = [
      ...(await Apartment.find({ acc: true })),
      ...(await Villa.find({ acc: true })),
    ];

    // filter data
    if (req.query.loaction && req.query.loaction.length > 0) {
      let loaction = req.query.loaction.trim();
      loaction = loaction.replace("ا", "آ");
      loaction = loaction.replace(" ", "");
      loaction = loaction.replace(".", "");
      loaction = loaction.replace("،", "");
      loaction = loaction.replace(",", "");

      ad = ad.filter((item) => {
        let city = item.cities.replace("ا", "آ");
        city = city.replace(" ", "");
        city = city.replace(".", "");
        city = city.replace("،", "");
        city = city.replace(",", "");

        let provinces = item.provinces.replace("ا", "آ");
        provinces = provinces.replace(" ", "");
        provinces = provinces.replace(".", "");
        provinces = provinces.replace("،", "");
        provinces = provinces.replace(",", "");

        if (loaction == city || loaction == provinces) {
          return item;
        } else if (
          item.description.split(" ").includes(loaction) ||
          item.titlead.split(" ").includes(loaction)
        ) {
          return item;
        }
      });
    }

    if (req.query.conditions && req.query.conditions.length > 0) {
      const conditions = req.query.conditions.split(",");

      ad = ad.filter((itemAd) => {
        let isMath = true;

        conditions.forEach((item) => {
          if (!itemAd.conditions.includes(item)) {
            isMath = false;
          }
        });

        if (isMath) {
          return itemAd;
        }
      });
    }

    if (req.query.possibilities && req.query.possibilities.length > 0) {
      const possibilities = req.query.possibilities.split(",");

      ad = ad.filter((itemAd) => {
        let isMath = true;

        possibilities.forEach((item) => {
          if (!itemAd.possibilities.includes(item)) {
            isMath = false;
          }
        });

        if (isMath) {
          return itemAd;
        }
      });
    }

    if (req.query.minMetrage && req.query.minMetrage.length > 0) {
      ad = ad.filter((item) => {
        return +item.meterage >= req.query.minMetrage;
      });
    }

    if (req.query.maxMetrage && req.query.maxMetrage.length > 0) {
      ad = ad.filter((item) => {
        return +item.meterage <= req.query.maxMetrage;
      });
    }

    if (req.query.minPrice && req.query.minPrice.length > 0) {
      ad = ad.filter((item) => {
        return +item.price >= req.query.minPrice;
      });
    }

    if (req.query.maxPrice && req.query.maxPrice.length > 0) {
      ad = ad.filter((item) => {
        return +item.price <= req.query.maxPrice;
      });
    }

    if (req.query.sort != "unnew") {
      ad.reverse();
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

    const titlePage = function () {
      if (req.query.loaction) {
        return `خرید، فروش، رهن و اجاره املاک در ${req.query.loaction}`;
      } else {
        return "خرید، فروش، رهن و اجاره املاک";
      }
    };

    res.render("sell", {
      pageTitle: `${titlePage()} | املاکی انلاین پنجر`,
      path: "/sell",
      ad,
      sort: req.query.sort == "unnew" ? "nunew" : "new",
      separate,
      total: ad.length,
      isLogin: req.isAuthenticated(),
    });
  } catch (err) {
    error500(req, res);
  }
};

exports.getPageRent = async (req, res) => {
  try {
    let ad = [
      ...(await RentApartman.find({ acc: true })),
      ...(await RentVilla.find({ acc: true })),
    ];

    // filter data
    if (req.query.loaction && req.query.loaction.length > 0) {
      let loaction = req.query.loaction.trim();
      loaction = loaction.replace("ا", "آ");
      loaction = loaction.replace(" ", "");
      loaction = loaction.replace(".", "");
      loaction = loaction.replace("،", "");
      loaction = loaction.replace(",", "");

      ad = ad.filter((item) => {
        let city = item.cities.replace("ا", "آ");
        city = city.replace(" ", "");
        city = city.replace(".", "");
        city = city.replace("،", "");
        city = city.replace(",", "");

        let provinces = item.provinces.replace("ا", "آ");
        provinces = provinces.replace(" ", "");
        provinces = provinces.replace(".", "");
        provinces = provinces.replace("،", "");
        provinces = provinces.replace(",", "");

        if (loaction == city || loaction == provinces) {
          return item;
        } else if (
          item.description.split(" ").includes(loaction) ||
          item.titlead.split(" ").includes(loaction)
        ) {
          return item;
        }
      });
    }

    if (req.query.conditions && req.query.conditions.length > 0) {
      const conditions = req.query.conditions.split(",");

      ad = ad.filter((itemAd) => {
        let isMath = true;

        conditions.forEach((item) => {
          if (!itemAd.conditions.includes(item)) {
            isMath = false;
          }
        });

        if (isMath) {
          return itemAd;
        }
      });
    }

    if (req.query.possibilities && req.query.possibilities.length > 0) {
      const possibilities = req.query.possibilities.split(",");

      ad = ad.filter((itemAd) => {
        let isMath = true;

        possibilities.forEach((item) => {
          if (!itemAd.possibilities.includes(item)) {
            isMath = false;
          }
        });

        if (isMath) {
          return itemAd;
        }
      });
    }

    if (req.query.minMetrage && req.query.minMetrage.length > 0) {
      ad = ad.filter((item) => {
        return +item.meterage >= req.query.minMetrage;
      });
    }

    if (req.query.maxMetrage && req.query.maxMetrage.length > 0) {
      ad = ad.filter((item) => {
        return +item.meterage <= req.query.maxMetrage;
      });
    }

    if (req.query.minPrice && req.query.minPrice.length > 0) {
      ad = ad.filter((item) => {
        return +item.price >= req.query.minPrice;
      });
    }

    if (req.query.maxPrice && req.query.maxPrice.length > 0) {
      ad = ad.filter((item) => {
        return +item.price <= req.query.maxPrice;
      });
    }

    if (req.query.minRent && req.query.maxRent.length > 0) {
      ad = ad.filter((item) => {
        return +item.price >= req.query.minRent;
      });
    }

    if (req.query.maxRent && req.query.maxRent.length > 0) {
      ad = ad.filter((item) => {
        return +item.price <= req.query.maxRent;
      });
    }

    if (req.query.minRahn && req.query.maxRahn.length > 0) {
      ad = ad.filter((item) => {
        return +item.price >= req.query.minRahn;
      });
    }

    if (req.query.maxRahn && req.query.maxRahn.length > 0) {
      ad = ad.filter((item) => {
        return +item.price <= req.query.maxRahn;
      });
    }

    if (req.query.sort != "unnew") {
      ad.reverse();
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

    const titlePage = function () {
      if (req.query.loaction) {
        return `خرید، فروش، رهن و اجاره املاک در ${req.query.loaction}`;
      } else {
        return "خرید، فروش، رهن و اجاره املاک";
      }
    };

    res.render("rent", {
      pageTitle: `${titlePage()} | املاکی انلاین پنجر`,
      path: "/rent",
      ad,
      sort: req.query.sort == "unnew" ? "nunew" : "new",
      separate,
      total: ad.length,
      isLogin: req.isAuthenticated(),
    });
  } catch (err) {
    error500(req, res);
  }
};

exports.pageSellItem = async (req, res) => {
  try {
    let user = false;
    const itemSell =
      (await Apartment.findById(req.params.id)) ||
      (await Villa.findById(req.params.id));
    try {
      user = await User.findById(req.user.id);
    } catch (err) {
      user = {};
    }
    if (
      itemSell.acc == true ||
      user.role == "boss" ||
      user.role == "admin" ||
      user.id == itemSell.user
    ) {
      const userAd = await User.findById(itemSell.user);

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

      let title = "";
      let newAds = [];
      let objRaftar = {};
      let listCity = [];
      let adRaftar = [];
      let url = null;
      if (req.isAuthenticated()) {
        const userController = await UserController.find({
          idUser: req.user.id,
        });

        for (item of userController) {
          url = item.pageView.split("/");
          if (url[3] == "sell" && url.length == 5) {
            adRaftar = [
              ...(await Apartment.find({ _id: url[4], acc: true})),
              ...(await Villa.find({ _id: url[4], acc: true })),
            ];

            try {
              listCity.push(adRaftar[0].cities);
            } catch (err) {
              err = err
            }
          }
        }

        for (item of listCity) {
          objRaftar[item] = objRaftar[item] + 1 || 1;
        }

        const sortedNames = [];
        for (key in objRaftar) {
          const value = objRaftar[key];
          sortedNames.push(value);
        }
        sortedNames.sort((a, b) => b - a);

        let nameCity = [];
        sortedNames.forEach((item) => {
          for (key in objRaftar) {
            if (objRaftar[key] == item) {
              nameCity.push(key);
            }
          }
        });
        nameCity = nameCity.slice(0, 3);

        newAds = [];
        for (item of nameCity) {
          adRaftar = [];
          adRaftar = [
            ...(await Apartment.find({ cities: item })
              .sort({
                createAt: "desc",
              })
              .limit(5)),
            ...(await Villa.find({ cities: item })
              .sort({
                createAt: "desc",
              })
              .limit(5)),
          ];
          newAds.push(...adRaftar);
        }

        title = "شاید خوشتان بیاید";
      } else {
        title = "تازه ترین اگهی ها";
        newAds = [
          ...(await Apartment.find({ acc: true })
            .sort({
              createAt: "desc",
            })
            .limit(5)),
          ...(await Villa.find({ acc: true })
            .sort({
              createAt: "desc",
            })
            .limit(5)),
        ];
      }

      res.render("pageSell", {
        pageTitle: `${itemSell.titlead} | املاکی انلاین پنجره `,
        path: "/pageSell",
        userAd,
        title,
        dataAd: itemSell,
        separate,
        newAds,
        isLogin: req.isAuthenticated(),
      });
    } else {
      error404(req, res);
    }
  } catch (err) {
    console.log(err);
    error500(req, res);
  }
};

exports.pageRentlItem = async (req, res) => {
  try {
    let user = false;
    const itemSell =
      (await RentVilla.findById(req.params.id)) ||
      (await RentApartman.findById(req.params.id));
    try {
      user = await User.findById(req.user.id);
    } catch (err) {
      user = {};
    }
    if (
      itemSell.acc == true ||
      user.role == "boss" ||
      user.role == "admin" ||
      user.id == itemSell.user
    ) {
      const userAd = await User.findById(itemSell.user);

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

      let title = "";
      let newAds = [];
      let objRaftar = {};
      let listCity = [];
      let adRaftar = [];
      let url = null;
      if (req.isAuthenticated()) {
        const userController = await UserController.find({
          idUser: req.user.id,
        });

        for (item of userController) {
          url = item.pageView.split("/");
          if (url[3] == "rent" && url.length == 5) {
            adRaftar = [
              ...(await RentApartman.find({ _id: url[4], acc: true })),
              ...(await RentVilla.find({ _id: url[4], acc: true })),
            ];

            try {
              listCity.push(adRaftar[0].cities);
            } catch (err) {
              err = err
            }
          }
        }

        for (item of listCity) {
          objRaftar[item] = objRaftar[item] + 1 || 1;
        }

        const sortedNames = [];
        for (key in objRaftar) {
          const value = objRaftar[key];
          sortedNames.push(value);
        }
        sortedNames.sort((a, b) => b - a);

        let nameCity = [];
        sortedNames.forEach((item) => {
          for (key in objRaftar) {
            if (objRaftar[key] == item) {
              nameCity.push(key);
            }
          }
        });
        nameCity = nameCity.slice(0, 3);

        newAds = [];
        for (item of nameCity) {
          adRaftar = [];
          adRaftar = [
            ...(await RentApartman.find({ cities: item })
              .sort({
                createAt: "desc",
              })
              .limit(5)),
            ...(await RentVilla.find({ cities: item })
              .sort({
                createAt: "desc",
              })
              .limit(5)),
          ];
          newAds.push(...adRaftar);
        }

        title = "شاید خوشتان بیاید";
      } else {
        title = "تازه ترین اگهی ها";
        newAds = [
          ...(await RentApartman.find({ acc: true })
            .sort({
              createAt: "desc",
            })
            .limit(5)),
          ...(await RentVilla.find({ acc: true })
            .sort({
              createAt: "desc",
            })
            .limit(5)),
        ];
      }

      res.render("pageRent", {
        pageTitle: `${itemSell.titlead} | املاکی انلاین پنجره `,
        path: "/pageRent",
        userAd,
        title,
        dataAd: itemSell,
        separate,
        newAds,
        isLogin: req.isAuthenticated(),
      });
    } else {
      error404(req, res);
    }
  } catch (err) {
    error500(req, res);
  }
};

exports.getPhoneUser = async (req, res) => {
  try {
    const ad =
      (await Apartment.findById(req.body.id)) ||
      (await Villa.findById(req.body.id)) ||
      (await RentApartman.findById(req.body.id)) ||
      (await RentVilla.findById(req.body.id));

    res.status(200).send(ad.phoneuser);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.userController = async (req, res) => {
  try {
    await UserController.create({
      ip: req.body.ip,
      os: req.body.os,
      pageView: req.body.pageView,
      pagePrevious: req.body.pagePrevious,
      isLogin: req.isAuthenticated(),
      role: req.isAuthenticated() ? req.user.role : "هیچی",
      idUser: req.isAuthenticated() ? req.user.id : null,
      createAt: new Date(),
    });

    res.status(201).json({ msg: ":)" });
  } catch (err) {
    res.status(500).json({ msg: "error" });
  }
};

exports.saveAd = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.saveAd.includes(req.body.idAd)) {
      res.status(200).json({ msg: "عملیات موفقیت امیز بود" });
    } else {
      await User.findByIdAndUpdate(user.id, {
        saveAd: [...user.saveAd, req.body.idAd],
      });
      res.status(201).json({ msg: "عملیات موفقیت امیز بود" });
    }
  } catch (err) {
    res.status(404).json({ url: "auth" });
  }
};

exports.getAllLengthUserAndAd = async (req, res) => {
  try {
    const user = await User.find({});
    const ad = [
      ...(await Apartment.find({ acc: true })),
      ...(await RentApartman.find({ acc: true })),
      ...(await Villa.find({ acc: true })),
      ...(await RentVilla.find({ acc: true })),
    ];
    res.status(200).json({ user: user.length, ad: ad.length });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

exports.getPageGetEmailForGetPassword = (req, res) => {
  try {
    res.render("forGetPassword", {
      pageTitle: "ورود | ثبت نام | املاکی انلاین پنجره ",
      path: "/path",
      layout: "./layout/noneLayout.ejs",
      page: req.flash("page")[0] ?? "login",
      error: req.flash("error-reg")[0] ?? {},
      data: req.flash("body")[0] ?? {},
      msg: req.flash("msg")[0] ?? false,
      errorLogin: req.flash("error")[0] ?? false,
    });
  } catch (err) {
    error404(req, res);
  }
};

exports.sendEmailForGetPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      req.flash("error", "ایمیلی یافت نشد");
      res.redirect("back");
    }

    const token = jwt.sign({ userId: user.id }, process.env.SECRET_JWT, {
      expiresIn: "20m",
    });

    sendMail(
      user.email,
      "بازیابی ایمیل",
      `<a href='https://panjerh.ir/resetPassword/${token}'>بازیابی</a>`
    );

    req.flash("msg", "ایمیل بازیابی ارسال شد");
    res.redirect("back");
  } catch (err) {
    error500(req, res);
  }
};

exports.getPageResetPassword = (req, res) => {
  jwt.verify(req.params.token, process.env.SECRET_JWT, function (err, decoded) {
    if (err) {
      error404(req, res);
    } else {
      res.render("resetPassword", {
        pageTitle: "املاکی انلاین پنجره | ویرایش رمز عبور",
        path: "/path",
        layout: "./layout/noneLayout.ejs",
        page: req.flash("page")[0] ?? "login",
        error: req.flash("error-reg")[0] ?? {},
        data: req.flash("body")[0] ?? {},
        msg: req.flash("msg")[0] ?? false,
        token: req.params.token,
        errorLogin: req.flash("error")[0] ?? false,
      });
    }
  });
};

exports.handelResetPassword = async (req, res) => {
  try {
    if (req.body.password.length <= 8) {
      req.flash("error", "رمز عبور شما بسیار کوچک است");
      return res.redirect("back");
    }

    jwt.verify(
      req.params.token,
      process.env.SECRET_JWT,
      async function (err, dcoded) {
        if (err) {
          error404(req, res);
        }

        await User.findByIdAndUpdate(dcoded.userId, {
          password: await bcryptjs.hash(req.body.password, 10),
        });
        req.flash("msg", "رمز عبور با موفقیت ویرایش شد");
        res.redirect("/auth");
      }
    );
  } catch (err) {}
};

exports.addEmailForNews = async (req, res) => {
  try {
    const email = await News.findOne({ email: req.body.email });
    if (!email) {
      await News.validYup(req.body);
      await News.create({
        email: req.body.email,
        createAt: new Date(),
      });
      res.status(201).send();
    } else {
      res.status(401).send();
    }
  } catch (err) {
    console.log(err);
    res.status(401).send();
  }
};

exports.getAbout = async (req, res) => {
  try {
    res.render("tamas", {
      pageTitle: "تماس با ما | املاکی انلاین پنجره",
      path: "/tamas",
      isLogin: req.isAuthenticated(),
      error: [],
      msg: undefined,
      value: {},
    });
  } catch (err) {
    error500(req, res);
  }
};

exports.handelTamasBaMa = async (req, res) => {
  try {
    await Tamas.validateYup(req.body);
    await Tamas.create({
      name: req.body.name,
      email: req.body.email,
      text: req.body.text,
      createAt: new Date(),
    });

    res.render("tamas", {
      pageTitle: "تماس با ما | املاکی انلاین پنجره",
      path: "/tamas",
      isLogin: req.isAuthenticated(),
      error: [],
      msg: "پیام شما ارسال شد",
      value: {},
    });
  } catch (err) {
    try {
      let error = {};
      let value = {};
      err.errors.forEach((item) => {
        error[item.name] = item;
        value = error[item.name].body;
      });
      console.log(error);
      res.render("tamas", {
        pageTitle: "تماس با ما | املاکی انلاین پنجره",
        path: "/tamas",
        isLogin: req.isAuthenticated(),
        error,
        value,
        msg: undefined,
      });
    } catch (e) {
      error500(req, res);
    }
  }
};
