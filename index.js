const express = require('express');
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require('cors');
const postCtrl = require ('./controllers/posts')
const userCtrl = require ('./controllers/users');
const cookieParser = require('cookie-parser');

// Connect to MongoDB
const connectMongo = async () => {
    try{
        mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,    
        })
        .then(() => console.log(`MongoDB connected`))
        .catch(err => console.log(err));
    }
    catch (error){
        console.log(error);
        process.exit(1);
    }
}

app.use(cors())
app.use(express.json());
app.use(cookieParser());

app.get('/api/posts', postCtrl.getPosts)
app.get('/api/users', userCtrl.getUsers)
app.post('/api/login', userCtrl.login)
app.post('/api/signup', userCtrl.signup)
// app.get('/api/leaderboard', leaderboardCtrl.getLeaderboard)
// app.post('/api/add-items', itemCtrl.addItems)
// app.post('/api/add-user-leaderboard', leaderboardCtrl.addUserLeaderboard)

const port = 8080;

//Connect to MongoDB before listening
connectMongo().then(() => {
    app.listen(port, () => {
        console.log(`Ready for Requests on ${port}`)
    })
})



