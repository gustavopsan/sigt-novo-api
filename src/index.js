//  Dev Dependencies 
require('dotenv').config();

//  Main Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const CORS = require('cors');

//  Routes
const mainFormRoutes = require('./routes/mainFormRoutes');
const userRoutes = require('./routes/userRoutes');
const weekFormRoutes = require('./routes/weekFormRoutes');
const monthFormRoutes = require('./routes/monthFormRoutes');
const yearRoutes = require('./routes/yearRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const weekEntryRoutes = require('./routes/weekEntryRoutes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    app.use(CORS());
    next();
});

const port = process.env.PORT || 3000;

require('./controllers/database/connection');

app.get('/', (req, res) => {
    res.json(
        {
            status: "active",
            message: "Transparência API - Conexão bem sucedida"
        }
    )
});

app.use(userRoutes);
app.use(weekFormRoutes);
app.use(monthFormRoutes);
app.use(mainFormRoutes);
app.use(yearRoutes);
app.use(subscriptionRoutes);
app.use(paymentRoutes);
app.use(expenseRoutes);
app.use(weekEntryRoutes);

app.listen(port);
