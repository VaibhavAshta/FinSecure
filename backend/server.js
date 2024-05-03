const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config();
const connectDB = require('./db');
const app = express();
const port = process.env.PORT || 3000;
const auth = require('./routes/auth');
const transaction = require('./routes/transaction');


connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', auth);
app.use('/transactions', transaction)



app.listen(port, () => console.log(`Server listening on port ${port}`));
