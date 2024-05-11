const authGuard = (req, res, next) => {
    console.log('Checking user session:', req.session.user_id);
    if (!req.session.user_id) {
        console.log('No user_id found, redirecting to login');
        res.redirect('/login');
    } else {
        console.log('user_id found, proceeding');
        next();
    }
};

module.exports = authGuard;
