import passport = require("passport");

export const authMiddleware = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err || !user) {
            err  && console.error(err);
            return res.status(401).send("Unauthorized");
        }
        req.authorizedUser = user;
        next();
    })(req, res, next);
}