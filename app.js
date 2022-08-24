require("dotenv").config();
const express = require('express');
const app = express();
sequelize = require('./config/db');
const middleware = require('./middleware/errorhandler')
const cors = require('cors')


app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});




app.use('/', require('./router/router'));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(middleware.onError)






app.listen(process.env.APP_PORT, () => {
    console.log("Server running on PORT : ", process.env.APP_PORT);
});

console.log("tables created");

// sequelize.sync({ force: true })  
