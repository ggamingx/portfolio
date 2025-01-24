require('dotenv').config();

async function emailCheckMiddleware(req, res, next) {
    if (req.isAuthenticated()) {
        const userEmail = req.user.emails[0].value;
        
        try {
            if (userEmail === process.env.EMAIL) {
                return next();
            } else {
                return res.redirect('admin/unauthorized')
            }
        } catch (error) {
            console.error('Error checking user email', error);
            return res.status(500).send('Internal Server Error');
        }
    } else {
        return res.redirect('/admin/login');
    }
}

async function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/admin');
    } else {
        return next();
    }
}

module.exports = { emailCheckMiddleware, isLoggedIn };