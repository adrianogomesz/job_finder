const express    = require('express');
const app        = express();
const exphbs     = require('express-handlebars');
const path       = require('path');
const db         = require('./db/connection');
const bodyParser = require('body-parser');
const router     = require('./routes/jobs');
const Job        = require('./models/Job')
const Sequelize  = require('sequelize')
const Op         = Sequelize.Op;

const PORT = 3000;


app.listen(PORT, function () {

    console.log(`O Express está rodando na porta ${PORT}`);

});


// body parser
app.use(bodyParser.urlencoded({ extended: false }));


// handle bars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


// static folder
app.use(express.static(path.join(__dirname, 'public')));


// db connection
db
    .authenticate()
    .then(() => { 
        console.log("Conectado ao banco de dados")
    })
    .catch(err => {
        console.log("Ocorreu um erro", err)
    });


// routes
app.get('/', (req, res) => {

    let search = req.query.job;

    let query = '%' + search + '%'

    if(!search) {

        Job.findAll({order: [

            ['createdAt', 'DESC']
    
        ]})
        .then(jobs => {
    
            res.render('index', {
    
                jobs
    
            });
    
        })
        .catch(err => console.log(err));
    } else {

        Job.findAll({
            where: {title: {[Op.like]: query}},

            order: [

            ['createdAt', 'DESC']
    
        ]})
        .then(jobs => {
    
            res.render('index', {
    
                jobs, search
    
            });
    
        })
        .catch(err => console.log(err));
    }


});

// jobs routes
app.use('/jobs', require('./routes/jobs'));

// add form page route
router.get('/add', (req, res) => {

    res.render('layouts/add')

});

// details page route
router.get('/view/:id', (req, res) => Job.findOne({
    where: {id: req.params.id}

    }).then(job => {

        res.render('view', {

            job

        }) 

    }));