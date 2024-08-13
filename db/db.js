const mongoose = require('mongoose');

const db = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URL, {
            // useNewUrlParser and useUnifiedTopology are no longer needed
        });
        console.log('DB Connected');
    } catch (error) {
        console.error('DB Connection Error:', error);
    }
};

module.exports = db;
