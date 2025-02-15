import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';


import routes from './routes.js';
import { auth } from './middlewares/authMiddlewares.js';

const app = express();


try {
    
    const uri = 'mongodb://127.0.0.1:27017/wildLife-photography'
    await mongoose.connect(uri);

    console.log('DB Connected!')
} catch (err) {
    console.error('Cannot connect to DB!');
    console.log(err.message);
}


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



app.use(express.static('src/public'));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(auth)
app.use(routes);


app.listen(3000, () => console.log('Server is listening on http://localhost:3000...'));