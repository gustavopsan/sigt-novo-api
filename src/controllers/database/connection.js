const mongoose = require('mongoose');

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.set('strictQuery', true);

const connection = mongoose
    .connect(process.env.MONGO_CONNECTION_URL, connectionParams)
        .then( () => {
            console.info("Successfully connected to MongoDB server");
        })
        .catch( err => {
            console.warn("Error connecting to MongoDB server", err);
        })

module.exports = connection;