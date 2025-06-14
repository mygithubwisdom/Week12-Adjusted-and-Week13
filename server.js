
const express = require('express'); // Import express.js

const app = express(); //Instantiate an express.js app

const PORT = 5000; //Set up port to listen to server

// Middleware to parse json
app.use(express.json());
//* Week 13 Middlewares - (a) Middleware to log requests
app.use((req, res, next) => {
    console.log(`Received request for ${req.url} with ${req.method}.`);
    next();
}) 

app.get('/', (req, res) => {
    res.send(`Hello, Express!`);
});

//* Week 13 Assignment - (a) Defining a user/:id route
app.get('/user/:id', (req, res) => {
    const id = req.params.id;
    if(!id){
        return res.status(400).json({error: "Please input user id."});
    }

    return res.status(200).json({
        id: id,
        name: "Goat"
    });
});

//* Week 13 Assignment - (b) Defining a /search route
app.get('/search', (req, res) => {
     const name = req.query.name;
    if(!name){
        return res.status(400).json({error: "Please input user name."});
    }

    return res.status(200).json({
        id: 1,
        name: name
    });
});

//* Week 13 JSON response - JSON list of books
const listOfBooks = [
    {
        book: "The Secret Life Of Baba Segi's Wives",
        author: "Lola Shoneyin"
    },
    {
        book: "Welcome To Lagos",
        author: "Chibundu Onuzo"
    },
    {
        book: "A Broken People's Playlist",
        author: "Chimeka Garricks"
    },
    {
        book: "Fine Boys",
        author: "Imasuen Eghosa"
    }
];
app.get('/list-of-books', (req, res) => {
    return res.status(200).json({"List Of Books": listOfBooks});
});

//* Week 13 Middlewares - (b) Middleware to handle errors
app.use((err, req, res, next) => {
    console.error('Error:', err);
    return res.status(500).json({error: "Sorry, something went wrong. Please try again."});
    next();
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});