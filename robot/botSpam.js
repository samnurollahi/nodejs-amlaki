const fs = require("fs");
const path = require("path");

const UserController = require("../models/userController");
const Apartment = require("../models/apartment");
const Villa = require("../models/villa");
const RentApartman = require("../models/rentApartment");
const RentVilla = require("../models/rentVilla");
const Notifications = require("../models/notifications");

let ads = [];
let isHas = false;

async function getAd() {
  ads = [
    ...(await Apartment.find()),
    ...(await RentApartman.find()),
    ...(await Villa.find()),
    ...(await RentVilla.find()),
  ];
}

function deleteImgagesOver(ads) {
  fs.readdir(
    path.join(__dirname, "..", "public", "uploads", "img"),
    (err, data) => {
      if (err) {
        return console.log(err);
      }
      data.forEach((item) => {
        isHas = false;

        for (item of ads) {
          if (ad.imgs.includes(`/uploads/img/${item}`)) {
            isHas = true;
          }
        }

        if (!isHas) {
          fs.unlink(
            path.join(__dirname, "..", "public", "uploads", "img", item),
            (err) => {
              if (err) console.log(err);
            }
          );
        }
      });
    }
  );
}

async function clearUserControlller() {
  const today = new Date();
  const userController = await UserController.find({
    createAt: {
      $lt: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 12
      ),
    },
  });

  userController.forEach(async (item) => {
    await UserController.findByIdAndDelete(item._id);
  });
}

async function clearDataNotif() {
  const today = new Date();

  const notifications = await Notifications.find({
    createAt: {
      $lt: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 20
      ),
    },
  });

  notifications.forEach(async (item) => {
    await Notifications.findByIdAndDelete(item._id);
  });
}

setInterval(() => {
  getAd();
  deleteImgagesOver(ads);
  clearUserControlller();
  clearDataNotif();
}, 1_000 * 60 * 60 * 24); // 1 day
