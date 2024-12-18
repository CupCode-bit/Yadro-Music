const express = require('express');
const path = require('path');

const userRouter = require('./routes/userRouter');

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(userRouter);

app.listen(PORT, () => {
    console.log(`Server is Started at http://localhost:${PORT}`)
})