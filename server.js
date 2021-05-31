const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({
    path: './config.env'
});

//Handling exceptions
process.on('uncaughtException', err => {
    console.log('Uncaught Exception!');
    console.log(err);
    console.log(err.name, err.message);
    process.exit(1);
});

const app = require('./app');

//Retrieving database Connection URL from .env
const database = process.env.DATABASE.replace('<db_password>', process.env.DATABASE_PASSWORD);

/* Database Connection */
mongoose.connect(database, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(connection => {
    console.log('DB connection Successfully!');
});

/** Start server */
const port = process.env.PORT || 3500;
app.listen(port, () => {
    console.log(`Application is running on port ${port}`);
});

//Handling exceptions
process.on('unhandledRejection', err => {
    console.log('Uncaught Exception!');
    console.log(err);
    console.log(err.name, err.message);
    process.exit(1);
});
