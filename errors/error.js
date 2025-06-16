exports.error404 = (req, res) => {
  res.render("error", {
    pageTitle: "صفحه مورد نظر یافت نشد",
    bio: "صفحه مورد نظر یافت نشد",
    layout: "./layout/errorLayout.ejs",
    number1: 4,
    number2: 0,
    number3: 4,
  });
};

exports.error500 = (req, res) => {
  res.render("error", {
    pageTitle: "خطای از سمت سرور",
    bio: "خطای از سمت سرور",
    layout: "./layout/errorLayout.ejs",
    number1: 0,
    number2: 0,
    number3: 5,
  });
};
