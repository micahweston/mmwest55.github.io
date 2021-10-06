const express = require('express');
const router = express.Router();

router.get('/about', (req, res) => {
    const path = req.path;
    res.render('portfolio/about', { path });
});

router.get('/skills', (req, res) => {
    const path = req.path;
    res.render('portfolio/skills', { path });
});

router.get('/projects', (req, res) => {
    const path = req.path;
    res.render('portfolio/projects', { path });
});

router.get('/contact', (req, res) => {
    const path = req.path;
    res.render('portfolio/contact', { path })
})

module.exports = router;