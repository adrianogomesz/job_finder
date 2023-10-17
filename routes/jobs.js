const express = require('express');
const router  = express.Router();
const Job     = require('../models/Job');


// add job via post

router.get('/test', (req, res) => {

    res.send("Deu Certo!");

});

router.post('/add', (req, res) => {
    
    let {id, title, description, salary, company, email, new_job} = req.body;

    // insert
    Job.create({
        id,
        title,
        description,
        salary,
        company,
        email,
        new_job
    })
    .then(() => {
        res.redirect('/')
    })
    .catch(err => console.log(err));

});

module.exports = router;