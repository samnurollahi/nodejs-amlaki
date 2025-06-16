const { Router } = require("express");

const { auth } = require("../middleware/auth");
const controllerdashboard = require("../controllers/dashboardController");

const router = new Router();

//page dashboard
router.get("/", auth, controllerdashboard.dashboard);

//page ad
router.get("/ad", auth, controllerdashboard.uAd);

//page counseling
router.get("/counseling", auth, controllerdashboard.getPageCounseling);

//get notification api
router.post("/getnotification", auth, controllerdashboard.getNotification);

//view notification api
router.post("/isViewNotification", auth, controllerdashboard.viewNotification);

//acc counseling
router.post("/accCounseling", auth, controllerdashboard.accCounseling);

//delete counseling
router.post("/deleteCounseling", auth, controllerdashboard.deleteCounseling);

//get counseling for admon
router.post("/getCounseling", auth, controllerdashboard.getCounseling);

//handel edit profile
router.post("/edit", auth, controllerdashboard.editProfile);

//handel logout
router.get("/logout", auth, controllerdashboard.logout);

// handel counseling
router.post("/counseling", auth, controllerdashboard.counselingHandel);

//handel upload image ad
router.post("/upload", auth, controllerdashboard.uploadImg);

//handel add sll apartman
router.post("/sell-apartman", auth, controllerdashboard.apartman);

//handel add sell house vila
router.post("/sell-villa", auth, controllerdashboard.villa);

//handel add rent apartman
router.post("/rent-apartman", auth, controllerdashboard.rentApartman);

//handel add rent house vila
router.post("/rent-villa", auth, controllerdashboard.rentVilla);

//acc email
router.post("/accEmailUser", auth, controllerdashboard.sendAccEmailUser);

//acc email
router.get("/accEmailUser/:jwt", controllerdashboard.accEmailUser);

//handel moshaver in boss and consultant
router.get("/counseling", auth, controllerdashboard.counselingInAdmins);

//handel delete moshaver in boss and consultant
router.get(
  "/deleteCounseling/:id",
  auth,
  controllerdashboard.counselingInAdminsDelete
);

//page acc advertising
router.get("/advertising", auth, controllerdashboard.getPageAccAdvertising);

//hande acc advertising
router.post("/");

//hande delete advertising
router.post(
  "/deleteAdvertising",
  auth,
  controllerdashboard.handelDeleteAdvertising
);

//handel acc advertising
router.post("/accAdvertising", auth, controllerdashboard.handelAccAdvertising);

//page admin controller
router.get("/admins", auth, controllerdashboard.admins);

//handel add admin or consultant
router.post("/addAdmin", auth, controllerdashboard.handelAddAdmin);

//handel remove admin or consultant
router.get("/removeAdmin/:id", auth, controllerdashboard.handelRemoveAdmin);

//page data users
router.get("/users", auth, controllerdashboard.getPageDataUsers)

//handel remove user
router.post("/removeUser", auth, controllerdashboard.removeUser)

//handel acc email auto
router.get("/addEmailUserAuto/:id", auth, controllerdashboard.accEmailUserAuto)

//get page save me
router.get('/saveMe', auth, controllerdashboard.getPageSaveMa)

//get page my melk
router.get("/myMelk", auth, controllerdashboard.getPageMyMelk)

//handel delete ad 
router.post("/deleteAd", auth, controllerdashboard.handelDeleteAd)

//get page news
router.get("/news", auth, controllerdashboard.getPageNews)

//handel send email for news
router.post("/sendEmailNews", auth, controllerdashboard.sendEmailNews)

//get page requests
router.get("/requests", auth, controllerdashboard.getPageRequests)

//get request
router.post("/getRequets", auth, controllerdashboard.getRequests)

//get page payam ha
router.get("/payams", auth, controllerdashboard.payams)

//handel delete payam
router.get("/deletePayam/:id", auth, controllerdashboard.handelDaletePayam)

//get page karshnas for user
router.get("/karshnas", auth, controllerdashboard.getPageKarshnas)

//handel karshnas
router.post("/karshnas", auth, controllerdashboard.handelKarshnas)

//handel delete request karshnas
router.get("/karshnas/delete/:id", auth, controllerdashboard.handelDeleteKarshnas)

//handel acc request karshnas
router.get("/karshnas/acc/:id", auth, controllerdashboard.handelAccKarshnas)

module.exports = router;