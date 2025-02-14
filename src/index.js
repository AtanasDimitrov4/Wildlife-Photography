import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';


import routes from './routes.js';
import { auth } from './middlewares/authMiddlewares.js';

const app = express();

// Db setup
try {
    // TODO: Change db name
    const uri = 'mongodb://127.0.0.1:27017/examPrep'
    await mongoose.connect(uri);

    console.log('DB Connected!')
} catch (err) {
    console.error('Cannot connect to DB!');
    console.log(err.message);
}

// Handlebars setup 
app.engine('hbs',handlebars.engine({
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
    },
    helpers: {
        setTitle(title) {
            this.pageTitle = title;
        }
    }
}));

app.set('view engine', 'hbs');
app.set('views', './src/views');


// Express setup
app.use(express.static('src/public'));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(auth)
app.use(routes);

// Start express
app.listen(3000, () => console.log('Server is listening on http://localhost:3000...'));