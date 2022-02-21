import { config } from 'dotenv';
config();
import express from 'express';
import cors from 'cors'
import session from 'express-session';
import passport from 'passport';
import path from 'path'
import Routes from './routes/Index';
require('./strategies/Discord');

const app = express();

async function main() {
    //*setting up middleware
    //express itself and express-session
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(session({
        secret: process.env.DASHBOARD_SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60000 * 60 * 24 * 7 // 1 week
        }
    }));
    //cors
    app.use(cors({
        origin: ['http://localhost:' + process.env.DASHBOARD_PORT],
        credentials: true
    }));
    //passport
    app.use(passport.initialize());
    app.use(passport.session());
    //ejs
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));

    //set public folder
    app.use(express.static(path.join(__dirname, 'public')));

    //import routes
    app.use(Routes);
}

export default app;
export { main };