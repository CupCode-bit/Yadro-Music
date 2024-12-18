exports.getSignup = (req, res) => {
    try {
        res.render('signup');
    } catch (error) {
        console.log(error.message);
    }
}