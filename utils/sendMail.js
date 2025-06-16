const nodeMailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

exports.sendMail = (email, subject, html) => {
  const transport = nodeMailer.createTransport(
    smtpTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: "samn00024@gmail.com",
        pass: "knvojeczlbiztfrt",
      },
      tls: {
        rejectUnauthorized: false
      }
    })
  );

  transport.sendMail({
    from: "samn00024@gmail.com",
    to: email,
    subject,
    html,
  })
};