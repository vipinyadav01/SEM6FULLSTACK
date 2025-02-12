const mongoose = require('mongoose');
const uri = "mongodb+srv://vipinprogramming:vipinyadav01@classtest.2mtpd.mongodb.net/?retryWrites=true&w=majority&appName=Classtest";

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log('Connected successfully to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

module.exports = { connect };
