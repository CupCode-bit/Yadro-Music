const axios = require('axios');


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

exports.getHome = async (req, res) => {
    try {
        res.render('user/home');
    } catch (error) {
        console.log(error.message);
    }
}


exports.searchSong = async (req, res) => {
    try {
        const RAPID_API_KEY = process.env.RAPID_API_KEY;
        const BASE_URL = "https://spotify23.p.rapidapi.com";

        const { q } = req.query;
        try {
            const response = await axios.get(`${BASE_URL}/search/`, {
                params: { q, type: 'artists' },
                headers: {
                    'X-RapidAPI-Key': RAPID_API_KEY,
                    'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
                },
            });
            res.json(response.data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } catch (error) {
        console.log(error.message);
    }
}