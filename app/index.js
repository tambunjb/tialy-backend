const express = require('express');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.set('trust proxy', true)

require('./db');
require("./routes.js")(app);

app.get('/', (req, res) => {
    res.send('TIAly project by tambunjb');
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = server
