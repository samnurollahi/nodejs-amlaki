const User = require("../models/user");
const Notification = require("../models/notifications");
const { sendMail } = require("./sendMail");

module.exports = async function sendNF(msg, userID, type) {
  try {
    const user = await User.findById(userID);
    await User.findByIdAndUpdate(userID, { notifications: false });
    await Notification.create({
      msg,
      user: userID,
      type,
      createAt: new Date(),
    });
    sendMail(
      user.email,
      "پیام جدید",
      `
            <h1>شما پیام جدیدی دارید</h1>
            <p>برای دیدن پیام به <a href="https://panjerh.ir/dashboard">لینک</a> زیر مراجعه کنید</p>
        `
    );
  } catch (err) {
    return;
  }
};
