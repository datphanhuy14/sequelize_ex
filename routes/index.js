var express = require('express');
var router = express.Router();
let passport = require("passport");
let loginCont = require('../controllers/login.controller');
let logoutClick = require('../controllers/logout.controller')

/* GET home page. */
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index.html" , {profile:  req.user});
});
// PROFILE
router.get("/profile", loginCont.isLogged , function (req, res, next) {
  console.log('profile : ', req.user);
  res.render("profile.html", { profile:  req.user});
});

router.get("/signup", function (req, res, next) {
  res.render("signup.html");
})
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/login', // chuyển hướng tới trang được bảo vệ
  failureRedirect: '/signup', // trở lại trang đăng ký nếu có lỗi
  failureFlash: false // allow flash messages
}));
router.get("/login", function (req, res, next) {
  res.render("login.html");
});
router.post('/login' ,passport.authenticate('local', {
  successRedirect: '/profile', // chuyển hướng tới trang được bảo vệ
  failureRedirect: '/login', // trở lại trang đăng ký nếu có lỗi
  failureFlash: "Đăng nhập không thành công." // allow flash messages
}));
// FB Login
router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] }) // Xin quyền cấp email từ fbscope , Scope:
);
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/profile",
    failureRedirect: "/login",
  })
);
// Google login
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {

    successRedirect: "/profile",
    failureRedirect: "/login"})
);
router.get('/logout', logoutClick.isLogout , (req, res) => {
  res.redirect('/');
}

)
module.exports = router;
