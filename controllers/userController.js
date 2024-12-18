exports.getSignup = (req, res) => {
    try {
        res.render('user/signup');
    } catch (error) {
        console.log(error.message);
    }
}