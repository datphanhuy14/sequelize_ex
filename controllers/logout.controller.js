module.exports = {
     isLogout : function (req, res, next) {
        if (req.user){
            req.session.destroy()
            return next();
        } 
        // ...
        res.redirect('/login');
    },
}