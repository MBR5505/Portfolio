import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import viewRoutes from './routes/view.routes.js';

const app = express();

app.set('view engine', 'ejs');
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`);
});

app.use(express.json());
app.use(cookieParser());

app.use('/', viewRoutes);
