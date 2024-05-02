const express = require("express");
const cors = require("cors");
// const bodyParser = require("body-parser"); - Not required
require('dotenv').config();
const connectDB = require('./db');
const app = express();
const port = process.env.PORT || 3000;
const auth = require('./routes/auth');


connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', auth);



app.listen(port, () => console.log(`Server listening on port ${port}`));
