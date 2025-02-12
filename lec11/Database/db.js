const mongoose = require('mongoose');
const uri = 'your-mongodb-connection-string-here';

async function connect() {
    try {
        await mongoose.connect("mongodb+srv://vipinprogramming:vipinyadav01@classtest.2mtpd.mongodb.net/?retryWrites=true&w=majority&appName=Classtest");
        console.log('Connected successfully to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}
module.exports = { connect };
