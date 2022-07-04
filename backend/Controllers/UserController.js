const User = require("../Models/User");

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

process.env.SECRET_KEY = "secret";
const nodemailer = require("nodemailer");

module.exports = {
  addUser: async (req, res) => {
    try {
      var userData = new User({
        _id: new mongoose.Types.ObjectId(),

        email: req.body.email,
        password: "1234",
        accountType: req.body.accountType,
        status: false,
      });
      User.find({ email: req.body.email })
        .exec()
        .then((user) => {
          if (user.length >= 1) {
            res.status(202).json({
              success: false,
              message: "*** A User already registered for this email ***",
            });
          } else {
            const hash = bcrypt.hashSync(userData.password, 10);
            userData.password = hash;
            userData.save((err, doc) => {
              var transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true, // use TLS
                auth: {
                  user: "jayathungathemindi@gmail.com",
                  pass: "bnhggdirspuozyxj",
                },
                tls: {
                  // do not fail on invalid certs
                  rejectUnauthorized: false,
                },
              });

              var mailOptions = {
                from: "jayathungathemindi@gmail.com",
                to: req.body.email,
                subject: "Login Verification",
                html: '<p>Click <a href="http://localhost:3000/SignIn">here</a> to login Your Password is 1234 ,After login you can change your passwoard</p>',
              };

              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log(error);
                } else {
                  console.log("Email sent: " + info.response);
                }
              });

              if (!err) {
                res.status(200).json({
                  success: true,
                  message: "***User register successfully***",
                });
              } else {
                res.status(404).json({
                  success: false,
                  message: "***User register failed ***",
                });
              }
            });
          }
        })
        .catch((err) => {
          res.status(405).json({
            success: false,
            message: "*** User register failed ***",
            err: err,
          });
        });
    } catch (err) {
      console.log(err);
    }
  },

  editUserProfile: async (req, res) => {
    try {
      console.log(req.body);

      const hash = bcrypt.hashSync(req.body.password, 10);

      User.findByIdAndUpdate(
        req.body._id,
        {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          mobile: req.body.mobile,
          dateOfBirth: req.body.dateOfBirth,
          status: true,
          password: hash,
        },
        (err, doc) => {
          if (!err) {
            return res.status(200).json({
              success: true,
              message: "***Update user sucessfully***",
            });
          } else {
            return res.status(404).json({
              success: false,
              message: "***Update user faild***",
            });
          }
        }
      );
    } catch (error) {
      res.status(405).json({
        success: false,
        message: "*** Error occurd can not find a user for this email  ***",
      });
    }
  },
  addAdmin: async (req, res) => {
    try {
      var userData = new User({
        _id: new mongoose.Types.ObjectId(),

        email: req.body.email,
        password: "1234",
        accountType: req.body.accountType,
        status: false,
      });
      User.find({ email: req.body.email })
        .exec()
        .then((user) => {
          if (user.length >= 1) {
            res.status(202).json({
              success: false,
              message: "*** A User already registered for this email ***",
            });
          } else {
            const hash = bcrypt.hashSync(userData.password, 10);
            userData.password = hash;
            userData.save((err, doc) => {
              var transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true, // use TLS
                auth: {
                  user: "jayathungathemindi@gmail.com",
                  pass: "bnhggdirspuozyxj",
                },
                tls: {
                  // do not fail on invalid certs
                  rejectUnauthorized: false,
                },
              });

              var mailOptions = {
                from: "jayathungathemindi@gmail.com",
                to: req.body.email,
                subject: "Login Verification",
                html: '<p>Click <a href="http://localhost:3000/SignIn">here</a> to login Your Password is 1234 ,After login you can change your passwoard</p>',
              };

              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log(error);
                } else {
                  console.log("Email sent: " + info.response);
                }
              });

              if (!err) {
                res.status(200).json({
                  success: true,
                  message: "***User register successfully***",
                });
              } else {
                res.status(404).json({
                  success: false,
                  message: "***User register failed ***",
                });
              }
            });
          }
        })
        .catch((err) => {
          res.status(405).json({
            success: false,
            message: "*** User register failed ***",
            err: err,
          });
        });
    } catch (err) {
      console.log(err);
    }
  },

  login: async (req, res) => {
    try {
      User.findOne({ email: req.body.email })
        .exec()
        .then((user) => {
          if (user == null) {
            return res.status(403).json({
              success: false,
              message: "***Email incorrect***",
            });
          }

          bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (result) {
              const token = jwt.sign(
                {
                  firstName: user.firstName,
                  accountType: user.accountType,
                  email: user.email,
                  userId: user._id,
                },
                process.env.SECRET_KEY,
                {
                  expiresIn: "1h",
                }
              );

              return res.status(200).json({
                message: "***Login successful***",
                token: token,
                user: user,
                success: true,
              });
            } else {
              return res.status(404).json({
                message: "***Login failed***",
                success: false,
              });
            }
          });
        });
    } catch (err) {
      return res.status(405).json({
        message: "***Error***",
        success: false,
      });
    }
  },

  userList: async (req, res) => {
    try {
      User.find()
        .exec()
        .then((users) => {
          return res.status(200).json({
            message: "***User details***",
            success: true,
            users: users,
          });
        });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: "*** Error ***",
      });
    }
  },
};
