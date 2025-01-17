const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'static')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.post('/info', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    console.log("Email:", email);
    console.log("Password:", password);

    res.send("Hi Vipin, your data has been received successfully.");
});

app.get('/product/:p_id/:i_id', (req, res) => {
    console.log(req.params.i_id);
    console.log(req.params.p_id);
    console.log(req.query.color);

    res.send("<img src='https://gratisography.com/wp-content/uploads/2024/11/gratisography-leg-warmers-1170x780.jpg'>");
});

app.listen(2000, () => {
    console.log("Server is running on port 2000");
});
