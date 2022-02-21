import { config } from 'dotenv';
config();
import express from 'express';
import path from 'path'
import Routes from './routes/Routes';

const app = express();

async function main() {
    //settings
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    //set public folder
    app.use(express.static(path.join(__dirname, 'public')));
    //import routes
    app.use(Routes);
}

export default app;
export { main };