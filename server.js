const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({
    path: './config.env'
});

process.on('uncaughtException', err => {
    console.log('Uncaught Exception!');
    console.log(err.name, err.message);
    process.exit(1);
});

const app = require('./app');

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

process.on('unhandledRejection', err => {
    console.log('Uncaught Exception!');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});