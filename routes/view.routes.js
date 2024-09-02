import express from 'express';

const router = express.Router();

router.get('/omMeg', (req, res) => {
    res.render('omMeg');
});

router.get('/utvikling', (req, res) => {
    res.render('utvikling');
});

router.get('/utvikling/api', (req, res) => {
    res.render('api');
});

router.get('/utvikling/api/weather', (req, res) => {
    res.render('Weather/index.ejs');
});

router.get('/utvikling/api/pokemon', (req, res) => {
    res.render('pokemon/index.ejs');
});

router.get('/utvikling/database', (req, res) => {
    res.render('database');
});

router.get('/design', (req, res) => {
    res.render('design');
});

router.get('/kontakt', (req, res) => {
    res.render('kontakt');
});

router.get('/', (req, res) => {
    res.render('index');
});

export default router;
