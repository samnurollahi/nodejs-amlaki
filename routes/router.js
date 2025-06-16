const { Router } = require("express");

const indexController = require("../controllers/indexController");

const router = new Router();

//page index
router.get("/", indexController.index);

//page register
router.get("/auth", indexController.auth);

//handel register
router.post("/auth/register", indexController.handelRgister);

//login register
router.post(
  "/auth/login",
  indexController.handelLogin,
  indexController.handelRememberme
);

// page sell
router.get("/sell", indexController.getPageSell);

// page rent
router.get("/rent", indexController.getPageRent);

//page sell
router.get("/sell/:id", indexController.pageSellItem);

//page rent
router.get("/rent/:id", indexController.pageRentlItem);

//get Phone user
router.post("/getPhoneUser", indexController.getPhoneUser);

//user controller
router.post("/userController", indexController.userController);

//handel save Ad
router.post("/saveAd", indexController.saveAd);

//hande length user and ad
router.post("/getAllLengthUserAndAd", indexController.getAllLengthUserAndAd);

//for Get Password Get Email
router.get("/forGetPassword", indexController.getPageGetEmailForGetPassword);

//send email for get password
router.post("/forGetPassword", indexController.sendEmailForGetPassword);

//get page reset password
router.get("/resetPassword/:token", indexController.getPageResetPassword)

//handel reset password
router.post("/resetPassword/:token", indexController.handelResetPassword)

//handel add email for news
router.post("/addEmailNews", indexController.addEmailForNews)

//get page about
router.get("/tamasBaMa", indexController.getAbout)

//send data tamas ba ma
router.post("/tamasbama", indexController.handelTamasBaMa)

module.exports = router;
