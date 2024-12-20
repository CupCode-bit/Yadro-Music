exports.getSignup = (req, res) => {
    try {
        res.render('user/signup');
    } catch (error) {
        console.log(error.message);
    }
}


exports.getLogin = (req, res) => {
    try {
        res.render('user/signin');
    } catch (error) {
        console.log(error.message);
    }
}


exports.getHome = (req, res) => {
    try {
        res.render('user/home');
    } catch (error) {
        console.log(error.message);
    }
}