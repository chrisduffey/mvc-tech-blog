const withAuth =  (req, res, next) => {
    console.log(req.sessions.logged_in);

    if (!req.session.logged_in) {
        res.redirect("/login");
    }else {
        next();
    }
};

module.exports = withAuth;