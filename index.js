const express = require('express');
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require('cors');
const postCtrl = require ('./controllers/posts')
const userCtrl = require ('./controllers/users');
const teamCtrl = require('./controllers/teams');
const sportCtrl = require('./controllers/sports');
const matchCtrl = require('./controllers/matches');
const cookieParser = require('cookie-parser');
const { userVerification } = require('./middleware/AuthMiddleware');

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
app.post('/api', userVerification)
app.post('/api/new-team', teamCtrl.newTeam)
app.post('/api/new-sport', sportCtrl.newSport)
app.post('/api/new-match', matchCtrl.newMatch)
app.get('/api/upcoming-matches', matchCtrl.getMatches)
app.get('/api/finished-matches', matchCtrl.getFinishedMatches)
app.get('/api/team/:teamSlug', teamCtrl.getTeam)
app.get('/api/article/:slug', postCtrl.getSinglePost)
app.get('/api/matches/:teamId', matchCtrl.getTeamMatches)
// app.post('/api/add-items', itemCtrl.addItems)
// app.post('/api/add-user-leaderboard', leaderboardCtrl.addUserLeaderboard)

const port = 8080;

//Connect to MongoDB before listening
connectMongo().then(() => {
    app.listen(port, () => {
        console.log(`Ready for Requests on ${port}`)
    })
})



